module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
    browser: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    // Trate como erro no eslint
    'prettier/prettier': 'error',
    // não iremos usar this em todos métodos
    'class-methods-use-this': 'off',
    // parametros recebidos podem ser sobrescrevidos
    'no-param-reassign': 'off',
    // algumas variaveis obrigatoriamente tem que ser snack_case
    camelCase: 'off',
    // não pode declarar variaveis que não vai usar, mas express exige isto
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    // não gera erro ao usar fn anonimas
    'func-names': false,
  },
};
