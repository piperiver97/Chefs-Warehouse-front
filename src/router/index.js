import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/serviciosview',
      name: 'serviciosview',
      component: () => import('../views/ServiciosView.vue')
    },
    {
      path: '/contactoview',
      name: 'contactoview',
      component: () => import('../views/ContactoView.vue')
    },
    {
      path: '/adminview',
      name: 'adminview',
      component: () => import('../views/AdminView.vue')
    },
    {
      path: '/ingredientview',
      name: 'ingredientview',
      component: () => import('../views/IngredientView.vue')
    },
   
   
   
  ]
})

export default router
