module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module-resolver', {
      'root': ['./src'],
      'extensions': ['.jsx', '.js'],
      'alias': {
        'components': './src/components',
        'logic': './src/logic',
        'pages': './src/pages',
        'constants': './src/constants',
        'static': './src/static'
      }
    }]
  ],
};
