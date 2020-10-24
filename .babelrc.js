const packageJson = require('./package.json');

const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        node: '8',
      },
      useBuiltIns: "usage",
      corejs: "3"
    },
  ],
  "@babel/typescript"
];

module.exports = {
    presets,
    ignore: process.env.BABEL_ENV === 'test' ? [] : [
      '**/*.test.(js,ts)',
      'tests/**/*',
      'src/tests/**/*',
    ],
  "plugins": [
    ["module-resolver", {
      "alias": {
        "@core/runner": "./src/runner",
        "@core/definitions": "./src/definitions",
        "@core/constants": "./src/constants",
        "^@core/helpers/(.+)": "./src/helpers/\\1",
      }
    }],
    importVisitor(node => {
      if (packageJson.name !== 'israeli-bank-scrapers-core') {
        return;
      }

      if (node.value === 'puppeteer') {
        node.value = 'puppeteer-core';
      }
    })
  ]
};
