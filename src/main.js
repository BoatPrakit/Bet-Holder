import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ButtonBlack from './components/util/ButtonBlack.vue'
import './assets/tailwind.css'

const app =  createApp(App);
app.component('button-black',ButtonBlack)
app.use(router).mount('#app')
