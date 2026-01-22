import config from '@/config'
import { Store } from 'vuex'
import request from './request'

const createRequestInterceptor = (store: Store<any>) => {
  request.interceptors.request.use((oldConfig) => {
    const newConfig = { ...oldConfig }

    const token = store.getters['auth/token']
    if (token) {
      newConfig.headers.Authorization = `Bearer ${token}`
    }

    return newConfig
  }, null)
}

const createResponseInterceptor = (store: Store<any>) => {
  request.interceptors.response.use(null, async (error) => {
    const { status } = error.response
    if (status === 401 && !error.request.responseURL.endsWith('/tokens')) {
      await store.dispatch('auth/logout')
      window.location.href = `${config.publicPath}/login`
    } else {
      throw error
    }
  })
}

const plugin = (store: Store<any>) => {
  createRequestInterceptor(store)
  createResponseInterceptor(store)
}

export default plugin
