# Extension Guide - How to Enhance the Project

This guide shows how to add new features and extend the experiments.

---

## Adding Features to Experiments

### 1. Add Search Functionality to Products (Experiment 1b)

**Step 1:** Add search input to the component
```javascript
const [searchTerm, setSearchTerm] = useState('');

// In JSX
<input
  type="text"
  placeholder="Search products..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
```

**Step 2:** Filter products
```javascript
const filteredProducts = products.filter(p =>
  p.name.toLowerCase().includes(searchTerm.toLowerCase())
);

// Display filteredProducts instead of products
```

---

### 2. Add Product Categories Filter (Experiment 1b)

**Step 1:** Add category select dropdown
```javascript
const [selectedCategory, setSelectedCategory] = useState('All');

const categories = ['All', ...new Set(products.map(p => p.category))];

<select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
  {categories.map(cat => <option key={cat}>{cat}</option>)}
</select>
```

**Step 2:** Filter by category
```javascript
const filtered = selectedCategory === 'All'
  ? products
  : products.filter(p => p.category === selectedCategory);
```

---

### 3. Add Quantity Counter in Cart (Experiment 1c)

**In Cart Display:**
```javascript
import { updateQuantity } from '../../redux/slices/cartSlice';

// In cart items display
{cart.map((item) => (
  <tr key={item.id}>
    <td>{item.name}</td>
    <td>
      <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>
        -
      </button>
      {item.quantity}
      <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>
        +
      </button>
    </td>
  </tr>
))}
```

---

### 4. Add Price Range Filter (Experiment 1b)

**Step 1:** Add price range sliders
```javascript
const [minPrice, setMinPrice] = useState(0);
const [maxPrice, setMaxPrice] = useState(1000);

<div>
  <label>Min: ${minPrice}</label>
  <input type="range" min="0" max="1000" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} />
  
  <label>Max: ${maxPrice}</label>
  <input type="range" min="0" max="1000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
</div>
```

**Step 2:** Filter products
```javascript
const filtered = products.filter(p => p.price >= minPrice && p.price <= maxPrice);
```

---

## Integrating with a Backend API

### 1. Fetch Products from API (Experiment 1b)

**Install axios:**
```bash
npm install axios
```

**Fetch products on component mount:**
```javascript
import axios from 'axios';
import { useEffect } from 'react';

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://api.example.com/products');
      // Dispatch action to update Redux state
      response.data.forEach(product => dispatch(addProduct(product)));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  fetchProducts();
}, [dispatch]);
```

---

### 2. Save Cart to Backend (Experiment 1c)

**Create order API call:**
```javascript
const handleCheckout = async () => {
  try {
    const response = await axios.post('http://api.example.com/orders', {
      userId: user,
      items: cart,
      total: cartTotal
    });
    
    alert('Order placed successfully!');
    dispatch(clearCart());
  } catch (error) {
    alert('Error placing order');
  }
};

<button onClick={handleCheckout}>Checkout</button>
```

---

## Adding Form Validation

### 1. Form Validation for Product Creation (Experiment 1b)

**Add validation function:**
```javascript
const validateProduct = (formData) => {
  const errors = {};
  
  if (!formData.name.trim()) errors.name = 'Product name is required';
  if (!formData.price || formData.price <= 0) errors.price = 'Valid price is required';
  if (!formData.category.trim()) errors.category = 'Category is required';
  
  return errors;
};
```

**Update submit handler:**
```javascript
const handleAddProduct = () => {
  const errors = validateProduct(formData);
  
  if (Object.keys(errors).length === 0) {
    dispatch(addProduct({...formData, price: parseFloat(formData.price)}));
    setFormData({name: '', price: '', category: ''});
  } else {
    // Show errors to user
    setFormErrors(errors);
  }
};
```

**Display error messages:**
```javascript
{formErrors.name && <span className="error">{formErrors.name}</span>}
{formErrors.price && <span className="error">{formErrors.price}</span>}
{formErrors.category && <span className="error">{formErrors.category}</span>}
```

---

## Using React Hook Form (Advanced)

**Install:**
```bash
npm install react-hook-form
```

**Example:**
```javascript
import { useForm } from 'react-hook-form';

const { register, handleSubmit, watch, formState: { errors } } = useForm();

const onSubmit = (data) => {
  dispatch(addProduct(data));
};

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <input
      {...register('name', { required: 'Name is required' })}
      placeholder="Product name"
    />
    {errors.name && <span>{errors.name.message}</span>}
    
    <input
      {...register('price', { required: 'Price is required', min: 0 })}
      type="number"
      placeholder="Price"
    />
    {errors.price && <span>{errors.price.message}</span>}
    
    <button type="submit">Add Product</button>
  </form>
);
```

---

## Adding Authentication with JWT

### 1. Create Login API Integration

**Create auth service:**
```javascript
// src/services/authService.js
import axios from 'axios';

export const loginUser = async (email, password) => {
  const response = await axios.post('http://api.example.com/login', {
    email,
    password
  });
  
  // Save token to localStorage
  localStorage.setItem('authToken', response.data.token);
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem('authToken');
};
```

**Update AuthContext:**
```javascript
import { loginUser, logoutUser } from '../services/authService';

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    userName: '',
    token: null
  });

  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password);
      setAuthState({
        isLoggedIn: true,
        userName: data.userName,
        token: data.token
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{...authState, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## Adding Local Storage Persistence

### 1. Persist Cart to LocalStorage (Experiment 1c)

**Create a custom hook:**
```javascript
// src/hooks/useLocalStorage.js
import { useEffect } from 'react';

export const useLocalStorage = (key, value, dispatch, action) => {
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      dispatch(action(JSON.parse(stored)));
    }
  }, []);
};
```

**Use in component:**
```javascript
import { useLocalStorage } from '../hooks/useLocalStorage';

const Experiment1c = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);
  
  // Save and load cart from localStorage
  useLocalStorage('cart', cart, dispatch, (items) => ({
    type: 'cart/setCart',
    payload: items
  }));
  
  // ... rest of component
};
```

---

## Adding Sorting Features

### 1. Sort Products by Price (Experiment 1b)

**Add sort state:**
```javascript
const [sortBy, setSortBy] = useState('name'); // 'name', 'price-asc', 'price-desc'

const sortedProducts = [...products].sort((a, b) => {
  if (sortBy === 'name') return a.name.localeCompare(b.name);
  if (sortBy === 'price-asc') return a.price - b.price;
  if (sortBy === 'price-desc') return b.price - a.price;
  return 0;
});
```

**Add sort selector:**
```javascript
<select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
  <option value="name">Sort by Name</option>
  <option value="price-asc">Price: Low to High</option>
  <option value="price-desc">Price: High to Low</option>
</select>
```

---

## Adding Pagination

### 1. Paginate Product List (Experiment 1b)

```javascript
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5;

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
const totalPages = Math.ceil(products.length / itemsPerPage);

// In JSX
<div className="pagination">
  {Array.from({length: totalPages}, (_, i) => (
    <button
      key={i + 1}
      onClick={() => setCurrentPage(i + 1)}
      className={currentPage === i + 1 ? 'active' : ''}
    >
      {i + 1}
    </button>
  ))}
</div>

// Display current page items
{currentProducts.map(product => <ProductItem key={product.id} product={product} />)}
```

---

## Adding Toast Notifications

**Install toastify:**
```bash
npm install react-toastify
```

**Setup in main.jsx:**
```javascript
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <>
    <App />
    <ToastContainer />
  </>,
  document.getElementById('root')
);
```

**Use in components:**
```javascript
import { toast } from 'react-toastify';

const handleAddProduct = () => {
  dispatch(addProduct(formData));
  toast.success('Product added successfully!');
};

const handleDeleteProduct = (id) => {
  dispatch(removeProduct(id));
  toast.info('Product removed');
};
```

---

## Adding Dark Mode

**Add to App.jsx:**
```javascript
const [isDarkMode, setIsDarkMode] = useState(false);

useEffect(() => {
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}, [isDarkMode]);

return (
  <div className={isDarkMode ? 'dark-mode' : ''}>
    <button onClick={() => setIsDarkMode(!isDarkMode)}>
      {isDarkMode ? '☀️' : '🌙'}
    </button>
    {/* App content */}
  </div>
);
```

**Add to CSS:**
```css
body.dark-mode {
  background-color: #1a1a1a;
  color: #fff;
}

.dark-mode .experiment {
  background-color: #2a2a2a;
  border-color: #444;
}

.dark-mode input,
.dark-mode select {
  background-color: #333;
  color: #fff;
  border-color: #555;
}
```

---

## Adding Unit Tests

**Install testing library:**
```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

**Example test:**
```javascript
// src/components/Experiment1a/Experiment1a.test.jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider } from '../../context/AuthContext';
import { Experiment1a } from './Experiment1a';

describe('Experiment1a', () => {
  it('should login with name', async () => {
    render(
      <AuthProvider>
        <Experiment1a />
      </AuthProvider>
    );
    
    const input = screen.getByPlaceholderText('Enter your name');
    const button = screen.getByText('Login');
    
    await userEvent.type(input, 'John');
    await userEvent.click(button);
    
    expect(screen.getByText(/User: John/i)).toBeInTheDocument();
  });
});
```

---

## Performance Optimization Tips

### 1. Memoize Components
```javascript
import { memo } from 'react';

const ProductCard = memo(({ product }) => {
  return <div>{product.name}</div>;
});
```

### 2. Use useCallback for Functions
```javascript
import { useCallback } from 'react';

const handleAddProduct = useCallback((product) => {
  dispatch(addProduct(product));
}, [dispatch]);
```

### 3. Use Selector Optimization
```javascript
// Bad - creates new object each time
const state = useSelector(state => ({
  products: state.products.products,
  cart: state.cart.items
}));

// Good - selects only what's needed
const products = useSelector(state => state.products.products);
const cart = useSelector(state => state.cart.items);
```

---

## Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Deploy to GitHub Pages
```bash
npm install --save-dev gh-pages

# Update package.json scripts:
"build": "vite build && echo 'dist' > dist/.gitkeep",
"deploy": "npm run build && npx gh-pages -d dist"

npm run deploy
```

---

## Next Steps

1. **Add more features** - Follow examples above
2. **Integrate API** - Connect to backend
3. **Add testing** - Write unit and integration tests
4. **Deploy** - Choose hosting platform
5. **Monitor** - Add error tracking and analytics

---

**Last Updated:** January 21, 2026

**Remember:** Start with small features and test thoroughly before moving to the next feature!
