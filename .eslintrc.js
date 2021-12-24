module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'google',
    'plugin:vue/vue3-recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2021,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'semi': [
      'error',
      'always',
    ],
    'indent': [
      'error',
      2,
    ],
    'linebreak-style': [
      'warn',
      'windows',
    ],
    'object-curly-spacing': [
      'error',
      'always',
    ],
    'require-jsdoc': 'off',
    'vue/no-v-model-argument': 'off',
    'vue/multi-word-component-names': 'off',
    'spaced-comment': [
      'error',
      'always',
      {
        markers: [
          '/',
        ],
      },
    ],
  },
};
