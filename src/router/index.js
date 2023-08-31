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
        {
          path: "/exercise/:id?",
          component: () =>
            import("@/components/exercises/students/StudentScore.vue"),
        },
        //學生影片，有買才看的到
        {
          path: "/videoClassPage",
          name: "VideoClassPage",
          component: () => import("@/views/VideoClassPage.vue"),
        },
        //----------------------------老師-----------------------------
        {
          path: "teacher",
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
            {
              path: "createVideoCourse",
              name: "CreateVideoCourse",
              component: () => import("@/views/CreateVideoCourse.vue"),
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
      ],
    },

    //-----------------------??????????-----------------------------
    {
      path: "/lesson/lessonInterFace",
      name: "lessonInfo",
      component: () => import("@/views/LessonInterFace.vue"),
    },
    {
      path: "/lesson/checkEdit",
      name: "checkEdit",
      component: () => import("@/views/CheckEditLesson.vue"),
    },
    {
      path: "/lesson/Edit",
      name: "Edit",
      component: () => import("@/views/EditLesson.vue"),
    },
    {
      path: "/lesson/insert",
      name: "insertLesson",
      component: () => import("@/views/InsertLessonPage.vue"),
    },
    //-----------------------------------------------------
  ],
});

export default router;
