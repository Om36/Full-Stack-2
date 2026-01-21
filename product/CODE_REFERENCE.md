# Code Reference Guide

## File Locations and Purpose

### Context API Files

#### `src/context/AuthContext.jsx`
**Purpose:** Provides global authentication state using React Context API

**Key Exports:**
- `AuthContext` - The context object
- `AuthProvider` - Provider component to wrap the app
- `useAuth()` - Custom hook (optional, can use useContext directly)

**State Properties:**
```javascript
{
  isLoggedIn: boolean,
  userName: string,
  login(userName): function,
  logout(): function
}
```

---

### Redux Store Files

#### `src/redux/store.js`
**Purpose:** Configure and export Redux store

**Configuration:**
```javascript
configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
    cart: cartReducer
  }
})
```

---

#### `src/redux/slices/productsSlice.js`
**Purpose:** Manage product catalog state

**Initial State:**
```javascript
{
  products: [
    { id: 1, name: string, price: number, category: string },
    ...
  ]
}
```

**Actions:**
- `addProduct(payload)` - Add new product
- `updateProduct(payload)` - Update product details
- `removeProduct(id)` - Delete product

---

#### `src/redux/slices/authSlice.js`
**Purpose:** Manage authentication state in Redux

**Initial State:**
```javascript
{
  user: null | string,
  role: null | 'admin' | 'user',
  token: null | string
}
```

**Actions:**
- `setUser({ user, role, token })` - Set user and role
- `clearUser()` - Clear user data

---

#### `src/redux/slices/cartSlice.js`
**Purpose:** Manage shopping cart state

**Initial State:**
```javascript
{
  items: [
    { id: number, name: string, price: number, quantity: number },
    ...
  ]
}
```

**Actions:**
- `addToCart(product)` - Add product to cart with quantity 1
- `removeFromCart(productId)` - Remove product from cart
- `updateQuantity({ id, quantity })` - Update item quantity
- `clearCart()` - Empty the cart

---

### Component Files

#### `src/components/Experiment1a/Experiment1a.jsx`
**Purpose:** Demonstrate Context API usage for authentication

**Key Features:**
- Uses `useContext(AuthContext)` to access auth state
- Login form with input validation
- Display current authentication status
- Logout button

**Hooks Used:**
- `useState()` - For form input
- `useContext()` - For authentication state

---

#### `src/components/Experiment1b/Experiment1b.jsx`
**Purpose:** Demonstrate Redux Toolkit for CRUD operations

**Key Features:**
- Form to add products
- Table display with edit and delete buttons
- Edit mode for updating products
- useDispatch and useSelector hooks

**Redux Hooks Used:**
- `useDispatch()` - To dispatch actions
- `useSelector()` - To select state

**Actions Dispatched:**
- `addProduct()`
- `updateProduct()`
- `removeProduct()`

---

#### `src/components/Experiment1c/Experiment1c.jsx`
**Purpose:** Demonstrate combined Context API + Redux

**Key Features:**
- Context API for authentication
- Redux for products and cart
- Role-based admin panel
- Shopping cart with total calculation
- Product management

**State Management:**
- **Context:** `AuthContext` (user, role, token)
- **Redux:** `authSlice`, `productsSlice`, `cartSlice`

**Admin Features:**
- Add products to catalog
- Delete products from inventory
- View full product inventory

**User Features:**
- Browse product catalog
- Add items to shopping cart
- View cart with quantities
- See total price
- Remove items from cart

---

### Styling Files

#### `src/components/styles.css`
**Purpose:** All component-specific and experiment styles

**Main Classes:**
- `.experiment` - Wrapper for each experiment
- `.auth-section`, `.admin-section`, `.user-section` - Section containers
- `.product-card` - Individual product display
- `.products-grid` - Grid layout for products
- `.cart-section` - Shopping cart display
- `button`, `.delete-btn`, `.edit-btn` - Button styles
- `table` - Table styling

---

#### `src/App.css`
**Purpose:** Main application layout and styling

**Main Classes:**
- `.app-container` - Main flex container
- `.app-header` - Header with gradient background
- `.nav-tabs` - Tab navigation
- `.nav-btn` - Navigation buttons
- `.app-main` - Main content area
- `.app-footer` - Footer section

---

### Entry Points

#### `src/main.jsx`
**Purpose:** React application entry point

**Imports:**
- React StrictMode for development warnings
- Global CSS files
- App component
- Redux store (via Provider)
- AuthProvider from context

---

#### `src/App.jsx`
**Purpose:** Main application component with routing

**Features:**
- Tab-based navigation between experiments
- State for active experiment
- Wraps app with Redux Provider and AuthProvider

---

## Usage Examples

### Using Context API
```javascript
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function MyComponent() {
  const { isLoggedIn, userName, login, logout } = useContext(AuthContext);
  
  return (
    <div>
      {isLoggedIn && <p>Welcome, {userName}!</p>}
      <button onClick={() => login('John')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Using Redux
```javascript
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../redux/slices/productsSlice';

function MyComponent() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  
  const handleAdd = () => {
    dispatch(addProduct({
      name: 'New Product',
      price: 99,
      category: 'Electronics'
    }));
  };
  
  return (
    <div>
      <button onClick={handleAdd}>Add Product</button>
      {products.map(p => <div key={p.id}>{p.name}</div>)}
    </div>
  );
}
```

### Combining Context and Redux
```javascript
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../context/AuthContext';

function MyComponent() {
  // Context for auth
  const { role } = useContext(AuthContext);
  
  // Redux for data
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);
  
  // Show admin features only for admins
  if (role === 'admin') {
    return <AdminPanel />;
  }
  
  return <UserPanel cart={cart} />;
}
```

---

## Common Patterns

### Adding a Product
```javascript
const dispatch = useDispatch();

dispatch(addProduct({
  name: 'Laptop',
  price: 999,
  category: 'Electronics'
}));
```

### Updating Product
```javascript
dispatch(updateProduct({
  id: 1,
  name: 'Updated Name',
  price: 1099,
  category: 'Electronics'
}));
```

### Adding to Cart
```javascript
dispatch(addToCart({
  id: 1,
  name: 'Laptop',
  price: 999,
  category: 'Electronics'
}));
```

### Selecting State
```javascript
// Get specific value
const products = useSelector(state => state.products.products);

// Or entire slice
const cartState = useSelector(state => state.cart);
const { items } = cartState;
```

---

## Debugging Tips

### Redux DevTools
1. Install Redux DevTools extension in browser
2. Open DevTools (F12)
3. Go to "Redux" tab
4. See all dispatched actions and state changes
5. Use time-travel debugging to go back/forward

### React DevTools
1. Install React Developer Tools extension
2. Inspect components and their props
3. Check hook states
4. Trace component re-renders

### Browser Console
- Check for errors (red messages)
- Use `console.log()` in components
- Check Network tab for API calls

---

## File Dependencies

```
App.jsx
├── AuthProvider (AuthContext.jsx)
├── Provider (Redux store)
├── Experiment1a.jsx
│   └── AuthContext
├── Experiment1b.jsx
│   └── productsSlice
├── Experiment1c.jsx
│   ├── AuthContext
│   ├── authSlice
│   ├── productsSlice
│   └── cartSlice
└── App.css

main.jsx
├── index.css
├── components/styles.css
├── App.jsx
└── Redux store
```

---

## Performance Considerations

1. **Redux Selectors**
   - Memoize selectors for expensive computations
   - Use reselect library for complex selectors

2. **useSelector Optimization**
   - useSelector only re-renders when returned value changes
   - Use shallowEqual for object comparisons

3. **Context Performance**
   - Context API is fine for authentication (infrequent updates)
   - For frequently changing state, use Redux

4. **Component Memoization**
   - Use React.memo() for expensive components
   - Memoize callback functions with useCallback

---

## Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| "Cannot read property of undefined" | Using state before it's set | Check initial state in reducer |
| "dispatch is not defined" | Forgot to use useDispatch() | Import and use `const dispatch = useDispatch()` |
| "useSelector is not a function" | Forgot to import from react-redux | Import: `import { useSelector } from 'react-redux'` |
| Context value is undefined | Didn't wrap with Provider | Ensure app is wrapped with `<AuthProvider>` |
| Redux not working | Forgot Provider at app level | Wrap app with `<Provider store={store}>` |

---

## Best Practices

1. ✅ Keep reducers pure
2. ✅ Use Redux for shared, complex state
3. ✅ Use Context for simple, global state
4. ✅ Keep components small and focused
5. ✅ Use meaningful variable and function names
6. ✅ Comment complex logic
7. ✅ Validate form input before dispatch
8. ✅ Handle error states in UI

---

**Last Updated:** January 21, 2026
