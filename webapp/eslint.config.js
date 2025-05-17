import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';
import nodePlugin from 'eslint-plugin-node';
import prettierPlugin from 'eslint-plugin-prettier';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    // Распределяем конфиг love в базовый объект (не в extends!)
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      // 'eslint-comments': eslintComments,
      import: importPlugin,
      node: nodePlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // 'prettier/prettier': ['error'],
      // отключаем весь eslint-comments плагин
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
      // // ✅ Использовать только `type` для объявления типов (вместо interface)
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

      // 🚫 Отключить правило, проверяющее корректность ссылок в тегах `<a>`
      'jsx-a11y/anchor-is-valid': 'off',

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
      // Ограничиваем импорты из backend пакета
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@ideanick/backend/**',
                '!@ideanick/backend/**/',
                '!@ideanick/backend/**/input',
                '!@ideanick/backend/src/utils/can',
              ],
              allowTypeImports: true,
              message: 'Only types and input schemas are allowed to be imported from backend workspace',
            },
          ],
        },
      ],
    },
  },
  // Основной конфиг
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.app.json'],
      },
    },
  },

  // Отдельный override для конфигов
  {
    files: ['vite.config.ts', 'scripts/**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json'],
      },
    },
  },
  eslintConfigPrettier
);

// export default [
//   baseConfig,
//   eslintConfigPrettier, // prettier должен идти **последним**
// ];
