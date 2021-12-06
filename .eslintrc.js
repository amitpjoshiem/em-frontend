module.exports = {
  plugins: ['prettier'],

  extends: [
    // add more generic rulesets here, such as:
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],

  rules: {
    'prettier/prettier': 'warn',
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
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
