module.exports = {
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
      '^.+\\.scss$': 'jest-transform-stub',
    },
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy',
    },
    transformIgnorePatterns: ['node_modules/(?!react-responsive-carousel)'],
    preset: '@babel/preset-env'
  };
  