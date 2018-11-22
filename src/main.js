// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import axios from 'axios'
import { Button,Toast,MessageBox,Field,Indicator,Swipe,SwipeItem,InfiniteScroll,TabContainer,TabContainerItem,Lazyload } from 'mint-ui'


Vue.component(Button.name, Button)
Vue.component(Field.name, Field)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.use(InfiniteScroll)
Vue.use(Lazyload, {
  preLoad: 1.3,
  error: '/static/goods/goods/loading.gif',
  loading: '/static/goods/goods/loading.gif',
  attempt: 1
})
Vue.prototype.$toast = Toast
Vue.prototype.$message = MessageBox
Vue.prototype.$loading = Indicator

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
