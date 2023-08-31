import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/MainView.vue"),
      children: [{
        path: "/",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
      //還沒寫此頁面
      // {
      //   path: "/search",
      //   name: "search",
      //   component: () => import("@/views/Search.vue"),
      // },
      {
        path: "/videoCourse/:id?",
        name: "VideoCourse",
        component: () => import("@/views/VideoCourse.vue"),
      },
      {
        path: "/rate",
        name: "rate",
        component: () => import("@/views/Rate.vue"),
      },
      ]
    },
    // -------------------登入後---------------------------------
    {
      path: "/member",
      name: "member",
      component: () => import("@/views/MainView.vue"),
      redirect: { name: 'student' },
      children: [
        {
          path: "student",
          name: "student",
          redirect: { name: 'studentlesson' },
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
              component: () => import("@/components/lessons/AllStudentLessonView.vue"),
            },
            {
              path: "exercise",
              component: () =>
                import("@/components/exercises/students/StudentAllExercises.vue"),
            },
            
          ]
        },
        //路徑在/member下但是只有獲得權限的特定學生可以使用的頁面
        {
<<<<<<< HEAD
          path: "step2",
          name: "step2",
          component: () => import("@/components/shopping/CartStep2.vue"),
        },
        {
          path: "step3",
          name: "step3",
          component: () => import("@/components/shopping/CartStep3.vue"),
        },
      ],
    },

    {
      path: "/score",
      name: "score",
      component: () => import("../views/Score.vue"),
    },
    {
      path: "/refund",
      name: "refund",
      component: () => import("../views/refund.vue"),
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
          component: () =>
            import("../components/lessons/allStudentLessonView.vue"),
        },
        {
          path: "exercise",
=======
          path: "exerciseScore/:id?",
>>>>>>> 5cf179fd8c6c40a6ba4a3cbdf5be7237c8015361
          component: () =>
            import("@/components/exercises/students/StudentScore.vue"),
        },
        {
          path: "doExercise/:id?",
          component: () =>
            import("@/components/exercises/students/StudentDoExercise.vue"),
        },
        {
          path: "exercise/:id?",
          component: () =>
            import("@/components/exercises/students/StudentScore.vue"),
        },
        //學生影片，有買才看的到
        {
          path: "videoClassPage",
          name: "VideoClassPage",
          component: () => import("@/views/VideoClassPage.vue"),
        },
        //----------------------------老師-----------------------------
        {
          path: "teacher",
          redirect: { name: 'mylesson' },
          component: () => import("@/views/UserTeacher.vue"),
          children: [
            {
              path: "mylesson",
              name: "mylesson",
              component: () =>
                import("@/views/LessonPage.vue"),
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
            //老師管理課程
            {
              path: "createVideoCourse",
              name: "CreateVideoCourse",
              component: () => import("@/views/CreateVideoCourse.vue"),
            },
          ],
        },
        //路徑在 /member 下但是只有老師可以使用的頁面
        {
          path: "addExercise/:id?",
          component: () =>
            import("@/components/exercises/teachers/AddExercise.vue"),
        },
        {
          path: "lesson/lessonInterFace",
          name: "lessonInfo",
          component: () => import("@/views/LessonInterFace.vue"),
        },
        {
          path: "lesson/checkEdit",
          name: "checkEdit",
          component: () => import("@/views/CheckEditLesson.vue"),
        },
        {
          path: "lesson/Edit",
          name: "Edit",
          component: () => import("@/views/EditLesson.vue"),
        },
        {
          path: "lesson/insert",
          name: "insertLesson",
          component: () => import("@/views/InsertLessonPage.vue"),
        },
        //-----------------member共用----------------
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
          component: () => import("@/views/MainView.vue"),
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
        {
          path: "videoCourse",
          name: "videoCourse",
          component: () =>
            import("../components/videoCourse/StudentAllVideoCourse.vue"),
        },
      ],
    },
<<<<<<< HEAD
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
      path: "/google",
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
=======
>>>>>>> 5cf179fd8c6c40a6ba4a3cbdf5be7237c8015361
  ],
});

export default router;
