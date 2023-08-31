import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue"),
      children: [{
        path: "/",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
      // {
      //   path: "/search",
      //   name: "search",
      //   component: () => import("@/views/Search.vue"),
      // },
      // {

      // },
      {
        path: "/videoCourse/:id?",
        name: "VideoCourse",
        component: () => import("@/views/VideoCourse.vue"),
      },
      ]
    },
    
    {
      path: "/Rate",
      name: "Rate",
      component: () => import("@/views/Rate.vue"),
    },
    // 登入後
    {
      path: "/member",
      name: "member",
      component: () => import("@/views/Member.vue"),
      redirect: { name: 'student' },
      children: [
        {
          path: "student",
          name: "student",
          component: () => import("@/views/UserStudent.vue"),
          children: [
            {
              path: "beteacher",
              name: "beteacher",
              component: () => import("@/components/personal/BeTeacher.vue"),
            },
            {
              path: "studentlesson",
              name: "studentlesson",
              component: () => import("@/components/lessons/allStudentLessonView.vue"),
            },
            {
              path: "exercise",
              component: () =>
                import("@/components/exercises/students/StudentAllExercises.vue"),
            },
            
          ]
        },
        {
          path: "exerciseScore/:id?",
          component: () =>
            import("@/components/exercises/students/StudentScore.vue"),
        },
        {
          path: "doExercise/:id?",
          component: () =>
            import("@/components/exercises/students/StudentDoExercise.vue"),
        },
        //----------------------------老師-----------------------------
        {
          path: "teacher",
          component: () => import("@/views/UserTeacher.vue"),
          //出事
          children: [
            {
              path: "mylesson",
              name: "mylesson",
              component: () =>
                import("@/components/exercises/teachers/TeacherAllExercises.vue"),
            },
            {
              path: "exercise",
              component: () =>
                import("@/components/exercises/teachers/TeacherAllExercises.vue"),
            },
            {
              path: "correct/:id?",
              component: () =>
                import(
                  "@/components/exercises/teachers/CorrectStudentsExercises.vue"
                ),
            },
            {
              path: "qa/:id?",
              component: () =>
                import("@/components/exercises/teachers/QuestionNAnswer.vue"),
            },
          ],
        },
        {
          path: "addExercise/:id?",
          component: () =>
            import("@/components/exercises/teachers/AddExercise.vue"),
        },
        //-----------------共用----------------
        {
          path: "personal",
          name: "personal",
          component: () => import("@/views/Personal.vue"),
          children: [
            {
              path: "info",
              component: () => import("@/components/personal/Infomation.vue"),
            },
            {
              path: "apply",
              component: () => import("@/components/personal/ApplyTeacher.vue"),
            },
          ],
        },
        {
          path: "calendar",
          name: "calendar",
          component: () => import("@/views/Calendar.vue"),
        },
        {
          path: "purchase",
          name: "purchase",
          component: () => import("@/views/Purchase.vue"),
        },
        {
          path: "shoppingcart",
          name: "shoppingcart",
          component: () => import("@/views/Shoppingcart.vue"),
          redirect: { name: 'step1' },
          children: [
            {
              path: "step1",
              name: "step1",
              component: () => import("@/components/shopping/CartStep1.vue"),
            },
            {
              path: "step2",
              name: "step2",
              component: () => import("@/components/shopping/CartStep2.vue"),
            },
            {
              path: "step3",
              name: "step3",
              component: () => import("@/components/shopping/CartStep3.vue"),
            },]
        },
        {
          path: "myfavoriate",
          name: "myfavoriate",
          component: () => import("@/views/Favoriate.vue"),
        },
      ],
    },
    {
      path: "/videoClassPage",
      name: "VideoClassPage",
      component: () => import("@/views/VideoClassPage.vue"),
    },

  ],
});

export default router;
