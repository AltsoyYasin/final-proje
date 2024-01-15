import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Anasayfa",
      component: () => import('../views/Anasayfa.vue'),
    
    },
    {
      path: "/odalar/:odaId",
      name: "Odalar",
      component: () => import('../views/OdaGorunumu.vue')
    }
  ]
})

export default router
