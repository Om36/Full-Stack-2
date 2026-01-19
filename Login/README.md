# Full-Stack-2

This React + Vite setup provides a minimal starting point with HMR and ESLint already configured.

Two official plugins are available:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh.

## React Compiler

The React Compiler is enabled; see the [docs](https://react.dev/learn/react-compiler) for details. Expect some impact on dev and build performance.

## Expanding the ESLint configuration

For production apps, consider TypeScript with type-aware lint rules. The [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) covers integrating TypeScript and [`typescript-eslint`](https://typescript-eslint.io).
