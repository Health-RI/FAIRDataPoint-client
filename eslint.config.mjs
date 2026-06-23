import globals from 'globals'
import pluginImport from 'eslint-plugin-import'
import pluginVue from 'eslint-plugin-vue'
import pluginVuejsAccessibility from 'eslint-plugin-vuejs-accessibility'
import {
  configureVueProject,
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript'

configureVueProject({
  rootDir: import.meta.dirname,
})

export default defineConfigWithVueTs(
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  {
    files: ['src/**/*.{ts,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      import: pluginImport,
      'vuejs-accessibility': pluginVuejsAccessibility,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      'class-methods-use-this': 'off',
      'no-alert': 'off',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-unused-vars': 'off',
      semi: ['error', 'never'],
      'import/extensions': ['error', 'always', {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        vue: 'always',
      }],
      'import/prefer-default-export': 'off',
      'vue/component-name-in-template-casing': ['error', 'kebab-case', {
        registeredComponentsOnly: false,
        ignores: [],
      }],
      'vuejs-accessibility/click-events-have-key-events': 'off',
      'vuejs-accessibility/form-control-has-label': 'off',
      'vuejs-accessibility/label-has-for': 'off',
      'vuejs-accessibility/anchor-has-content': 'off',
      'max-classes-per-file': 'off',
      'no-use-before-define': 'off',
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
      'vue/no-v-for-template-key-on-child': 'off',
      'vue/no-v-for-template-key': 'off',
      'vue/html-button-has-type': 'off',
      'vue/no-template-target-blank': 'off',
    },
  },
)
