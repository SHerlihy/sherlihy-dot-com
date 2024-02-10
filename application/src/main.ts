import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import Home from "./routes/home/Home.vue"
import SherlihyDotCom from "./routes/sherlihyDotCom/SherlihyDotCom.vue"

const routes = [
    {path:"/",component: Home},
    {path:"/shdotcom",component: SherlihyDotCom},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)

app.use(router)

app.mount('#app')
