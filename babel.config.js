module.exports = function (api) {
  api.cache(true);
  const plugins = [
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env.local',
    }]
  ];

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins,
  };
};