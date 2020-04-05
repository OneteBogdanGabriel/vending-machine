module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/jsx-filename-extension": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "no-plusplus": "off",
    "react/forbid-prop-types": "off",
    "max-len": "off",
    "no-console": "off",
    "space-infix-ops": "off",
    "semi-spacing": "off",
    "no-debugger": "off",
    "block-spacing": "off",
    "comma-spacing": "off",
    "no-param-reassign": "off",
    "no-alert": "off",
    "radix": "warn",
    "object-curly-newline": "warn",
    "no-unused-vars": "warn",
    "no-throw-literal": "warn",
    "comma-dangle": "warn",
    "react/prop-types": "warn",
    "react/no-unused-prop-types": "warn"
  },
};
