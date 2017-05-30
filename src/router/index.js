import Vue from 'vue'
import Router from 'vue-router'
import msite from '@/components/msite/msite'
import restaurants from '@/components/common/restaurants/restaurants'
import shop from '@/components/shop/shop'
import theme from '@/components/common/theme/theme'
import order from '@/components/order/order'
import login from '@/components/order/login'
import profile from '@/components/profile/Profile'
import discover from '@/components/discover/discover'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'msite',
      component: msite
    },
    {
      path: '/restaurants',
      name: 'restaurants',
      component: restaurants
    },
    {
      path: '/shop',
      name: 'shop',
      component: shop
    },
    {
      path: '/theme',
      name: 'theme',
      component: theme
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    },
    {
      path: '/discover',
      name: 'discover',
      component: discover
    }
  ]
})
