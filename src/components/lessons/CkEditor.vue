<template>
    <div style="width: 25%;">
        <ckeditor :editor="editor" v-model="editorContent" :config="editorConfig" @contentInput="updateEditorContent">
        </ckeditor>
    </div>
</template>
  
<script setup>
import { ref, watch } from 'vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const editorContent = ref('');
const emit = defineEmits(['emitContent'])
watch(() => editorContent.value, () => {
    console.log(123);
    emit('emitContent', editorContent.value)
})

const updateEditorContent = (content) => {
    emit('emitContent', content);
};


const props = defineProps({
    editorContent: String,
});

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
            'redo',
        ],
    },
    // 其他配置项
};
</script>