import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'

import App from './App.vue'
import router from './router'
import Menu from './components/Menu.vue'

// const app = createApp(App)
const app = createApp(Menu)

app.use(createPinia())
app.use(router)

app.mount('#app')
