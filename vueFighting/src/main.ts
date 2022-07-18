import { createApp, createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'
// import Emitter from 'tiny-emitter';

import App from './App.vue'
import router from './router'
import Menu from './components/Menu.vue'
import RouteMenu from './components/RouteMenu.vue'
import Page1 from './pages/page1.vue'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGH5NTAVDFsC31N2htH5lbl7yo5Zy5v7A",
  authDomain: "fighter-cc8be.firebaseapp.com",
  projectId: "fighter-cc8be",
  storageBucket: "fighter-cc8be.appspot.com",
  messagingSenderId: "684081447762",
  appId: "1:684081447762:web:4a1a9817bd318f006db08b"
};

// Initialize Firebase
const a = initializeApp(firebaseConfig);

// const app = createApp(App)
const app = createApp(Page1)
app.config.globalProperties.$msalInstance = {};
// app.config.globalProperties.$emitter = new Emitter();

app.use(createPinia())
app.use(router)

app.mount('#app')
