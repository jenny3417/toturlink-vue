<template>
    <div>
        <h2>CKEditor 5示例</h2>
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const editor = ClassicEditor;
const editorData = ref('<p>這是CKEditor 5的內容。</p>');
const editorConfig = {
    // CKEditor 5的配置
};
</script>