# Quick Start Guide - Full Stack Unit-1 Experiments

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

This installs:
- React 19.2.0
- Redux Toolkit
- React-Redux
- Vite (build tool)

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to: **http://localhost:5173/**

---

## Understanding the Experiments

### 📚 Experiment 1a - Context API Authentication
**Purpose:** Learn basic React Context API for authentication

**What You'll See:**
- A login form
- Authentication status display
- Login/Logout buttons

**Try This:**
1. Type your name in the input field
2. Click "Login"
3. See how the status changes
4. Click "Logout" to reset

**Code to Study:**
- [AuthContext.jsx](src/context/AuthContext.jsx) - How context is created
- [Experiment1a.jsx](src/components/Experiment1a/Experiment1a.jsx) - How to use useContext hook

---

### 🛒 Experiment 1b - Redux Toolkit Product Management
**Purpose:** Learn Redux Toolkit for managing product inventory

**What You'll See:**
- Product form to add new products
- Table showing all products
- Edit and Delete buttons for each product

**Try This:**
1. Fill in product details (Name, Price, Category)
2. Click "Add Product"
3. Click "Edit" to modify a product
4. Click "Delete" to remove it

**Code to Study:**
- [productsSlice.js](src/redux/slices/productsSlice.js) - Redux reducers and actions
- [Experiment1b.jsx](src/components/Experiment1b/Experiment1b.jsx) - useDispatch and useSelector
- [store.js](src/redux/store.js) - Redux store configuration

---

### 🔐 Experiment 1c - Combined Context API + Redux + Shopping Cart
**Purpose:** Build a complete app combining multiple state management approaches

**What You'll See:**
- Role-based login (Admin/User)
- Admin panel (only for admins)
- Product catalog
- Shopping cart

**Try This:**

#### As Admin:
1. Login as "admin" and select "Admin" role
2. You'll see the admin panel
3. Add new products to the store
4. Delete products from inventory

#### As User:
1. Login as "John" and select "User" role
2. Browse available products
3. Click "Add to Cart" for products you like
4. See the shopping cart update with total price
5. Remove items if needed

**Code to Study:**
- [authSlice.js](src/redux/slices/authSlice.js) - Auth state in Redux
- [cartSlice.js](src/redux/slices/cartSlice.js) - Shopping cart state
- [Experiment1c.jsx](src/components/Experiment1c/Experiment1c.jsx) - Complete integration

---

## File Organization

```
src/
├── components/          # React Components
│   ├── Experiment1a/   # Context API demo
│   ├── Experiment1b/   # Redux Toolkit demo
│   ├── Experiment1c/   # Combined demo
│   └── styles.css      # All component styles
├── context/            # React Context API
│   └── AuthContext.jsx
├── redux/              # Redux store setup
│   ├── slices/        # Redux reducers
│   │   ├── authSlice.js
│   │   ├── productsSlice.js
│   │   └── cartSlice.js
│   └── store.js       # Redux store configuration
├── App.jsx            # Main app component
└── main.jsx           # Entry point
```

---

## Key Concepts to Learn

### 1. React Context API (Experiment 1a)
```javascript
// Creating context
const AuthContext = createContext();

// Using context
const { isLoggedIn, login, logout } = useContext(AuthContext);
```

### 2. Redux Toolkit (Experiment 1b)
```javascript
// Creating a slice with reducers
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => { ... },
    updateProduct: (state, action) => { ... },
    removeProduct: (state, action) => { ... },
  }
});

// Using in components
const dispatch = useDispatch();
const products = useSelector(state => state.products.products);

dispatch(addProduct(newProduct));
```

### 3. Combining Both (Experiment 1c)
- Use **Context API** for authentication (quick, simple)
- Use **Redux** for product catalog and cart (complex, shared state)
- Access context: `useContext(AuthContext)`
- Access redux: `useSelector()` and `useDispatch()`

---

## Common Tasks

### Viewing Redux State
1. Install [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmjabfnkndcadfardjzjn93mpigkaohb)
2. Open DevTools (F12)
3. Go to Redux tab
4. See all state changes in real-time

### Editing Code and Hot Reload
- Edit any file in `src/`
- Changes appear immediately in browser (HMR - Hot Module Replacement)
- No need to refresh!

### Running Tests
```bash
npm run lint  # Check code quality
```

### Building for Production
```bash
npm run build  # Creates optimized build
npm run preview # Preview the build
```

---

## Debugging Tips

### 1. Check the Console
- Press F12 to open Developer Tools
- Go to Console tab
- Look for any red error messages

### 2. Check Network Tab
- If data isn't loading, check Network tab
- Look for failed requests (red)

### 3. React DevTools
- Install [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- Inspect components and props in React tab

### 4. Redux DevTools
- Install Redux DevTools extension
- See all actions dispatched
- Travel through time in state changes

---

## Getting Help

1. **Read the comments** in the code files
2. **Check EXPERIMENTS.md** for detailed documentation
3. **Look at console errors** - they usually tell you what's wrong
4. **Check if dependencies installed** - run `npm install` again
5. **Restart dev server** - sometimes fixes issues

---

## Next Steps After Experiments

1. **Experiment 1a**: Understand when to use Context API
2. **Experiment 1b**: Learn to refactor complex state to Redux
3. **Experiment 1c**: Practice combining both approaches

Then try:
- Adding persistence (localStorage)
- API integration (fetch data from server)
- Authentication with JWT tokens
- More complex forms and validation

---

## Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm build

# Preview production build
npm run preview

# Run linter
npm run lint

# Install new package
npm install package-name

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json && npm install
```

---

**Happy Learning!** 🚀

For questions, refer to the inline code comments and the EXPERIMENTS.md file.
