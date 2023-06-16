import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BeveragesByCountry from "../views/BeveragesByCountry.vue"
//import BeveragesByType from "../views//BeveragesByType.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  }, {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  }, {
    path: '/admin/create',
    name: 'create',
    component: () => import('../views/admin/CreateBeverage.vue')
  }, {
    path: '/all',
    name: 'all',
    component: () => import('../views/AllBeverages.vue')
  }, {
    path: '/country/:name',
    name: 'country',
    component: () => BeveragesByCountry,
    props: true
  },{
    path: '/type/:name',
    name: 'type',
    component: () => import ('../views/BeveragesByType.vue'),
    props:true
  }, {
    path: '/terms',
    name: 'terms',
    component: () => import('../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
