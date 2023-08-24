import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


//安裝CK編輯器
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import naive from 'naive-ui'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(CKEditor)
app.use(naive)
app.mount('#app')
