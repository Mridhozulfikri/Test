import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../components/Landing.vue') },
  { path: '/input-order', component: () => import('../components/InputOrder.vue') },
  
  { path: '/:catchAll(.*)', component: () => import('../components/NotFound.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
