import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Token',
      component: () => import('@/views/Token.vue')
    },
    {
      path: '/header',
      name: 'header',
      component: () => import('@/components/HeaderNav.vue')
    },
    {
      path: '/tokenholdings',
      name: 'Token Holdings',
      component: () => import('@/views/TokenHoldings.vue')
    },
    {
      path: '/tokeninfo',
      name: 'Token Info',
      component: () => import('@/views/TokenInfo.vue')
    },
    {
      path: '/txsbytoken',
      name: 'TxsByToken',
      component: () => import('@/views/TxsByToken.vue')
    },
    {
      path: '/txinfo',
      name: 'Transaction Info',
      component: () => import('@/views/Transaction.vue')
    }
  ]
})
