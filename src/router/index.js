import { createRouter, createWebHistory } from 'vue-router'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/myfavoriate',
      name: 'myfavoriate',
      component: () => import('../views/Favoriate.vue')
    },
    {
      path: '/shoppingcart',
      name: 'shoppingcart',
      component: () => import('../views/Shoppingcart.vue')
    },
    {
      path: '/score',
      name: 'score',
      component: () => import('../views/Score.vue')
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/Calendar.vue')
    },
    {
      path: '/student',
      name: 'student',
      component: () => import('@/views/UserStudent.vue')
    },
    {
      path: '/lesson/insertLesson',
      name: 'insertLesson',
      component: () => import('../views/insertLessonPage.vue')
    },

    {
      path: '/lesson',

      name: 'lesson',

      component: () => import('../views/lessonPage.vue')
    },
    {
      path: '/',

      name: 'HomeVue',

      component: () => import('../views/Home.vue')
    },
    {
      path: '/lesson/lessonDeatil',

      name: 'lessonDeatil',

      component: () => import('../views/lessonDeatil.vue')
    },
    {
      path: '/lesson/shoppingCart',

      name: 'shoppingCart',

      component: () => import('../views/lessonShoppingCart.vue')
    },
    {
      path: '/lesson/lessonStatus',

      name: 'lessonStatus',

      component: () => import('../views/lessonStatus.vue')
    },
  ]
})

export default router
