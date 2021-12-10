module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
  },
  compilerOptions: {
    isCustomElement: (tag) => tag.startsWith('el-'),
  },
}
