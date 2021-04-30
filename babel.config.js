module.exports = {
  comments: false,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '0.10.48'
        }
      }
    ],
    '@babel/preset-typescript',
  ]
};
