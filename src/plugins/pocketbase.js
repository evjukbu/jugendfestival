import {inject} from 'vue'
import PocketBase from 'pocketbase';

const injectionKey = Symbol('pb')

export const usepb = () => inject(injectionKey)
export const pocketbase = {
  install(app) {
    const pb = new PocketBase('http://127.0.0.1:8090');

    app.provide(injectionKey, pb)
    app.config.globalProperties.$pb = pb
  }

}