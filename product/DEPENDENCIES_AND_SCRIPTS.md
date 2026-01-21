# Dependencies and Scripts Guide

## Installed Dependencies

### Production Dependencies
```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "@reduxjs/toolkit": "latest",
  "react-redux": "latest"
}
```

### Development Dependencies
```json
{
  "@eslint/js": "^9.39.1",
  "@types/react": "^19.2.5",
  "@types/react-dom": "^19.2.3",
  "@vitejs/plugin-react": "^5.1.1",
  "babel-plugin-react-compiler": "^1.0.0",
  "eslint": "^9.39.1",
  "eslint-plugin-react-hooks": "^7.0.1",
  "eslint-plugin-react-refresh": "^0.4.24",
  "globals": "^16.5.0",
  "vite": "npm:rolldown-vite@7.2.5"
}
```

---

## Available Scripts

### `npm run dev`
**Starts the development server**
```bash
npm run dev
```
- Launches Vite dev server
- Available at http://localhost:5173/
- Features hot module replacement (HMR)
- Changes appear instantly without refresh
- Press `h + enter` in terminal for help

**Usage:**
```bash
# Default - runs on port 5173
npm run dev

# Custom port
npm run dev -- --port 3000

# Expose to network
npm run dev -- --host
```

---

### `npm run build`
**Creates optimized production build**
```bash
npm run build
```
- Minifies and optimizes code
- Creates `dist/` folder with build output
- Prepares for deployment
- Runs ESLint checks before build

**Output:**
- Minified JavaScript files
- Optimized CSS
- HTML index file
- Asset files

**Usage:**
```bash
# Build for production
npm run build

# Check build size
ls -lh dist/
```

---

### `npm run preview`
**Preview the production build locally**
```bash
npm run preview
```
- Serves the built files from `dist/`
- Simulates production environment
- Helpful for testing before deployment
- Available at http://localhost:4173/ (usually)

**Usage:**
```bash
# First build
npm run build

# Then preview
npm run preview
```

---

### `npm run lint`
**Run ESLint to check code quality**
```bash
npm run lint
```
- Checks JavaScript/JSX syntax
- Enforces React best practices
- Detects unused variables
- Ensures code style consistency

**Output:**
- List of linting errors/warnings
- File and line numbers
- Suggestions for fixes

**Fix automatically (some issues):**
```bash
npm run lint -- --fix
```

---

## Installing New Packages

### Add a Package
```bash
npm install package-name
```

**Example:**
```bash
# Install a popular UI library
npm install axios

# Install as development dependency
npm install --save-dev typescript

# Install specific version
npm install lodash@4.17.21
```

### Useful Packages to Consider

#### For API Requests
```bash
npm install axios
# or
npm install isomorphic-unfetch
```

#### For Form Validation
```bash
npm install react-hook-form
npm install zod
```

#### For Routing
```bash
npm install react-router-dom
```

#### For Styling
```bash
npm install tailwindcss
npm install styled-components
```

#### For Testing
```bash
npm install --save-dev vitest
npm install --save-dev @testing-library/react
```

#### For Date Handling
```bash
npm install date-fns
npm install moment
```

#### For Utilities
```bash
npm install lodash
npm install clsx
```

---

## Dependency Explanations

### React (`react` & `react-dom`)
- **Purpose:** Core React library for building UI components
- **Version:** 19.2.0 (latest)
- **Used for:** Component structure, hooks, JSX

### Redux Toolkit (`@reduxjs/toolkit`)
- **Purpose:** Modern way to write Redux with less boilerplate
- **Features:**
  - createSlice for reducers and actions
  - Built-in Immer for immutable updates
  - Redux DevTools integration
- **Used for:** Complex state management

### React-Redux (`react-redux`)
- **Purpose:** Official React bindings for Redux
- **Provides:**
  - Provider component
  - useDispatch hook
  - useSelector hook
- **Used for:** Connecting React components to Redux store

### Vite
- **Purpose:** Fast build tool and dev server
- **Features:**
  - Near-instant HMR
  - Optimized production builds
  - ES modules support
- **Used for:** Development and production builds

### ESLint
- **Purpose:** Code quality tool
- **Features:**
  - Catches errors
  - Enforces style consistency
  - React-specific rules
- **Used for:** Code analysis and quality assurance

---

## Common npm Commands

```bash
# Install all dependencies
npm install

# Install specific package
npm install package-name

# Install as dev dependency
npm install --save-dev package-name

# Remove package
npm uninstall package-name

# Update all packages
npm update

# Check outdated packages
npm outdated

# Clear cache
npm cache clean --force

# List installed packages
npm list

# Check for security vulnerabilities
npm audit

# Fix security vulnerabilities
npm audit fix

# View package info
npm view package-name

# Run custom script
npm run script-name

# List all scripts
npm run
```

---

## package.json Overview

```json
{
  "name": "product",           // Project name
  "private": true,             // Not published to npm
  "version": "0.0.0",          // Current version
  "type": "module",            // Use ES modules
  "scripts": {
    "dev": "vite",             // Development server
    "build": "vite build",     // Production build
    "lint": "eslint .",        // Code quality check
    "preview": "vite preview"  // Preview build
  },
  "dependencies": {
    // Packages needed for production
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "@reduxjs/toolkit": "latest",
    "react-redux": "latest"
  },
  "devDependencies": {
    // Packages only needed during development
    "vite": "npm:rolldown-vite@7.2.5",
    "eslint": "^9.39.1",
    // ... more dev dependencies
  }
}
```

### Version Notations
```
"^1.2.3"  = 1.2.3 to <2.0.0 (caret - compatible with version)
"~1.2.3"  = 1.2.3 to <1.3.0 (tilde - patch updates only)
"1.2.3"   = Exactly 1.2.3
">=1.2.3" = 1.2.3 or higher
"*"       = Any version
"latest"  = Latest version available
```

---

## Troubleshooting npm Issues

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall everything
npm install
```

### Port Already in Use
```bash
# Use different port
npm run dev -- --port 3000

# Or kill the process using port 5173
# On Windows: taskkill /PID <PID> /F
# On Mac/Linux: lsof -i :5173 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### Module Not Found Error
```bash
# Reinstall all dependencies
npm install

# Check if package is installed
npm list package-name

# Install missing package
npm install package-name
```

### Outdated Dependencies
```bash
# Check outdated packages
npm outdated

# Update specific package
npm install package@latest

# Update all dependencies
npm update
```

---

## Environment Variables

Create a `.env` file in project root for environment variables:

```env
VITE_API_URL=http://localhost:3000
VITE_DEBUG=true
```

Access in code:
```javascript
console.log(import.meta.env.VITE_API_URL);
```

**Note:** Variables must start with `VITE_` to be accessible in browser.

---

## Build Output Information

When you run `npm run build`, you'll get output like:

```
dist/index.html                    10.50 kB │ gzip:  3.50 kB
dist/assets/index-abcd1234.js     150.25 kB │ gzip: 45.30 kB
dist/assets/index-wxyz5678.css     5.75 kB │ gzip:  1.80 kB
✓ built in 2.34s
```

**Meaning:**
- **File size** = Uncompressed size
- **gzip size** = Compressed size (what users download)
- **✓ built** = Build succeeded with timestamp

---

## Deployment Preparation

Before deploying to production:

1. **Update version number**
   ```bash
   # In package.json, change "version": "0.0.0" to "0.1.0"
   ```

2. **Run full test suite**
   ```bash
   npm run lint
   npm run build
   npm run preview
   ```

3. **Check for console errors**
   - Run npm run preview
   - Open DevTools (F12)
   - Check Console tab

4. **Optimize assets**
   - Compress images
   - Minimize CSS/JS (done automatically by build)
   - Remove unused code

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Deploy dist/ folder**
   - Upload `dist/` folder to web server
   - Or use hosting service like Vercel, Netlify, etc.

---

## Lock File (package-lock.json)

The `package-lock.json` file:
- **Purpose:** Locks exact versions of all dependencies
- **Should be:** Committed to version control
- **Ensures:** Same versions installed on all machines
- **Generated by:** npm automatically

**Don't edit manually** - let npm manage it.

---

## npm vs npx

```bash
npm                    # Manages packages
npm install            # Install package locally
npm run script         # Run custom script

npx                    # Runs package binaries directly
npx create-react-app   # Run without installing globally
npx eslint .           # Run eslint without installing
```

---

## Useful npm Shortcuts

```bash
npm i          # Same as npm install
npm i -D       # Same as npm install --save-dev
npm i -g       # Install globally
npm ls         # Same as npm list
npm t          # Same as npm test
npm r          # Same as npm remove
```

---

**Last Updated:** January 21, 2026

**Quick Reference:**
- **Start dev:** `npm run dev`
- **Build:** `npm run build`
- **Check code:** `npm run lint`
- **Install package:** `npm install package-name`
- **Remove package:** `npm uninstall package-name`
