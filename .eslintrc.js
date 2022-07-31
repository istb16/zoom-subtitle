module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 13,
  },
  plugins: ["svelte3", "@typescript-eslint"],
  overrides: [
    {
      files: ["*.svelte"],
      processor: "svelte3/svelte3",
    },
  ],
  ignorePatterns: ["public/build/*"],
  settings: {
    "svelte3/typescript": require("typescript"),
    "svelte3/ignore-styles": (attributes) =>
      attributes.lang && attributes.lang === "sass",
  },
  rules: {
    "import/no-mutable-exports": "off",
    "import/prefer-default-export": "off",
  },
};
