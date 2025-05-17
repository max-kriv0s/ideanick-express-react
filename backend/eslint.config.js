import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import love from 'eslint-config-love';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';
import nodePlugin from 'eslint-plugin-node';
import prettierPlugin from 'eslint-plugin-prettier';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.node,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      import: importPlugin,
      node: nodePlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': ['error'],

      // Добавляем правило сортировки импортов
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc', // сортировать по возрастанию (A → Z)
            caseInsensitive: false, // учитывать регистр (A ≠ a)
            orderImportKind: 'asc', // сортировка типов import type vs обычные
          },
        },
      ],
      // ✅ Использовать только `type` для объявления типов (вместо interface)
      // '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

      // 🚫 Отключить требование логических проверок с приведением к boolean
      '@typescript-eslint/strict-boolean-expressions': 'off',

      // 🚫 Отключить принуждение использовать ?? вместо ||
      '@typescript-eslint/prefer-nullish-coalescing': 'off',

      // 🚫 Отключить требование указывать явный тип возвращаемого значения у функций
      '@typescript-eslint/explicit-function-return-type': 'off',

      // 🚫 Отключить запрет на использование шаблонных строк с нестрогими типами
      '@typescript-eslint/restrict-template-expressions': 'off',

      // 🚫 Отключить запрет на использование `/// <reference ... />`
      '@typescript-eslint/triple-slash-reference': 'off',

      // 🚫 Отключить запрет на некоторые встроенные типы вроде `{}` или `Function`
      '@typescript-eslint/ban-types': 'off',

      // 🚫 Отключить требование использовать `as Type` вместо `<Type>` или наоборот
      '@typescript-eslint/consistent-type-assertions': 'off',

      // ✅ Всегда требовать фигурные скобки в if, for, while, etc.
      curly: ['error', 'all'],

      // ❗ Запретить неправильные пробелы (в zero-width символах и т.п.), но разрешить в шаблонных строках и строковых литералах
      'no-irregular-whitespace': [
        'error',
        {
          skipTemplates: true, // Разрешить пробелы в шаблонных строках
          skipStrings: true, // Разрешить пробелы в строках
        },
      ],

      // ❌ Запрет на использование process.env напрямую
      'node/no-process-env': 'error',

      // ❌ Запрет на использование `import.meta.env` напрямую, предложить использовать собственный обёрточный модуль
      'no-restricted-syntax': [
        'error',
        {
          selector: '[object.type=MetaProperty][property.name=env]',
          message: 'Use instead import { env } from "lib/env"',
        },
      ],
      'no-console': ['error', { allow: ['info', 'error', 'warn'] }],
    },
  },
  eslintConfigPrettier
);
