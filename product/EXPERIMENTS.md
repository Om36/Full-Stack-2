# Full Stack Complete Unit-1 Experiments

Complete implementation of React state management experiments using **Context API** and **Redux Toolkit** as per NAAC Integrated Full Stack Development curriculum.

## Project Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation
```bash
npm install
npm run dev
```

The application will start at `http://localhost:5173/`

## Experiments Overview

### **Experiment 1a: React Context API - Authentication**

**Objective:** Create a simple authentication system using React Context API.

**Key Components:**
- `AuthContext.jsx` - Context provider for authentication state
- `Experiment1a.jsx` - Login/logout component

**Features:**
- Store authentication state (`isLoggedIn`, `userName`)
- Login form to set user name
- Logout functionality
- Context-based state management without Redux

**Key Learning Points:**
- `createContext()` API
- Context Provider and Consumer patterns
- `useContext()` hook
- Local state management with useState

---

### **Experiment 1b: Redux Toolkit - Product Management**

**Objective:** Implement product CRUD operations using Redux Toolkit.

**Key Components:**
- `productsSlice.js` - Redux slice for product state
- `Experiment1b.jsx` - Product management component

**Features:**
- **Add Product**: Create new products with name, price, and category
- **Update Product**: Edit existing product details
- **Remove Product**: Delete products from the catalog
- Display all products in a table format
- Form validation

**Redux Actions:**
```javascript
- addProduct(product)
- updateProduct({ id, ...updates })
- removeProduct(productId)
```

**Key Learning Points:**
- Redux Toolkit `createSlice()` API
- Reducers and actions
- `useDispatch()` and `useSelector()` hooks
- Immutable state updates

---

### **Experiment 1c: Combined Context API + Redux Toolkit**

**Objective:** Build an integrated application combining both state management approaches.

**Key Components:**
- `AuthContext.jsx` - Context for authentication (user, role, token)
- `authSlice.js` - Redux slice for auth state in Redux store
- `productsSlice.js` - Redux slice for product catalog
- `cartSlice.js` - Redux slice for shopping cart
- `Experiment1c.jsx` - Integrated application component

**Features:**

#### Authentication Section (Context API)
- User login with role selection (User/Admin)
- Display current user and role
- Logout functionality

#### Admin Features (Role-Based Access)
- **Visible only to Admin users**
- Add new products to the catalog
- Delete products from inventory
- View complete inventory

#### User/Shopping Features
- Browse product catalog
- Add products to shopping cart
- View shopping cart with quantities
- Remove items from cart
- Calculate cart total price

**Redux State Structure:**
```javascript
{
  auth: {
    user: string,
    role: 'user' | 'admin',
    token: string
  },
  products: {
    products: Product[]
  },
  cart: {
    items: CartItem[]
  }
}
```

**Key Learning Points:**
- Integration of Context API and Redux
- Role-based access control (RBAC)
- Complex state management patterns
- Combining multiple slices in Redux store

---

## Project Structure

```
src/
├── assets/                 # Static assets
├── components/
│   ├── Experiment1a/      # Context API experiment
│   │   └── Experiment1a.jsx
│   ├── Experiment1b/      # Redux Toolkit experiment
│   │   └── Experiment1b.jsx
│   ├── Experiment1c/      # Combined experiment
│   │   └── Experiment1c.jsx
│   └── styles.css         # Shared component styles
├── context/
│   └── AuthContext.jsx    # Authentication context
├── redux/
│   ├── slices/
│   │   ├── authSlice.js   # Redux auth slice
│   │   ├── productsSlice.js # Redux products slice
│   │   └── cartSlice.js   # Redux cart slice
│   └── store.js           # Redux store configuration
├── App.jsx                # Main application component
├── App.css                # Application styles
├── main.jsx               # React entry point
├── index.css              # Global styles
└── vite.config.js         # Vite configuration
```

## Technologies Used

- **React** (v19.2.0) - UI library
- **Redux Toolkit** (latest) - State management
- **React-Redux** (latest) - React bindings for Redux
- **Vite** - Build tool and dev server
- **CSS3** - Styling with responsive design

## Running the Application

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## Features Demonstrated

### Context API (Experiment 1a)
- ✅ Context creation and provider
- ✅ useContext hook
- ✅ Local state management
- ✅ Event handling

### Redux Toolkit (Experiment 1b)
- ✅ Slice creation with reducers
- ✅ Immutable state updates
- ✅ useDispatch and useSelector hooks
- ✅ CRUD operations
- ✅ State normalization

### Combined Approach (Experiment 1c)
- ✅ Integration of Context API and Redux
- ✅ Role-based access control
- ✅ Complex state management
- ✅ Multi-feature application
- ✅ Shopping cart functionality

## Key Concepts Covered

1. **State Management Patterns**
   - Local Component State
   - Context API for global UI state
   - Redux for complex application state

2. **React Hooks**
   - useState
   - useContext
   - useDispatch
   - useSelector

3. **Redux Fundamentals**
   - Actions and Reducers
   - Slices (Redux Toolkit)
   - Store configuration
   - Middleware concepts

4. **Advanced Patterns**
   - Role-Based Access Control (RBAC)
   - Component composition
   - Separation of concerns

## Learning Outcomes

After completing these experiments, students will understand:

1. ✅ How to manage component-level state with useState
2. ✅ When and how to use React Context API for global state
3. ✅ Redux Toolkit setup and configuration
4. ✅ Creating and using Redux slices
5. ✅ Dispatching actions and selecting state
6. ✅ Combining multiple state management approaches
7. ✅ Implementing role-based access control
8. ✅ Building interactive React applications

## Testing the Experiments

### Experiment 1a
1. Enter your name in the input field and click Login
2. See the authentication status change
3. Click Logout to reset the state

### Experiment 1b
1. Fill in the product form (Name, Price, Category)
2. Click "Add Product" to add to the list
3. Click "Edit" to modify a product
4. Click "Delete" to remove a product

### Experiment 1c
1. Login with a username and select a role
   - **Admin**: Can add/delete products
   - **User**: Can browse and shop
2. If Admin: Use the admin panel to manage products
3. If User: Add products to cart and see the total

## Troubleshooting

**Port 5173 already in use:**
```bash
npm run dev -- --port 3000
```

**Dependencies not installed:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Redux DevTools:**
Install Redux DevTools extension in your browser to debug Redux state.

## References

- [React Context Documentation](https://react.dev/reference/react/useContext)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Hooks API](https://react.dev/reference/react)
- [Vite Documentation](https://vitejs.dev/)

## Author
NAAC Integrated Full Stack Development Program

## License
MIT
