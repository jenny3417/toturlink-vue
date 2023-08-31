import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/myfavoriate",
      name: "myfavoriate",
      component: () => import("../views/Favoriate.vue"),
    },
    {
      path: "/shoppingcart",
      name: "shoppingcart",
      component: () => import("@/views/Shoppingcart.vue"),
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
      path: "/score",
      name: "score",
      component: () => import("../views/Score.vue"),
    },
    {
      path: "/purchase",
      name: "purchase",
      component: () => import("../views/Purchase.vue"),
    },
    {
      path: "/calendar",
      name: "calendar",
      component: () => import("../views/Calendar.vue"),
    },
    {
      path: "/student",
      name: "student",
      component: () => import("../views/UserStudent.vue"),
      children: [
        {
          path: "beteacher",
          name: "beteacher",
          component: () => import("../components/personal/BeTeacher.vue"),
        },
        {
          path: "studentlesson",
          name: "studentlesson",
          component: () => import("../components/lessons/allStudentLessonView.vue"),
        },
        {
          path: "exercise",
          component: () =>
            import("../components/exercises/students/StudentAllExercises.vue"),
        },
      ],
    },
    {
      path: "/exerciseScore/:id?",
      component: () =>
        import("@/components/exercises/students/StudentScore.vue"),
    },
    {
      path: "/doExercise/:id?",
      component: () =>
        import("@/components/exercises/students/StudentDoExercise.vue"),
    },
    {
      path: "/teacher",
      component: () => import("../views/UserTeacher.vue"),
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
      path: "/addExercise/:id?",
      component: () =>
        import("@/components/exercises/teachers/AddExercise.vue"),
    },
    {
      path: "/personal",
      component: () => import("../views/Personal.vue"),
      children: [
        {
          path: "/personal/info",
          component: () => import("../components/personal/Infomation.vue"),
        },
        {
          path: "/personal/apply",
          component: () => import("../components/personal/ApplyTeacher.vue"),
        },
      ],
    },
    {
      path: '/google',
      component: () => import("../components/login/google.vue"),
    },
    {
      path: "/lesson/insertLesson",
      name: "insertLesson",
      component: () => import("../views/insertLessonPage.vue"),
    },

    {
      path: "/lesson",

      name: "lesson",

      component: () => import("../views/lessonPage.vue"),
    },
    {
      path: "/",

      name: "HomeVue",

      component: () => import("../views/Home.vue"),
    },
    {
      path: "/lesson/lessonInterFace",
      name: "lessonInfo",
      component: () => import("../views/lessonInterFace.vue"),
    },
    {
      path: "/lesson/checkEdit",
      name: "checkEdit",
      component: () => import("../views/checkEditLesson.vue"),
    },
    {
      path: "/lesson/Edit",
      name: "Edit",
      component: () => import("../views/editLesson.vue"),
    },
    {
      path: "/exercise/:id?",
      component: () =>
        import("@/components/exercises/students/StudentScore.vue"),
    },
    {
      path: "/videoCourse",
      name: "VideoCourse",
      component: () => import("../views/VideoCourse.vue"),
    },
    {
      path: "/createVideoCourse",
      name: "CreateVideoCourse",
      component: () => import("../views/CreateVideoCourse.vue"),
    },
    {
      path: "/videoClassPage",
      name: "VideoClassPage",
      component: () => import("../views/VideoClassPage.vue"),
    },
    // {
    //   path: "/stuLessonView",
    //   name: "stuLessonView",
    //   component: () => import("../components/lessons/allStudentLessonView.vue")
    // },

  ],
});

export default router;
