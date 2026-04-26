import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/0ce16af4-7547-4ece-b516-ef9644b183a2/files/09885065-7f0e-4ebd-a6bc-964107e04f0b.jpg";

const navLinks = [
  { label: "Главная", href: "#hero" },
  { label: "О компании", href: "#about" },
  { label: "Преимущества", href: "#advantages" },
  { label: "Каталог", href: "#catalog" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

const advantages = [
  { icon: "Truck", title: "Доставка по всей России", desc: "Собственный автопарк и партнёрские перевозчики. Доставляем в любой регион в срок." },
  { icon: "ShieldCheck", title: "Гарантия качества", desc: "Все товары сертифицированы. Гарантийное обслуживание до 3 лет на всю продукцию." },
  { icon: "Handshake", title: "Работа с юр. лицами", desc: "Договор поставки, счёт-фактура, накладные. Полный пакет документов для бухгалтерии." },
  { icon: "BadgePercent", title: "Оптовые цены", desc: "Скидки от объёма от 5% до 25%. Индивидуальные условия для постоянных клиентов." },
  { icon: "PhoneCall", title: "Персональный менеджер", desc: "Закреплённый специалист ведёт ваш заказ от заявки до доставки." },
  { icon: "PackageCheck", title: "Большой склад", desc: "Более 12 000 позиций в наличии. Отгрузка в день оплаты." },
];

const catalogItems = [
  { name: "Крепёж и метизы", count: "2 400+ позиций", icon: "Settings2" },
  { name: "Трубы и фитинги", count: "1 800+ позиций", icon: "Pipette" },
  { name: "Электрооборудование", count: "3 100+ позиций", icon: "Zap" },
  { name: "Инструмент", count: "900+ позиций", icon: "Wrench" },
  { name: "Средства защиты", count: "600+ позиций", icon: "HardHat" },
  { name: "Насосное оборудование", count: "450+ позиций", icon: "Gauge" },
];

const faqs = [
  {
    q: "Как оформить оптовый заказ?",
    a: "Свяжитесь с нами по телефону или email, либо скачайте прайс-лист и заполните заявку. Менеджер перезвонит в течение 30 минут в рабочее время.",
  },
  {
    q: "Какой минимальный заказ для оптовых условий?",
    a: "Минимальная сумма для оптовых цен — от 50 000 ₽. При заказе от 200 000 ₽ предоставляется персональный менеджер и расширенная скидка.",
  },
  {
    q: "Работаете ли вы с НДС?",
    a: "Да, работаем на ОСНО. Предоставляем счёт-фактуру, товарную накладную (ТОРГ-12) и все необходимые документы.",
  },
  {
    q: "Можно ли забрать товар самовывозом?",
    a: "Да, самовывоз доступен со склада в Москве (ул. Промышленная, 14). Время работы: пн–пт 8:00–18:00.",
  },
  {
    q: "Как долго ждать доставку?",
    a: "По Москве и МО — 1-2 дня. В регионы — 3-10 дней в зависимости от удалённости. Точные сроки уточняет менеджер.",
  },
];

const downloads = [
  { label: "Прайс-лист 2025", desc: "Актуальные цены на все позиции", icon: "FileText", size: "1.2 MB" },
  { label: "Каталог продукции", desc: "Полный каталог с фото и характеристиками", icon: "BookOpen", size: "8.4 MB" },
];

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f7fa] font-['Golos_Text',sans-serif]">

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d2044]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                <Icon name="Package" size={18} className="text-white" />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">ПромТехСнаб</span>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-white/75 hover:text-white text-sm font-medium transition-colors duration-200"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <a
              href="tel:+74951234567"
              className="hidden md:flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-semibold transition-colors"
            >
              <Icon name="Phone" size={15} />
              +7 (495) 123-45-67
            </a>

            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              <Icon name={mobileMenu ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="md:hidden bg-[#0d2044] border-t border-white/10 px-4 pb-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileMenu(false)}
                className="block py-3 text-white/80 hover:text-white text-sm font-medium border-b border-white/10 last:border-0"
              >
                {l.label}
              </a>
            ))}
            <a
              href="tel:+74951234567"
              className="flex items-center gap-2 mt-3 bg-orange-500 text-white px-4 py-2 rounded text-sm font-semibold"
            >
              <Icon name="Phone" size={15} />
              +7 (495) 123-45-67
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2044]/90 via-[#0d2044]/70 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="max-w-2xl animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-orange-300 text-sm font-medium">Работаем с юридическими лицами с 2008 года</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Промышленные товары
              <span className="block text-orange-400">оптом по всей России</span>
            </h1>

            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Более 12 000 позиций в наличии. Отгрузка в день оплаты.
              Работаем по договору поставки с НДС.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#catalog"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded font-semibold transition-colors text-base"
              >
                <Icon name="Search" size={18} />
                Перейти в каталог
              </a>
              <a
                href="#contacts"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3 rounded font-semibold transition-colors text-base"
              >
                <Icon name="Phone" size={18} />
                Связаться с нами
              </a>
            </div>

            <div className="flex flex-wrap gap-8 mt-12">
              {[["12 000+", "позиций в наличии"], ["15 лет", "на рынке"], ["3 000+", "клиентов"], ["50+", "регионов"]].map(([val, label]) => (
                <div key={label}>
                  <div className="text-3xl font-black text-white">{val}</div>
                  <div className="text-white/60 text-sm mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-[#0d2044]/10 text-[#0d2044] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded mb-5">
                О компании
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0d2044] mb-6 leading-tight">
                Надёжный партнёр для вашего производства
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                ПромТехСнаб — оптовый поставщик промышленных товаров, работающий с 2008 года. Мы специализируемся на поставках крепежа, трубопроводной арматуры, электрооборудования, инструмента и средств защиты.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Наши клиенты — заводы, строительные компании, машиностроительные предприятия и сервисные центры по всей России. Мы предлагаем гибкие условия сотрудничества, конкурентные цены и стабильное качество.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "MapPin", label: "Склад в Москве, 8 500 м²" },
                  { icon: "Users", label: "Команда из 120 специалистов" },
                  { icon: "Star", label: "Рейтинг 4.9 на Яндекс Бизнес" },
                  { icon: "Award", label: "ISO 9001:2015" },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-3 p-4 bg-[#f5f7fa] rounded-lg">
                    <div className="w-9 h-9 bg-[#0d2044] rounded flex items-center justify-center flex-shrink-0">
                      <Icon name={icon} size={16} className="text-white" />
                    </div>
                    <span className="text-sm font-medium text-[#0d2044]">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-[#0d2044] rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-6">Скачайте документы</h3>
                <div className="space-y-4">
                  {downloads.map((d) => (
                    <div
                      key={d.label}
                      className="flex items-center gap-4 bg-white/10 hover:bg-white/20 rounded-xl p-4 cursor-pointer transition-colors group"
                    >
                      <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name={d.icon} size={22} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold">{d.label}</div>
                        <div className="text-white/60 text-sm">{d.desc}</div>
                        <div className="text-orange-400 text-xs mt-1">{d.size} • PDF</div>
                      </div>
                      <Icon name="Download" size={20} className="text-white/50 group-hover:text-orange-400 transition-colors" />
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-white/20 flex items-center gap-3 text-white/60 text-sm">
                  <Icon name="RefreshCw" size={14} />
                  Обновлено 20 апреля 2025
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="py-20 bg-[#f5f7fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-block bg-[#0d2044]/10 text-[#0d2044] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded mb-4">
              Преимущества
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0d2044]">
              Почему выбирают нас
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((a) => (
              <div
                key={a.title}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-[#0d2044] group-hover:bg-orange-500 rounded-lg flex items-center justify-center mb-5 transition-colors duration-300">
                  <Icon name={a.icon} size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-[#0d2044] text-base mb-2">{a.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-block bg-[#0d2044]/10 text-[#0d2044] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded mb-4">
                Каталог
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0d2044]">Наша продукция</h2>
            </div>
            <a
              href="#contacts"
              className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold text-sm transition-colors"
            >
              Запросить прайс
              <Icon name="ArrowRight" size={16} />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {catalogItems.map((item) => (
              <div
                key={item.name}
                className="group relative bg-[#f5f7fa] hover:bg-[#0d2044] rounded-xl p-6 cursor-pointer transition-all duration-300 border border-transparent hover:border-[#0d2044]"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-10 h-10 bg-white group-hover:bg-orange-500 rounded-lg flex items-center justify-center transition-colors duration-300 shadow-sm">
                    <Icon name={item.icon} size={20} className="text-[#0d2044] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <Icon name="ArrowUpRight" size={18} className="text-gray-300 group-hover:text-white/50 transition-colors" />
                </div>
                <h3 className="font-bold text-[#0d2044] group-hover:text-white text-base mb-1 transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-gray-400 group-hover:text-white/60 text-sm transition-colors duration-300">
                  {item.count}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-gradient-to-r from-[#0d2044] to-[#1a3a6e] rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-bold text-xl mb-1">Не нашли нужную категорию?</h3>
              <p className="text-white/70 text-sm">Уточните у менеджера — возможно, товар есть под заказ.</p>
            </div>
            <a
              href="#contacts"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded font-semibold transition-colors"
            >
              <Icon name="MessageCircle" size={18} />
              Написать менеджеру
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-[#f5f7fa]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-block bg-[#0d2044]/10 text-[#0d2044] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded mb-4">
              FAQ
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0d2044]">Частые вопросы</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden"
              >
                <button
                  className="w-full text-left flex items-center justify-between px-6 py-5 gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-[#0d2044] text-base">{faq.q}</span>
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center transition-transform duration-300 ${openFaq === i ? "rotate-45 border-orange-500 bg-orange-500" : ""}`}>
                    <Icon
                      name="Plus"
                      size={16}
                      className={openFaq === i ? "text-white" : "text-gray-400"}
                    />
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <div className="h-px bg-gray-100 mb-4" />
                    <p className="text-gray-600 leading-relaxed text-sm">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-block bg-[#0d2044]/10 text-[#0d2044] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded mb-4">
              Контакты
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0d2044]">Свяжитесь с нами</h2>
            <p className="text-gray-500 mt-3">Ответим в течение 30 минут в рабочие часы</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-5">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (495) 123-45-67", sub: "Пн–Пт 8:00–19:00", href: "tel:+74951234567" },
                { icon: "Mail", label: "Email", value: "info@promtechsnab.ru", sub: "Ответим в течение часа", href: "mailto:info@promtechsnab.ru" },
                { icon: "MapPin", label: "Адрес склада", value: "Москва, ул. Промышленная, 14", sub: "Самовывоз: Пн–Пт 8:00–18:00", href: "#" },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="flex items-center gap-5 p-5 bg-[#f5f7fa] rounded-xl hover:bg-[#0d2044] group transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[#0d2044] group-hover:bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <Icon name={c.icon} size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 group-hover:text-white/50 uppercase tracking-wider transition-colors">{c.label}</div>
                    <div className="font-bold text-[#0d2044] group-hover:text-white text-base transition-colors">{c.value}</div>
                    <div className="text-sm text-gray-500 group-hover:text-white/60 transition-colors">{c.sub}</div>
                  </div>
                </a>
              ))}
            </div>

            <form className="bg-[#f5f7fa] rounded-2xl p-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
              <h3 className="font-bold text-[#0d2044] text-xl mb-2">Оставить заявку</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Название компании</label>
                <input
                  type="text"
                  placeholder="ООО «Ваша компания»"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#0d2044] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0d2044] text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Имя и должность</label>
                <input
                  type="text"
                  placeholder="Иванов Иван, директор по закупкам"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#0d2044] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0d2044] text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Телефон</label>
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#0d2044] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0d2044] text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Что нужно?</label>
                <textarea
                  rows={3}
                  placeholder="Опишите, какие товары вас интересуют..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#0d2044] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0d2044] text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#0d2044] hover:bg-orange-500 text-white py-3.5 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Icon name="Send" size={17} />
                Отправить заявку
              </button>
              <p className="text-xs text-center text-gray-400">Нажимая кнопку, вы соглашаетесь с политикой обработки данных</p>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0d2044] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-orange-500 rounded flex items-center justify-center">
                <Icon name="Package" size={15} className="text-white" />
              </div>
              <span className="text-white font-bold">ПромТехСнаб</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} className="text-white/50 hover:text-white text-xs transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
            <div className="text-white/40 text-xs">© 2025 ПромТехСнаб</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
