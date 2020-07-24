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
  rules: {
    'prettier/prettier': 0,
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
    ]
  }
}
