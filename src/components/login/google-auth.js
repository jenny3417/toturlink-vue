import Vue from 'vue';
import VueGoogleOAuth from 'vue-google-oauth2';

const googleAuthOptions = {
    clientId: '984442641128-hf1d8dqof184dbqd8mldud0j906b5eap.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'select_account'
};

Vue.use(VueGoogleOAuth, googleAuthOptions);
