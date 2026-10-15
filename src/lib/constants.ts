export const SITE = {
  name: "DevSite",
  tagline: "Преміальна українська вебстудія",
  description:
    "DevSite — преміальна українська агенція веброзробки. Створюємо сучасні сайти, інтернет-магазини та вебзастосунки з акцентом на дизайн, продуктивність і масштабованість.",
  email: "devsite2026@gmail.com",
  /** Display format (international Ukrainian) */
  phone: "+380 68 947 87 23",
  /** E.164 for tel: links */
  phoneTel: "+380689478723",
  url: "https://devsite.ua",
} as const;

export const NAV_LINKS = [
  { href: "#hero", label: "Головна" },
  { href: "#services", label: "Послуги" },
  { href: "#about", label: "Про нас" },
  { href: "#portfolio", label: "Портфоліо" },
  { href: "#technologies", label: "Технології" },
  { href: "#contact", label: "Контакти" },
] as const;

export const SERVICES = [
  {
    id: "landing",
    title: "Landing page",
    description:
      "Швидкі посадкові сторінки з чітким меседжем, анімацією та конверсійною структурою.",
    icon: "LayoutTemplate",
  },
  {
    id: "corporate",
    title: "Корпоративні сайти",
    description:
      "Представницькі сайти компанії з продуманою архітектурою, SEO та зручною адмінкою.",
    icon: "Building2",
  },
  {
    id: "ecommerce",
    title: "Інтернет-магазини",
    description:
      "E-commerce з каталогом, кошиком, оплатою та оптимізацією під продажі й швидкість.",
    icon: "ShoppingBag",
  },
  {
    id: "webapps",
    title: "Вебзастосунки",
    description:
      "Складні вебпродукти: кабінети, дашборди, внутрішні інструменти та API-інтеграції.",
    icon: "AppWindow",
  },
  {
    id: "uiux",
    title: "UI/UX дизайн",
    description:
      "Інтерфейси, прототипи та дизайн-системи, що роблять продукт зрозумілим і привабливим.",
    icon: "Palette",
  },
  {
    id: "support",
    title: "Підтримка",
    description:
      "Технічна підтримка, оновлення, моніторинг і розвиток проєкту після запуску.",
    icon: "LifeBuoy",
  },
] as const;

export const ABOUT_POINTS = [
  {
    title: "Продуктивність",
    description: "Оптимізуємо завантаження, Core Web Vitals і сприйняття швидкості.",
  },
  {
    title: "Масштабованість",
    description: "Будуємо архітектуру, яка витримує ріст аудиторії та функціоналу.",
  },
  {
    title: "Сучасний стек",
    description: "Працюємо з перевіреними технологіями: React, Next.js, TypeScript, Node.",
  },
  {
    title: "UX у центрі",
    description: "Проєктуємо сценарії користувача так, щоб продукт був інтуїтивним.",
  },
  {
    title: "Адаптивність",
    description: "Мобільні, планшетні та десктопні інтерфейси — без компромісів.",
  },
  {
    title: "Чистий код",
    description: "Модульна структура, типізація та практики, зручні для підтримки.",
  },
] as const;

export const TECHNOLOGIES = [
  { name: "JavaScript", short: "JS" },
  { name: "TypeScript", short: "TS" },
  { name: "React", short: "React" },
  { name: "Next.js", short: "Next" },
  { name: "Node.js", short: "Node" },
  { name: "PostgreSQL", short: "PG" },
  { name: "MongoDB", short: "Mongo" },
  { name: "Tailwind CSS", short: "TW" },
] as const;

export const PORTFOLIO = [
  {
    id: "sellingfish",
    title: "Selling Fish",
    type: "Ресторан",
    description:
      "Сайт ресторану морепродуктів: головний екран, бронювання столика, галерея та відгуки гостей.",
    tags: ["Сайт", "Бронювання", "Галерея"],
    image: "/portfolio/sellingfish.png",
  },
  {
    id: "acfixer",
    title: "AC Fixer",
    type: "Сервіс кондиціонування",
    description:
      "Лендінг сервісу з ремонту та встановлення кондиціонерів: послуги, команда, галерея і форма заявки.",
    tags: ["Лендінг", "Послуги", "Заявка"],
    image: "/portfolio/acfixer.png",
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Аналіз",
    description: "Збираємо вимоги, цілі бізнесу та обмеження проєкту.",
  },
  {
    step: "02",
    title: "Планування",
    description: "Формуємо структуру, стек, roadmap і критерії успіху.",
  },
  {
    step: "03",
    title: "UI/UX",
    description: "Проєктуємо інтерфейси, прототипи та візуальну систему.",
  },
  {
    step: "04",
    title: "Розробка",
    description: "Реалізуємо фронтенд, бекенд і інтеграції ітераціями.",
  },
  {
    step: "05",
    title: "Тестування",
    description: "Перевіряємо якість, доступність, швидкість і стабільність.",
  },
  {
    step: "06",
    title: "Запуск",
    description: "Виводимо продукт у прод і супроводжуємо перші релізи.",
  },
] as const;

export const WHY_US = [
  {
    title: "Фокус на результаті",
    description: "Кожне рішення підпорядковане бізнес-цілям і зручності користувача.",
  },
  {
    title: "Преміальний дизайн",
    description: "Смілива візуальна мова без шаблонності та зайвого шуму.",
  },
  {
    title: "Інженерна дисципліна",
    description: "Типізація, код-рев’ю, передбачувана архітектура й документація.",
  },
  {
    title: "Прозора комунікація",
    description: "Зрозумілі етапи, статуси та пріоритети на кожному кроці.",
  },
  {
    title: "Швидкість і якість",
    description: "Ітеративна поставка без компромісу щодо стабільності.",
  },
  {
    title: "Підтримка після релізу",
    description: "Не зникаємо після запуску — допомагаємо розвивати продукт.",
  },
] as const;

export const PROJECT_TYPES = [
  "Landing page",
  "Корпоративний сайт",
  "Інтернет-магазин",
  "Вебзастосунок",
  "UI/UX дизайн",
  "Підтримка / інше",
] as const;
