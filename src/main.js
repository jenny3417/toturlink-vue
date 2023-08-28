// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'animate.css'

// 動畫
import WOW from 'wow.js/dist/wow'
new WOW({
    boxClass: 'wow',
    animateClass: 'animate__animated',
    offset: 50,
    mobile: true,
    live: true,
}).init()

//安裝CK編輯器
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import naive from 'naive-ui'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(CKEditor)
app.use(naive)
// app.mount('#app')


//google登入
// import vue3GoogleLogin from 'vue3-google-login'
// import App from './App.vue'

// const google = createApp(App)

// google.use(vue3GoogleLogin, {
//     clientId: '984442641128-c0aiam80benaajt1niff94mj7b6i3omm.apps.googleusercontent.com'
// })

app.mount("#app");
