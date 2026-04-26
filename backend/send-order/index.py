"""
Отправка заявки из корзины на email менеджера.
Получает список товаров и контакты клиента, отправляет письмо через SMTP.
"""
import json
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
    except Exception:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Invalid JSON"})}

    company = body.get("company", "—")
    name = body.get("name", "")
    phone = body.get("phone", "")
    comment = body.get("comment", "")
    items = body.get("items", [])

    if not name or not phone or not items:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Missing required fields"})}

    smtp_email = os.environ.get("SMTP_EMAIL", "")
    smtp_password = os.environ.get("SMTP_PASSWORD", "")

    if not smtp_email or not smtp_password:
        return {"statusCode": 500, "headers": headers, "body": json.dumps({"error": "SMTP not configured"})}

    # Формируем HTML-письмо
    items_rows = ""
    for i, item in enumerate(items, 1):
        items_rows += f"""
        <tr style="background:{'#f9f9f9' if i % 2 == 0 else '#ffffff'}">
            <td style="padding:8px 12px;border:1px solid #e0e0e0">{i}</td>
            <td style="padding:8px 12px;border:1px solid #e0e0e0"><b>{item.get('name','')}</b></td>
            <td style="padding:8px 12px;border:1px solid #e0e0e0;color:#666">{item.get('article','')}</td>
            <td style="padding:8px 12px;border:1px solid #e0e0e0;text-align:center">{item.get('qty',1)}</td>
            <td style="padding:8px 12px;border:1px solid #e0e0e0">{item.get('unit','')}</td>
            <td style="padding:8px 12px;border:1px solid #e0e0e0;color:#e85d04;font-weight:bold">{item.get('price','')} ₽</td>
        </tr>"""

    now = datetime.now().strftime("%d.%m.%Y %H:%M")

    html = f"""
    <html><body style="font-family:'Segoe UI',Arial,sans-serif;color:#1a1a1a;background:#f5f7fa;margin:0;padding:20px">
    <div style="max-width:700px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08)">

        <div style="background:#0d2044;padding:28px 32px;display:flex;align-items:center;gap:12px">
            <div style="width:40px;height:40px;background:#e85d04;border-radius:8px;display:flex;align-items:center;justify-content:center">
                <span style="color:white;font-size:20px">📦</span>
            </div>
            <div>
                <div style="color:white;font-size:20px;font-weight:800">Новая заявка из корзины</div>
                <div style="color:rgba(255,255,255,0.6);font-size:13px">ПромТехСнаб • {now}</div>
            </div>
        </div>

        <div style="padding:28px 32px">
            <h2 style="margin:0 0 16px;font-size:16px;color:#0d2044;text-transform:uppercase;letter-spacing:0.05em">Данные клиента</h2>
            <table style="width:100%;border-collapse:collapse;margin-bottom:28px">
                <tr><td style="padding:8px 0;color:#666;width:140px">Компания:</td><td style="padding:8px 0;font-weight:600">{company}</td></tr>
                <tr><td style="padding:8px 0;color:#666">Имя:</td><td style="padding:8px 0;font-weight:600">{name}</td></tr>
                <tr><td style="padding:8px 0;color:#666">Телефон:</td><td style="padding:8px 0"><a href="tel:{phone}" style="color:#e85d04;font-weight:700;text-decoration:none">{phone}</a></td></tr>
                {'<tr><td style="padding:8px 0;color:#666">Комментарий:</td><td style="padding:8px 0">' + comment + '</td></tr>' if comment else ''}
            </table>

            <h2 style="margin:0 0 16px;font-size:16px;color:#0d2044;text-transform:uppercase;letter-spacing:0.05em">Список товаров ({len(items)} позиций)</h2>
            <table style="width:100%;border-collapse:collapse;font-size:13px">
                <thead>
                    <tr style="background:#0d2044">
                        <th style="padding:10px 12px;color:white;text-align:left;border:1px solid #1a3a6e">№</th>
                        <th style="padding:10px 12px;color:white;text-align:left;border:1px solid #1a3a6e">Наименование</th>
                        <th style="padding:10px 12px;color:white;text-align:left;border:1px solid #1a3a6e">Артикул</th>
                        <th style="padding:10px 12px;color:white;text-align:center;border:1px solid #1a3a6e">Кол-во</th>
                        <th style="padding:10px 12px;color:white;text-align:left;border:1px solid #1a3a6e">Ед.</th>
                        <th style="padding:10px 12px;color:white;text-align:left;border:1px solid #1a3a6e">Цена</th>
                    </tr>
                </thead>
                <tbody>{items_rows}</tbody>
            </table>

            <div style="margin-top:24px;padding:16px;background:#fff8f0;border-left:4px solid #e85d04;border-radius:4px">
                <p style="margin:0;font-size:13px;color:#666">Клиент ожидает звонка менеджера в течение 30 минут.</p>
            </div>
        </div>
    </div>
    </body></html>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"🛒 Заявка из корзины: {name} — {len(items)} поз."
    msg["From"] = smtp_email
    msg["To"] = smtp_email
    msg.attach(MIMEText(html, "html", "utf-8"))

    # Определяем SMTP сервер по домену
    domain = smtp_email.split("@")[-1].lower()
    if "yandex" in domain or "ya.ru" in domain:
        smtp_host, smtp_port = "smtp.yandex.ru", 465
        use_ssl = True
    elif "gmail" in domain:
        smtp_host, smtp_port = "smtp.gmail.com", 465
        use_ssl = True
    elif "mail.ru" in domain or "inbox.ru" in domain or "bk.ru" in domain or "list.ru" in domain:
        smtp_host, smtp_port = "smtp.mail.ru", 465
        use_ssl = True
    else:
        smtp_host, smtp_port = "smtp." + domain, 465
        use_ssl = True

    if use_ssl:
        server = smtplib.SMTP_SSL(smtp_host, smtp_port)
    else:
        server = smtplib.SMTP(smtp_host, smtp_port)
        server.starttls()

    server.login(smtp_email, smtp_password)
    server.sendmail(smtp_email, smtp_email, msg.as_string())
    server.quit()

    return {"statusCode": 200, "headers": headers, "body": json.dumps({"ok": True})}
