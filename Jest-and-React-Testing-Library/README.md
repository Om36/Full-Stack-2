# Jest and React Testing Library

This project demonstrates front-end testing using Jest and React Testing Library, including unit tests, integration tests, and snapshot tests.

## Features

### Testing Setup
- **Jest**: JavaScript testing framework
- **React Testing Library**: Testing utilities for React components
- **@testing-library/jest-dom**: Custom Jest matchers for DOM elements
- **@testing-library/user-event**: User interaction utilities

### Test Coverage

#### 1. Unit Tests (Button Component)
- Renders correct text content
- Handles click events properly
- Supports disabled state

#### 2. Integration Tests (ContactForm Component)
- Form validation with error messages
- Successful form submission
- Input field interactions
- Email validation
- Real-time error clearing

#### 3. Snapshot Tests (Dashboard Component)
- Loading state
- Error state
- Empty state
- Data loaded state
- Consistent UI snapshots over time

## Running Tests

```bash
npm test
```

## Test Structure

```
src/
  components/
    Button.jsx & Button.test.jsx
    ContactForm.jsx & ContactForm.test.jsx
    Dashboard.jsx & Dashboard.test.jsx
    __snapshots__/
      Dashboard.test.jsx.snap
```

## Technologies Used

- React 19
- Vite
- Jest
- React Testing Library
- Babel

## Original Template

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
