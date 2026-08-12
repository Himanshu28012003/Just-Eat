# JustEat — Food Ordering Frontend

A React + Vite frontend for the JustEat food ordering platform.

## Tech Stack

- **React 19** with React Router v7
- **Vite** for bundling and dev server
- **Tailwind CSS** for styling
- **Axios** for API calls
- **react-hot-toast** for notifications
- **lucide-react** for icons

## Features

### Customer
- Browse and search restaurants (by name, city, cuisine)
- View restaurant menu with Today's Special and Mostly Ordered filters
- Add items to cart and checkout
- Order history and order details
- Favourite restaurants
- Cuisine and dietary preferences with personalised recommendations
- Profile management

### Owner
- Dashboard with restaurant overview, menu stats and recent orders
- Create / edit / delete restaurants
- Create / edit / delete menu items
- Toggle item availability and Today's Special
- View and update order statuses

## Project Structure

```
src/
├── components/       # Reusable UI components
├── context/          # AuthContext (JWT + user state)
├── Pages/            # Route-level page components
│   └── owner/        # Owner-specific pages
└── services/         # Axios service modules per domain
```

## Getting Started

```bash
npm install
npm run dev
```

## Environment

The app connects to:
```
https://backend-ddfuhyh9ehcseeeq.australiacentral-01.azurewebsites.net/api/
```

Configured in `src/services/api.js`. Change `baseURL` to point to a local backend if needed.

## Auth

JWT token and user object are stored in `localStorage`. The app supports two roles:
- `CUSTOMER` — full ordering experience
- `OWNER` — restaurant and menu management


The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
