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
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "settings" */ "../views/Settings.vue"),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new createRouter({
  history: createWebHistory(),
  mode: 'history', 
  routes
})

export default router