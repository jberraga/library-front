# Library Frontend

A modern React frontend for the Library Management System built with React 19, TypeScript, Vite, TailwindCSS, and React Query.

## 🚀 Features

- **JWT Authentication**: Secure login and registration with token-based auth
- **React Hook Form**: Form validation and error handling
- **React Query**: Efficient data fetching and caching
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **3D Hero Section**: Interactive 3D book models using Three.js
- **Modern UI**: Beautiful components with shadcn/ui
- **Type Safety**: Full TypeScript support

## 📋 Prerequisites

- Node.js 18+ or Bun
- Backend API running (see backend README)

## 🔧 Installation

1. **Install dependencies**

   ```bash
   npm install
   # or
   bun install
   ```

2. **Configure environment variables**

   Copy `.env.example` to `.env` and update the backend URL:

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file:
   ```
   VITE_BACKEND_URL=http://localhost:5000/api
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   bun dev
   ```

   The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ui/             # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── label.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── features/           # Feature-specific components
│   └── home/
│       └── components/
│           └── HeroScene.tsx  # 3D hero section
├── lib/                # Utilities and helpers
│   ├── api.ts         # API client with fetch
│   ├── types.ts       # TypeScript types
│   └── utils.ts       # Utility functions
├── pages/             # Page components
│   ├── Home.tsx       # Landing page
│   ├── Login.tsx      # Login page
│   ├── Register.tsx   # Registration page
│   ├── Books.tsx      # Books catalog
│   └── Dashboard.tsx  # Admin dashboard
├── Routes.tsx         # Route configuration
└── main.tsx          # App entry point
```

## 🔐 Authentication Flow

1. **Register**: Create a new account at `/register`
2. **Login**: Sign in at `/login`
3. **Token Storage**: JWT token stored in localStorage
4. **Protected Routes**: Books and Dashboard require authentication
5. **Auto-logout**: Token expiration handled automatically

## 📚 Pages

- **/** - Landing page with 3D hero section and features
- **/login** - Login page with form validation
- **/register** - Registration page with comprehensive validation
- **/books** - Browse and search books catalog
- **/dashboard** - Admin dashboard with analytics

## 🎨 UI Components

All UI components are built with shadcn/ui and customized with TailwindCSS:

- `Button` - Various button styles and sizes
- `Card` - Content containers
- `Input` - Form inputs with validation
- `Label` - Form labels

## 📡 API Integration

The app uses:
- **React Query** for data fetching and caching
- **Custom API client** using native fetch API
- **JWT Bearer tokens** for authentication
- **Automatic token injection** in API requests

### API Client Example

```typescript
import { api } from '@/lib/api';

// Get all books
const books = await api.get<Book[]>('/books');

// Create a book (requires auth)
const newBook = await api.post<Book>('/books', {
  title: 'Book Title',
  isbn: '1234567890',
  // ...
});
```

## 🎯 Form Validation

Using react-hook-form for form handling:

- Email validation (regex pattern)
- Password strength requirements
- Age validation (min 13 years)
- Phone number formatting
- Real-time error display

## 🌐 Environment Variables

- `VITE_BACKEND_URL` - Backend API base URL (default: http://localhost:5000/api)

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📦 Key Dependencies

- **react** - UI library
- **react-router** - Routing
- **@tanstack/react-query** - Data fetching
- **react-hook-form** - Form handling
- **tailwindcss** - Styling
- **@react-three/fiber** - 3D graphics
- **lucide-react** - Icons

## 🎨 Styling

- **TailwindCSS 4.x** - Utility-first CSS
- **Custom theme** - Primary and accent colors
- **Dark mode support** - Built-in dark mode
- **Responsive design** - Mobile-first approach

## 🚀 Building for Production

```bash
npm run build
# or
bun run build
```

The production build will be in the `dist/` directory.

## 🔒 Security

- JWT tokens stored in localStorage
- Automatic token validation
- Protected routes redirect to login
- Password hashing on backend
- HTTPS recommended for production

## 🐛 Troubleshooting

### API Connection Issues

If you can't connect to the backend:
1. Check backend is running
2. Verify `VITE_BACKEND_URL` in `.env`
3. Check CORS settings on backend

### Authentication Issues

If login fails:
1. Clear localStorage
2. Check credentials
3. Verify backend authentication endpoint

## 📄 License

MIT License

## 👥 Support

For issues and questions, please open an issue on the repository.

