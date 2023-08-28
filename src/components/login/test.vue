<template>
    <button @click="loginWithGoogle">Login with Google</button>
</template>
  
<script>
export default {
    methods: {
        async loginWithGoogle() {
            try {
                await this.$gAuth.signIn();
                // 登录成功后的逻辑
            } catch (error) {
                console.error('Google login error:', error);
            }
        }
    }
};
</script>
  