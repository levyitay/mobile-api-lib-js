module.exports = {
  "env": {
    "es2020": false,
    "node": false
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb-typescript/base"
  ],
  "parserOptions": {
    "ecmaVersion": 2015,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "exceptAfterSingleLine": "off",
    "no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "next"
      }
    ],
    "max-len": [
      "error",
      {
        "ignoreTrailingComments": true
      },
      {
        "ignoreStrings": true
      },
      {
        "code": 120
      }
    ],
    "no-continue": "off",
    "no-prototype-builtins":"off",
    "no-restricted-syntax": "off",
    "no-param-reassign": ["error", { "props": false }],
    "no-named-as-default-member": "off",
    "import/no-named-as-default-member": "off",
    "import/extensions":"off",
    'import/no-extraneous-dependencies':"off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-explicit-any":"off",

    "object-curly-newline": ["error",
      {
        "ObjectExpression": {"multiline": true},
        "ObjectPattern": {"multiline": true}
      }
    ],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "radix" : ["error", "as-needed"],
    "import/no-cycle": 0,
    "operator-linebreak" : ["error", "after"],
    "indent": "off",
    "@typescript-eslint/indent": ["error",4],
    "comma-dangle": "off",
    "@typescript-eslint/comma-dangle": ["error", "never"],
    "no-await-in-loop": "warn",
    "@typescript-eslint/lines-between-class-members": "off",
    "no-param-reassign":"off",
  },
  "ignorePatterns": [

    "node_modules",
    "dist",
    "tests",
    "*.json"
  ]
}
;