# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

I've made the following improvements:

    Added a toolbar with buttons to add different types of nodes:
        Webhook nodes
        URL nodes
        Response nodes

    Added node deletion functionality:
        Delete button in the toolbar for selected nodes
        Keyboard shortcuts (Delete/Backspace) for selected nodes
        Automatically removes connected edges when deleting nodes

    Improved the node creation process:
        New nodes are added at the viewport center
        Each node gets a unique ID
        Maintains proper icon and type assignments

    Enhanced the UI:
        Semi-transparent toolbar buttons
        Consistent styling with the rest of the interface
        Clear visual feedback for actions

To use the new functionality:

    To add nodes:
        Click the "+" buttons in the top-left toolbar
        Each button adds a different type of node

    To delete nodes:
        Select one or more nodes by clicking them
        Either:
            Press Delete/Backspace
            Click the "Delete Selected" button in the toolbar

    To connect nodes:
        Drag from a node's output handle to another node's input handle

The nodes remain draggable and connectable as before, but now you have full control over adding and removing them from the workflow.
27K daily tokens remaining.
