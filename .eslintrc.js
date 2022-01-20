module.exports = {
  plugins: ['prettier'],

  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],

  rules: {
    'prettier/prettier': 'warn',
  },

  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
}
