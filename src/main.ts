import './polyfills'
import _ from 'lodash'
import { createApp } from 'vue'
import { Components, Directives, createBootstrap } from 'bootstrap-vue-next'
import vSelect from 'vue-select'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'prismjs/themes/prism.css'
import '@/prism-languages'
import 'vue-prism-editor/dist/prismeditor.min.css'
import 'vue-select/dist/vue-select.css'
import { createEntityConfigs } from '@/entity/entityConfigs'
import type { EntitySpec } from '@/entity/EntityConfig'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import api from './api'
import { registerFontAwesome } from './font-awesome'

console.log('🚀 FDP Client Starting...')

let entitySpecs: EntitySpec[] = []

api.configs.getBootstrap()
  .then((response: any) => {
    console.log('Bootstrap config loaded successfully:', response.data)
    // default to remote config from FDP API, but allow override via local public/config.js file
    const configData = response.data || {};
    ['persistentURL', 'appTitle', 'appSubtitle', 'index'].forEach(
      (prop: string) => {
        if (!_.has(globalThis, `config.${prop}`)) {
          _.set(globalThis, `config.${prop}`, _.get(configData, _.camelCase(prop)))
        }
      },
    )
    // use resource definitions from remote config without possibility to override
    entitySpecs = _.get(configData, 'resourceDefinitions', [])
    console.log('Entity specs loaded:', entitySpecs.length, 'specs')
  })
  .catch((error: any) => {
    console.error('Failed to fetch bootstrap config from FDP API:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      data: error.response?.data,
    })
    // Continue with empty specs to allow error message to be shown in UI
  })
  .finally(() => {
    const entityConfigs = createEntityConfigs(entitySpecs)
    const store = createStore(entityConfigs)
    const router = createRouter(store)

    const app = createApp(App)

    registerFontAwesome(app)
    app.use(createBootstrap())
    Object.entries(Components).forEach(([name, component]) => {
      app.component(name, component as any)
    })
    const directiveMap: Record<string, string> = {
      vBColorMode: 'b-color-mode',
      vBModal: 'b-modal',
      vBPopover: 'b-popover',
      vBScrollspy: 'b-scrollspy',
      vBToggle: 'b-toggle',
      vBTooltip: 'b-tooltip',
    }
    Object.entries(Directives).forEach(([key, directive]) => {
      const name = directiveMap[key] || key
      app.directive(name, directive)
    })
    app.component('VSelect', vSelect)
    app.use(store)
    app.use(router)

    app.mount('#app')
  })
