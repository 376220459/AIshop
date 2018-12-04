// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import axios from 'axios'
import { Button,Toast,MessageBox,Field,Indicator,Swipe,SwipeItem,InfiniteScroll,TabContainer,TabContainerItem,Lazyload,Picker,Actionsheet,Switch,Popup } from 'mint-ui'


Vue.component(Button.name, Button)
Vue.component(Field.name, Field)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Picker.name, Picker)
Vue.component(Actionsheet.name, Actionsheet)
Vue.component(Switch.name, Switch)
Vue.component(Popup.name, Popup)
Vue.use(InfiniteScroll)
Vue.use(Lazyload, {
  preLoad: 1.3,
  error: 'static/goods/goods/loading.gif',
  loading: 'static/goods/goods/loading.gif',
  attempt: 1
})
Vue.prototype.$toast = Toast
Vue.prototype.$message = MessageBox
Vue.prototype.$loading = Indicator

axios.defaults.withCredentials = true
Vue.prototype.$http = axios

Vue.config.productionTip = false

router.afterEach((to, from) => {
  if((from.name==='Search' || from.name==='Home')  && to.name==='SearchResult'){
    window.location.reload();
  }
    // if((from.name==='Search' || from.name==='Home') && to.name==='SearchResult'){ 
    //   let isRefresh=sessionStorage.getItem('isRefresh');
    //   if(isRefresh==='0'){ 
    //     sessionStorage.setItem('isRefresh',null); 
    //     window.location.reload() 
    //   }else{ 
    //     sessionStorage.setItem('isRefresh',0); 
    //   } 
    // }else if((from.name==='Search' || from.name==='Home') && from.name==='SearchResult'){ 
    //   sessionStorage.setItem('isRefresh',0) 
    // } 
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
