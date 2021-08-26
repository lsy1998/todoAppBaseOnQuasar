import { boot } from 'quasar/wrappers'
import Bmob from "hydrogen-js-sdk";
import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'


// we add it to Vue prototype
// so we can reference it in Vue files as this.$axios
// without the need to import axios or use vue-axios
Bmob.initialize("342441d0eacb4a7e", "123456");

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  // app.config.globalProperties.$api = api
  app.config.globalProperties.Bmob = Bmob
  app.config.globalProperties.$moment = moment
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})


// can also create an axios instance specifically for the backend API
// const api = axios.create({ baseURL: 'https://api.example.com' })
// Vue.prototype.$api = api

export { axios}

