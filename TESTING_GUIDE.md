# Testing Guide - Library Frontend

## Prerequisites

1. **Backend Running**: Ensure your backend is running at `http://localhost:5285`
2. **Environment**: `.env` file is configured with `VITE_BACKEND_URL`

## Running the Application

```bash
# Install dependencies (if not already done)
npm install
# or
bun install

# Start development server
npm run dev
# or
bun run dev
```

The application will start at `http://localhost:5173`

## Test Scenarios

### 1. User Authentication

#### Test Login
1. Navigate to `http://localhost:5173/login`
2. Enter email and password
3. Try submitting with invalid data to see form validation
4. Submit with valid credentials
5. Should redirect to `/books` page

**Expected Behavior:**
- ✅ Form validation shows errors for invalid inputs
- ✅ API errors are displayed if login fails
- ✅ Successful login redirects to Books page

#### Test Registration
1. Navigate to `http://localhost:5173/register`
2. Fill in all required fields
3. Try different validation scenarios:
   - Email format validation
   - Password minimum length
   - Age range validation
4. Submit the form

**Expected Behavior:**
- ✅ Form validation works on all fields
- ✅ Registration succeeds and redirects to Books page

### 2. Books Page (Library Catalog)

**URL:** `http://localhost:5173/books`

**Tests:**
1. View all books in library
2. Search by title (type in search box)
3. Search by ISBN
4. Click on "Discover Books" to go to Dashboard

**Expected Behavior:**
- ✅ Books are displayed in grid layout
- ✅ Search filters books in real-time
- ✅ Availability status shows for each book
- ✅ Borrow button is disabled when no copies available

### 3. Dashboard Page (Google Books Search)

**URL:** `http://localhost:5173/dashboard`

#### Test Search Functionality
1. **Valid Search:**
   - Enter: "Harry Potter"
   - Click Search
   - Should see Google Books results
   - Should see availability badges

2. **ISBN Search:**
   - Enter: "ISBN: 9780545010221"
   - Click Search
   - Should find specific book

3. **Author Search:**
   - Enter: "Stephen King"
   - Click Search
   - Should find books by this author

4. **Validation Tests:**
   - Try to search with empty field (should show error)
   - Try single character (should show min length error)

**Expected Behavior:**
- ✅ Search validates input before submitting
- ✅ Loading spinner shows while searching
- ✅ Results display with book covers
- ✅ Each book shows "In Our Library" or "Not in our library"
- ✅ Books in library show available copies count
- ✅ Borrow button appears for available books
- ✅ Preview button appears for books not in library

#### Test Availability Indicators

**Green Badge (In Library):**
- Shows when book's ISBN matches library catalog
- Displays: "{available}/{total} available"
- Borrow button is enabled/disabled based on availability

**Gray Badge (Not in Library):**
- Shows when book is not found in library
- Preview button links to Google Books

### 4. Navigation

**Test Navigation Flow:**
1. Home → Login → Books
2. Books → Dashboard → Books
3. Dashboard → My Library → Dashboard
4. Logout from any page → Home

**Expected Behavior:**
- ✅ All navigation links work
- ✅ Header shows user name when logged in
- ✅ Logout clears auth and redirects to home

### 5. Form Validation (React Hook Form)

**Pages with Forms:**
- Login
- Register
- Books (search)
- Dashboard (search)

**Test Each Form:**
1. **Required Fields**: Leave empty and submit
2. **Email Validation**: Enter invalid email format
3. **Password Validation**: Enter password less than 6 characters
4. **Age Validation**: Enter age < 13 or > 120

**Expected Behavior:**
- ✅ Inline error messages appear
- ✅ Form doesn't submit with invalid data
- ✅ Error messages are clear and helpful

## API Integration Tests

### Backend API Endpoints
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /books` - Fetch library books
- `GET /borrows` - Fetch borrow records

### Google Books API
- Search endpoint: `https://www.googleapis.com/books/v1/volumes?q={query}`
- No API key required
- Subject to rate limits

### Test API Error Handling

1. **Backend Down:**
   - Stop your backend server
   - Try to login
   - Should see error message

2. **Invalid Credentials:**
   - Try logging in with wrong password
   - Should see "Failed to login" error

3. **Network Issues:**
   - Simulate slow network in DevTools
   - Should see loading states

## Expected UI Features

### Dashboard
- ✅ Search form with validation
- ✅ Loading spinner during search
- ✅ Grid layout of book results
- ✅ Book cover images
- ✅ Title, author, ISBN, published date
- ✅ Description (truncated to 3 lines)
- ✅ Category badges
- ✅ Availability indicators
- ✅ Borrow/Preview buttons
- ✅ Empty state when no results
- ✅ Result count display

### Books Page
- ✅ Search filter
- ✅ Grid layout
- ✅ Book information cards
- ✅ Availability status
- ✅ Borrow functionality

## Performance Tests

1. **Search Speed:**
   - Google Books search: < 2 seconds
   - Local library search: < 500ms

2. **Page Load:**
   - Initial page load: < 1 second
   - Navigation between pages: instant

3. **Responsiveness:**
   - Test on mobile screen sizes
   - Test on tablet screen sizes
   - Test on desktop screen sizes

## Common Issues & Solutions

### Issue: "Failed to fetch books from Google Books API"
**Solution:** Check internet connection, Google Books API is publicly available

### Issue: Backend connection error
**Solution:** 
- Verify backend is running at `http://localhost:5285`
- Check `.env` file has correct `VITE_BACKEND_URL`

### Issue: Search returns no results
**Solution:**
- Try different search terms
- Check if Google Books API is accessible
- Verify query is at least 2 characters

### Issue: Books not showing as "In Library"
**Solution:**
- Verify ISBN in library matches Google Books ISBN
- Check library books are loaded (`/books` endpoint)

## Browser Compatibility

Tested and working on:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari

## Development Notes

### TypeScript Compilation
```bash
# Build the project to check for real TypeScript errors
npm run build
```

**Note:** WebStorm/IntelliJ may show some inspection warnings in Dashboard.tsx. These are IDE-specific false positives and do not affect compilation or runtime. The TypeScript compiler has no issues with the code.

### Hot Reload
- Changes to `.tsx` files trigger hot reload
- Changes to `.env` require server restart

## Success Criteria

All tests pass when:
- ✅ Users can login and register
- ✅ React Hook Form validates all forms
- ✅ Google Books search returns results
- ✅ Library availability is correctly shown
- ✅ Navigation works between all pages
- ✅ No console errors
- ✅ No runtime errors
- ✅ Responsive design works on all screen sizes

---

**Happy Testing! 🚀**

