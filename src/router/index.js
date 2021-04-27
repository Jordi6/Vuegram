import Vue from 'vue'
import VueRouter, { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import { auth } from '../firebase'
import { CreateRouter, CreateWebHistory } from 'vue-router'



const routes = [
  {
    // home will be dashboard
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "settings" */ "../views/Login.vue"),
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "settings" */ "../views/Settings.vue"),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404 Not Found',
    // redirect to 404, add a 404 component
    component: () => import(/* webpackChunkName: "settings" */ "../views/Settings.vue"),
  }
]

const router = new createRouter({
  history: createWebHistory(),
  mode: 'history', 
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  // if the route has requiresAuth property set to true and the user is not loggin in, redirect them to login view, vue ;)
  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router