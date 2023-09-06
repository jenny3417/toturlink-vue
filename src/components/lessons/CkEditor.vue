<template>
    <div>
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" @input="sendToInsert"></ckeditor>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const editor = ClassicEditor;
const editorConfig = {
    toolbar: {
        items: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'undo',
            'redo'
            // 移除 'imageInsert' 按钮
        ]
    }
    // 其他配置项
};

const editorData = ref('');
const emits = defineEmits(['sendToInsert'])



</script>