// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import axios from 'axios'
// import { Xbutton } from 'vux'
// import { AlertPlugin, ToastPlugin } from 'vux'
// Vue.use(AlertPlugin)
// Vue.use(ToastPlugin)

// Vue.use(Xbutton)
// Vue.component('x-button', XButton)

axios.defaults.withCredentials = true
Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
