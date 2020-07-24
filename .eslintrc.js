const path = require('path')
const projPath = path.resolve(__dirname, './')

module.exports = {
  env: {
    "browser": true,
    "react-native/react-native": true,
    "es6": true,
  },
  root: true,
  extends: [
    "eslint:recommended",
    '@react-native-community',
    "plugin:react/recommended",
    "airbnb",
  ],
  globals: {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  parser: "babel-eslint",
  parserOptions: {
    "ecmaFeatures": {
        "jsx": true
    },
    "ecmaVersion": 11,
    "sourceType": "module"
  },
  plugins: [
    "react",
    "react-native",
  ],
  settings: {
    "import/resolver": {
      "babel-module": {
        alias: {
          components: path.resolve(projPath, 'src/components'),
          constants: path.resolve(projPath, 'src/constants'),
          static: path.resolve(projPath, 'src/static'),
          logic: path.resolve(projPath, 'src/logic'),
        },
      },
    },
  },
  rules: {
    'prettier/prettier': 0,
    'no-tabs': 0,
    indent: [
        "error",
        "tab"
    ],
    "linebreak-style": [
        "error",
        "unix"
    ],
    quotes: [
        "error",
        "single"
    ],
    semi: [
        "error",
        "never"
    ],
    'react/jsx-indent': [2, 'tab']
  }
}
