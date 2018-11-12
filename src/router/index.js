import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/common/Home'
import Cart from '@/components/person/Cart'
import Follow from '@/components/person/Follow'
import Person from '@/components/person/Person'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/follow',
      name: 'Follow',
      component: Follow
    },
    {
      path: '/person',
      name: 'Person',
      component: Person
    },
  ]
})
