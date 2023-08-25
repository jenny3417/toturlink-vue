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
      component: () => import('../views/UserStudent.vue'),
      children: [
        {
          path: '/beteacher',
          name: 'beteacher',
          component: () => import('../components/BeATeacher.vue')
        },
        {
          path: '/mylesson',
          name: 'mylesson',
          component: () => import('../components/seeMyLesson.vue')
        },
        {
          path: 'exercise',
          component: () => import('../components/exercises/students/StudentAllExercises.vue')
        }
      ]
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
      path: '/lesson/lessonInterFace',
      name: 'lessonInfo',
      component: () => import('../views/lessonInterFace.vue')
    },
    {
      path: '/lesson/checkEdit',
      name: 'checkEdit',
      component: () => import('../views/checkEditLesson.vue')
    },
    {
      path: '/lesson/Edit',
      name: 'Edit',
      component: () => import('../views/editLesson.vue')
    },
  ]
})

export default router
