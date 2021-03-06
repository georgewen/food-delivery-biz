import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ShoppingCart from '../views/Cart.vue'
import Admin from '../views/Admin.vue'
import Orders from '../views/Orders.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Cart',
    name: 'Cart',
    component: ShoppingCart
  },

  {
    path: '/Admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/Orders',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/About',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About //() => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
