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

type Product = {
  id: number;
  name: string;
  article: string;
  price: string;
  unit: string;
  category: string;
  icon: string;
  specs: { label: string; value: string }[];
};

const products: Product[] = [
  // Крепёж
  {
    id: 1, name: "Болт М8×50 DIN 933", article: "КР-00142", price: "от 2 800", unit: "уп. 200 шт.",
    category: "Крепёж и метизы", icon: "Settings2",
    specs: [
      { label: "Резьба", value: "М8" }, { label: "Длина", value: "50 мм" },
      { label: "Материал", value: "Сталь 8.8" }, { label: "Покрытие", value: "Цинк" },
      { label: "Стандарт", value: "DIN 933" },
    ],
  },
  {
    id: 2, name: "Гайка М10 DIN 934 оцинк.", article: "КР-00215", price: "от 1 100", unit: "уп. 500 шт.",
    category: "Крепёж и метизы", icon: "Settings2",
    specs: [
      { label: "Резьба", value: "М10" }, { label: "Высота", value: "8 мм" },
      { label: "Материал", value: "Ст. 5" }, { label: "Покрытие", value: "Гор. цинк" },
      { label: "Стандарт", value: "DIN 934" },
    ],
  },
  {
    id: 3, name: "Шпилька М12×1000 DIN 975", article: "КР-00389", price: "от 4 200", unit: "шт.",
    category: "Крепёж и метизы", icon: "Settings2",
    specs: [
      { label: "Резьба", value: "М12" }, { label: "Длина", value: "1 000 мм" },
      { label: "Материал", value: "Сталь 4.8" }, { label: "Покрытие", value: "Без покрытия" },
      { label: "Применение", value: "Строит. конструкции" },
    ],
  },
  // Трубы
  {
    id: 4, name: "Труба стальная 57×3.5 ст.20", article: "ТР-01012", price: "от 38 000", unit: "тонна",
    category: "Трубы и фитинги", icon: "Pipette",
    specs: [
      { label: "Диаметр", value: "57 мм" }, { label: "Толщина", value: "3,5 мм" },
      { label: "Марка стали", value: "Ст. 20" }, { label: "Длина", value: "6–12 м" },
      { label: "ГОСТ", value: "8732-78" },
    ],
  },
  {
    id: 5, name: "Отвод 90° 76×3 ГОСТ 17375", article: "ТР-01188", price: "от 620", unit: "шт.",
    category: "Трубы и фитинги", icon: "Pipette",
    specs: [
      { label: "Угол", value: "90°" }, { label: "Диаметр", value: "76 мм" },
      { label: "Толщина", value: "3 мм" }, { label: "Материал", value: "Ст. 20" },
      { label: "ГОСТ", value: "17375-2001" },
    ],
  },
  {
    id: 6, name: "Кран шаровой DN50 PN16", article: "ТР-01344", price: "от 1 850", unit: "шт.",
    category: "Трубы и фитинги", icon: "Pipette",
    specs: [
      { label: "Диаметр", value: "DN 50" }, { label: "Давление", value: "PN 16 бар" },
      { label: "Корпус", value: "Нерж. сталь" }, { label: "T рабочая", value: "до +180°C" },
      { label: "Резьба", value: "G 2″" },
    ],
  },
  // Электрооборудование
  {
    id: 7, name: "Автомат. выкл. ВА47-63 3P 32А", article: "ЭЛ-02011", price: "от 890", unit: "шт.",
    category: "Электрооборудование", icon: "Zap",
    specs: [
      { label: "Полюса", value: "3P" }, { label: "Ток", value: "32 А" },
      { label: "Откл. способн.", value: "6 кА" }, { label: "Хар-ка", value: "C" },
      { label: "Стандарт", value: "IEC 60898" },
    ],
  },
  {
    id: 8, name: "Кабель ВВГнг-LS 3×2.5 мм²", article: "ЭЛ-02278", price: "от 95", unit: "п.м.",
    category: "Электрооборудование", icon: "Zap",
    specs: [
      { label: "Жилы", value: "3×2,5 мм²" }, { label: "Изоляция", value: "ПВХ нг-LS" },
      { label: "Напряжение", value: "0,66 / 1 кВ" }, { label: "T монтажа", value: "от -15°C" },
      { label: "ГОСТ", value: "16442-80" },
    ],
  },
  {
    id: 9, name: "Двигатель АИР 80В4 1.5 кВт", article: "ЭЛ-02540", price: "от 12 400", unit: "шт.",
    category: "Электрооборудование", icon: "Zap",
    specs: [
      { label: "Мощность", value: "1,5 кВт" }, { label: "Обороты", value: "1 500 об/мин" },
      { label: "Напряжение", value: "380 В" }, { label: "КПД", value: "78,5%" },
      { label: "Степень защ.", value: "IP54" },
    ],
  },
  // Инструмент
  {
    id: 10, name: "Угловая шлифмашина Makita 9565CV", article: "ИН-03102", price: "от 14 800", unit: "шт.",
    category: "Инструмент", icon: "Wrench",
    specs: [
      { label: "Мощность", value: "1 400 Вт" }, { label: "Диск", value: "125 мм" },
      { label: "Об/мин", value: "2 000–10 000" }, { label: "Масса", value: "1,6 кг" },
      { label: "Гарантия", value: "3 года" },
    ],
  },
  {
    id: 11, name: "Набор торцевых ключей 108 пр.", article: "ИН-03256", price: "от 6 200", unit: "набор",
    category: "Инструмент", icon: "Wrench",
    specs: [
      { label: "Предметов", value: "108 шт." }, { label: "Размеры", value: "4–32 мм" },
      { label: "Материал", value: "Cr-V сталь" }, { label: "Кейс", value: "Металл" },
      { label: "Привод", value: "1/4″, 1/2″, 3/8″" },
    ],
  },
  {
    id: 12, name: "Перфоратор Bosch GBH 2-26 DRE", article: "ИН-03380", price: "от 18 500", unit: "шт.",
    category: "Инструмент", icon: "Wrench",
    specs: [
      { label: "Мощность", value: "800 Вт" }, { label: "Удар", value: "2,7 Дж" },
      { label: "Сверление", value: "до 26 мм (бетон)" }, { label: "Масса", value: "2,7 кг" },
      { label: "Гарантия", value: "2 года" },
    ],
  },
  // СИЗ
  {
    id: 13, name: "Каска защитная UVEX Pheos", article: "СИЗ-04012", price: "от 1 450", unit: "шт.",
    category: "Средства защиты", icon: "HardHat",
    specs: [
      { label: "Класс", value: "EN 397" }, { label: "Цвет", value: "Жёлтый / Белый" },
      { label: "Регулировка", value: "54–62 см" }, { label: "Масса", value: "280 г" },
      { label: "T эксплуатации", value: "-30°C…+50°C" },
    ],
  },
  {
    id: 14, name: "Перчатки нитриловые Ansell 11-816", article: "СИЗ-04190", price: "от 3 800", unit: "уп. 12 пар",
    category: "Средства защиты", icon: "HardHat",
    specs: [
      { label: "Материал", value: "Нитрил + хлопок" }, { label: "Класс защиты", value: "EN 388: 4131" },
      { label: "Размеры", value: "7–11" }, { label: "Длина", value: "290 мм" },
      { label: "Стойкость к маслу", value: "Высокая" },
    ],
  },
  // Насосы
  {
    id: 15, name: "Насос центробежный Grundfos CM3-4", article: "НО-05022", price: "от 28 600", unit: "шт.",
    category: "Насосное оборудование", icon: "Gauge",
    specs: [
      { label: "Подача", value: "3 м³/ч" }, { label: "Напор", value: "42 м" },
      { label: "Мощность", value: "0,55 кВт" }, { label: "Вход/Выход", value: "G 1¼″/G 1″" },
      { label: "T жидкости", value: "до +90°C" },
    ],
  },
  {
    id: 16, name: "Насос дренажный Grundfos KP 150-A1", article: "НО-05108", price: "от 11 900", unit: "шт.",
    category: "Насосное оборудование", icon: "Gauge",
    specs: [
      { label: "Подача", value: "до 10 м³/ч" }, { label: "Напор", value: "до 5 м" },
      { label: "Мощность", value: "150 Вт" }, { label: "Погружение", value: "до 7 м" },
      { label: "Твёрд. частицы", value: "до 10 мм" },
    ],
  },
];

const categories = ["Все", ...Array.from(new Set(products.map((p) => p.category)))];

const faqs = [
  { q: "Как оформить оптовый заказ?", a: "Добавьте товары в корзину, заполните контактные данные и отправьте заявку. Менеджер перезвонит в течение 30 минут в рабочее время." },
  { q: "Какой минимальный заказ для оптовых условий?", a: "Минимальная сумма для оптовых цен — от 50 000 ₽. При заказе от 200 000 ₽ предоставляется персональный менеджер и расширенная скидка." },
  { q: "Работаете ли вы с НДС?", a: "Да, работаем на ОСНО. Предоставляем счёт-фактуру, товарную накладную (ТОРГ-12) и все необходимые документы." },
  { q: "Можно ли забрать товар самовывозом?", a: "Да, самовывоз доступен со склада в Москве (ул. Промышленная, 14). Время работы: пн–пт 8:00–18:00." },
  { q: "Как долго ждать доставку?", a: "По Москве и МО — 1-2 дня. В регионы — 3-10 дней в зависимости от удалённости. Точные сроки уточняет менеджер." },
];

const downloads = [
  { label: "Прайс-лист 2025", desc: "Актуальные цены на все позиции", icon: "FileText", size: "1.2 MB" },
  { label: "Каталог продукции", desc: "Полный каталог с фото и характеристиками", icon: "BookOpen", size: "8.4 MB" },
];

type CartItem = { product: Product; qty: number };

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ company: "", name: "", phone: "", comment: "" });

  const filteredProducts = activeCategory === "Все" ? products : products.filter((p) => p.category === activeCategory);
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);

  function addToCart(product: Product) {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) return prev.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
  }

  function removeFromCart(id: number) {
    setCart((prev) => prev.filter((i) => i.product.id !== id));
  }

  function changeQty(id: number, delta: number) {
    setCart((prev) => prev.map((i) => i.product.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  }

  async function sendOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!form.phone || !form.name || cart.length === 0) return;
    setSending(true);
    try {
      const res = await fetch("https://functions.poehali.dev/2dc7187c-8fa4-4f19-9dae-dca25307ee50", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items: cart.map((i) => ({ name: i.product.name, article: i.product.article, qty: i.qty, price: i.product.price, unit: i.product.unit })) }),
      });
      if (res.ok) {
        setOrderSent(true);
        setCart([]);
        setForm({ company: "", name: "", phone: "", comment: "" });
      }
    } finally {
      setSending(false);
    }
  }

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
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} className="text-white/75 hover:text-white text-sm font-medium transition-colors duration-200">{l.label}</a>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCartOpen(true)}
                className="relative flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
              >
                <Icon name="ShoppingCart" size={17} />
                <span className="hidden sm:inline">Корзина</span>
                {totalQty > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-orange-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center">{totalQty}</span>
                )}
              </button>
              <a href="tel:+74951234567" className="hidden md:flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-semibold transition-colors">
                <Icon name="Phone" size={15} />
                +7 (495) 123-45-67
              </a>
              <button className="md:hidden text-white" onClick={() => setMobileMenu(!mobileMenu)}>
                <Icon name={mobileMenu ? "X" : "Menu"} size={24} />
              </button>
            </div>
          </div>
        </div>
        {mobileMenu && (
          <div className="md:hidden bg-[#0d2044] border-t border-white/10 px-4 pb-4">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMobileMenu(false)} className="block py-3 text-white/80 hover:text-white text-sm font-medium border-b border-white/10 last:border-0">{l.label}</a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
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
            <p className="text-lg text-white/80 mb-8 leading-relaxed">Более 12 000 позиций в наличии. Отгрузка в день оплаты. Работаем по договору поставки с НДС.</p>
            <div className="flex flex-wrap gap-4">
              <a href="#catalog" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded font-semibold transition-colors text-base">
                <Icon name="Search" size={18} />Перейти в каталог
              </a>
              <a href="#contacts" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3 rounded font-semibold transition-colors text-base">
                <Icon name="Phone" size={18} />Связаться с нами
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
              <div className="inline-block bg-[#0d2044]/10 text-[#0d2044] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded mb-5">О компании</div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0d2044] mb-6 leading-tight">Надёжный партнёр для вашего производства</h2>
              <p className="text-gray-600 leading-relaxed mb-4">ПромТехСнаб — оптовый поставщик промышленных товаров, работающий с 2008 года. Мы специализируемся на поставках крепежа, трубопроводной арматуры, электрооборудования, инструмента и средств защиты.</p>
              <p className="text-gray-600 leading-relaxed mb-8">Наши клиенты — заводы, строительные компании, машиностроительные предприятия и сервисные центры по всей России.</p>
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
            <div className="bg-[#0d2044] rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6">Скачайте документы</h3>
              <div className="space-y-4">
                {downloads.map((d) => (
                  <div key={d.label} className="flex items-center gap-4 bg-white/10 hover:bg-white/20 rounded-xl p-4 cursor-pointer transition-colors group">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={d.icon} size={22} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{d.label}</div>
                      <div className="text-white/60 text-sm">{d.desc}</div>
                      <div className="text-orange-400 text-xs mt-1">{d.size} • PDF</div>
                    </div>
                    <Icon name="Download" size={20} className="text-white/50 group-hover:text-orange-400 transition-colors" />
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/20 flex items-center gap-3 text-white/60 text-sm">
                <Icon name="RefreshCw" size={14} />Обновлено 20 апреля 2025
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="py-20 bg-[#f5f7fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-block bg-[#0d2044]/10 text-[#0d2044] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded mb-4">Преимущества</div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0d2044]">Почему выбирают нас</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((a) => (
              <div key={a.title} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
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
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-block bg-[#0d2044]/10 text-[#0d2044] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded mb-4">Каталог</div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0d2044]">Наша продукция</h2>
            </div>
            <button onClick={() => setCartOpen(true)} className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold text-sm transition-colors">
              <Icon name="ShoppingCart" size={16} />
              Корзина {totalQty > 0 && `(${totalQty})`}
            </button>
          </div>

          {/* Фильтр по категориям */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? "bg-[#0d2044] text-white" : "bg-[#f5f7fa] text-gray-600 hover:bg-gray-200"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Список товаров */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => {
              const inCart = cart.find((i) => i.product.id === product.id);
              return (
                <div key={product.id} className="group relative bg-[#f5f7fa] rounded-xl border border-transparent hover:border-[#0d2044]/20 hover:shadow-xl transition-all duration-300 overflow-visible">
                  {/* Основная карточка */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 bg-[#0d2044] rounded-lg flex items-center justify-center">
                        <Icon name={product.icon} size={18} className="text-white" />
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono mt-1">{product.article}</span>
                    </div>
                    <h3 className="font-semibold text-[#0d2044] text-sm leading-snug mb-1">{product.name}</h3>
                    <p className="text-xs text-gray-400 mb-3">{product.category}</p>
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-base font-black text-[#0d2044]">{product.price} ₽</div>
                        <div className="text-[11px] text-gray-400">{product.unit}</div>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${inCart ? "bg-green-500 text-white" : "bg-[#0d2044] hover:bg-orange-500 text-white"}`}
                      >
                        <Icon name={inCart ? "Check" : "Plus"} size={13} />
                        {inCart ? "В корзине" : "В корзину"}
                      </button>
                    </div>
                  </div>

                  {/* Hover-подсказка с характеристиками */}
                  <div className="absolute left-0 right-0 top-full mt-1 z-30 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                    <div className="bg-[#0d2044] rounded-xl p-4 shadow-2xl border border-white/10">
                      <div className="text-white text-xs font-semibold mb-3 flex items-center gap-1.5">
                        <Icon name="Info" size={12} className="text-orange-400" />
                        Характеристики
                      </div>
                      <div className="space-y-1.5">
                        {product.specs.map((s) => (
                          <div key={s.label} className="flex items-center justify-between gap-4">
                            <span className="text-white/50 text-[11px]">{s.label}</span>
                            <span className="text-white text-[11px] font-medium text-right">{s.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 bg-gradient-to-r from-[#0d2044] to-[#1a3a6e] rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-bold text-xl mb-1">Не нашли нужный товар?</h3>
              <p className="text-white/70 text-sm">Уточните у менеджера — возможно, товар есть под заказ.</p>
            </div>
            <a href="#contacts" className="flex-shrink-0 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded font-semibold transition-colors">
              <Icon name="MessageCircle" size={18} />Написать менеджеру
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-[#f5f7fa]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-block bg-[#0d2044]/10 text-[#0d2044] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded mb-4">FAQ</div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0d2044]">Частые вопросы</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button className="w-full text-left flex items-center justify-between px-6 py-5 gap-4" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-semibold text-[#0d2044] text-base">{faq.q}</span>
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center transition-transform duration-300 ${openFaq === i ? "rotate-45 border-orange-500 bg-orange-500" : ""}`}>
                    <Icon name="Plus" size={16} className={openFaq === i ? "text-white" : "text-gray-400"} />
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
            <div className="inline-block bg-[#0d2044]/10 text-[#0d2044] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded mb-4">Контакты</div>
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
                <a key={c.label} href={c.href} className="flex items-center gap-5 p-5 bg-[#f5f7fa] rounded-xl hover:bg-[#0d2044] group transition-all duration-300">
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
              {[
                { label: "Название компании", placeholder: "ООО «Ваша компания»", type: "text" },
                { label: "Имя и должность", placeholder: "Иванов Иван, директор по закупкам", type: "text" },
                { label: "Телефон", placeholder: "+7 (___) ___-__-__", type: "tel" },
              ].map(({ label, placeholder, type }) => (
                <div key={label}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                  <input type={type} placeholder={placeholder} className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#0d2044] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0d2044] text-sm" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Что нужно?</label>
                <textarea rows={3} placeholder="Опишите, какие товары вас интересуют..." className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#0d2044] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0d2044] text-sm resize-none" />
              </div>
              <button type="submit" className="w-full bg-[#0d2044] hover:bg-orange-500 text-white py-3.5 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2">
                <Icon name="Send" size={17} />Отправить заявку
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
                <a key={l.href} href={l.href} className="text-white/50 hover:text-white text-xs transition-colors">{l.label}</a>
              ))}
            </div>
            <div className="text-white/40 text-xs">© 2025 ПромТехСнаб</div>
          </div>
        </div>
      </footer>

      {/* КОРЗИНА (боковая панель) */}
      {cartOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setCartOpen(false)} />
          <div className="relative ml-auto w-full max-w-md bg-white h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Icon name="ShoppingCart" size={20} className="text-[#0d2044]" />
                <h2 className="font-bold text-[#0d2044] text-lg">Корзина</h2>
                {totalQty > 0 && <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{totalQty}</span>}
              </div>
              <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-gray-700 transition-colors">
                <Icon name="X" size={22} />
              </button>
            </div>

            {orderSent ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Icon name="CheckCircle" size={32} className="text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-[#0d2044] mb-2">Заявка отправлена!</h3>
                <p className="text-gray-500 text-sm mb-6">Наш менеджер свяжется с вами в течение 30 минут.</p>
                <button onClick={() => { setOrderSent(false); setCartOpen(false); }} className="bg-[#0d2044] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-orange-500 transition-colors">
                  Закрыть
                </button>
              </div>
            ) : (
              <form onSubmit={sendOrder} className="flex-1 flex flex-col overflow-hidden">
                {/* Список товаров */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-center">
                      <Icon name="ShoppingCart" size={40} className="text-gray-200 mb-3" />
                      <p className="text-gray-400 text-sm">Корзина пуста</p>
                      <p className="text-gray-300 text-xs mt-1">Добавьте товары из каталога</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.product.id} className="flex gap-3 bg-[#f5f7fa] rounded-xl p-3">
                        <div className="w-9 h-9 bg-[#0d2044] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name={item.product.icon} size={16} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-[#0d2044] leading-snug">{item.product.name}</div>
                          <div className="text-[10px] text-gray-400 mt-0.5">{item.product.price} ₽ / {item.product.unit}</div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <button onClick={() => removeFromCart(item.product.id)} className="text-gray-300 hover:text-red-400 transition-colors">
                            <Icon name="X" size={13} />
                          </button>
                          <div className="flex items-center gap-1.5 mt-auto">
                            <button type="button" onClick={() => changeQty(item.product.id, -1)} className="w-6 h-6 rounded bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
                              <Icon name="Minus" size={11} />
                            </button>
                            <span className="text-sm font-bold text-[#0d2044] w-5 text-center">{item.qty}</span>
                            <button type="button" onClick={() => changeQty(item.product.id, 1)} className="w-6 h-6 rounded bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
                              <Icon name="Plus" size={11} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}

                  {/* Форма контактов */}
                  {cart.length > 0 && (
                    <div className="pt-3 border-t border-gray-100 space-y-3">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Ваши данные</p>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Компания</label>
                        <input required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="ООО «Компания»" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-[#0d2044] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0d2044]" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Имя *</label>
                        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Иван Иванов" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-[#0d2044] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0d2044]" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Телефон *</label>
                        <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (___) ___-__-__" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-[#0d2044] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0d2044]" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Комментарий</label>
                        <textarea value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} placeholder="Сроки, объёмы, пожелания..." rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-[#0d2044] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0d2044] resize-none" />
                      </div>
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="px-6 py-4 border-t border-gray-100">
                    <button type="submit" disabled={sending} className="w-full bg-[#0d2044] hover:bg-orange-500 disabled:opacity-60 text-white py-3.5 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                      {sending ? <><Icon name="Loader" size={17} className="animate-spin" />Отправляем...</> : <><Icon name="Send" size={17} />Отправить заявку</>}
                    </button>
                    <p className="text-[11px] text-center text-gray-400 mt-2">Менеджер свяжется в течение 30 минут</p>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}