# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
# or
bun install
```

### Step 2: Configure Backend URL (Optional)
If your backend is not running on `http://localhost:5000/api`, edit `.env`:
```
VITE_BACKEND_URL=your_backend_url_here
```

### Step 3: Start the App
```bash
npm run dev
# or
bun dev
```

Visit: `http://localhost:5173`

## 📱 Quick Test Flow

1. **Home Page** → Click "Get Started"
2. **Register** → Fill form and create account
3. **Books** → Browse the catalog (auto-logged in after register)
4. **Dashboard** → View analytics and stats

## 🔑 Test Credentials (After Registration)

Use the account you just created:
- Email: your-email@example.com
- Password: your-password

## 📝 What's Included

✅ 5 Pages: Home, Login, Register, Books, Dashboard
✅ React Hook Form with validation
✅ React Query for data fetching
✅ JWT authentication
✅ Environment variables
✅ TypeScript
✅ TailwindCSS

## 🐛 Common Issues

**Can't connect to backend?**
- Make sure backend is running
- Check `.env` has correct `VITE_BACKEND_URL`

**Login not working?**
- Register first to create an account
- Check backend authentication endpoint

**Dependencies error?**
- Run `npm install` or `bun install`
- Make sure you're using Node 18+

## 📚 Documentation

- **Full README**: See `README.md`
- **Implementation Details**: See `IMPLEMENTATION.md`
- **Backend API**: See backend documentation

## 🎉 You're Ready!

Everything is set up and ready to use. Happy coding!

