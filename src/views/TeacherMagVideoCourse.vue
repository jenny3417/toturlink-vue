<template>
  <div class="d-flex" style="margin-top: 30px">
    <div class="align-items-start container-left">
      <div
        class="nav flex-column nav-pills me-3"
        role="tablist"
        aria-orientation="vertical"
      >
        <router-link
          class="nav-link"
          to="/member/teacher/teacherMagVideoCourse/teacherAllVideoCourse"
          role="tab"
          >我的課程</router-link
        >
        <router-link
          class="nav-link"
          to="/member/teacher/teacherMagVideoCourse/teacherCourseQA"
          role="tab"
          >課程問與答</router-link
        >
        <!-- <router-link
          class="nav-link"
          to="/member/teacher/teacherMagVideoCourse/teacherCoursePost"
          role="tab"
          >課程公告</router-link
        > -->
        <router-link class="nav-link" to="/member/insertCourseInfo" role="tab"
          >新增課程</router-link
        >
      </div>
    </div>
    <div
      class="tab-content container-right"
      id="v-pills-tabContent"
      style="border-left: 1px solid #ccc; margin-left: 20px"
    >
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.me3:active {
  background-color: aquamarine;
}
</style>
