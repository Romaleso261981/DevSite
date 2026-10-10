# DevSite

Преміальна лендінг-сторінка української вебстудії **DevSite** на Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, React Hook Form і Zod.

## Запуск локально

```bash
npm install
npm run dev -- -p 43123
```

Відкрийте [http://127.0.0.1:43123](http://127.0.0.1:43123).

## Скрипти

| Команда | Опис |
| --- | --- |
| `npm run dev` | Dev-сервер |
| `npm run build` | Production build |
| `npm run start` | Запуск зібраного застосунку |
| `npm run lint` | ESLint |

## Примітки

- Увесь UI-текст українською.
- Форма контактів валідується через Zod; після успішної валідації відкривається `mailto:` (бекенд не підключено — без фейкового «успіху»).
- Логотип: офіційний DS-монограм у `public/images/logo.png` + світлий CSS-вордмарк (у PNG «Dev» майже чорний на темному фоні).
