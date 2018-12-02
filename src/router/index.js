import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Cart from '@/components/person/Cart'
import Follow from '@/components/person/Follow'
import Person from '@/components/person/Person'
import Collect from '@/components/person/Collect'
import ShopFollow from '@/components/person/ShopFollow'
import Address from '@/components/person/Address'
import AddAddress from '@/components/person/AddAddress'
import Home from '@/components/common/Home'
import Login from '@/components/common/Login'
import Register from '@/components/common/Register'
import Search from '@/components/common/Search'
import SearchResult from '@/components/common/SearchResult'
import Goods from '@/components/common/Goods'

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
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/searchresult',
      name: 'SearchResult',
      component: SearchResult
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/collect',
      name: 'Collect',
      component: Collect
    },
    {
      path: '/shop-follow',
      name: 'ShopFollow',
      component: ShopFollow
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/add-address',
      name: 'AddAddress',
      component: AddAddress
    }
  ]
})
