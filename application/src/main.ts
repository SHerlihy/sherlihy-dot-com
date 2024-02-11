import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import Home from "./routes/home/Home.vue"
import SherlihyDotCom from "./routes/sherlihyDotCom/SherlihyDotCom.vue"
import I2Group from "./routes/i2Group/I2Group.vue"
import TextMagnifier from "./routes/textMagnifier/TextMagnifier.vue"
import DistributedArchitecture from "./routes/distributedArchitecture/DistributedArchitecture.vue"

const routes = [
    {path:"/",component: Home},
    {path:"/shdotcom",component: SherlihyDotCom},
    {path:"/i2Group",component: I2Group},
    {path:"/distArchi",component: DistributedArchitecture},
    {path:"/textmag",component: TextMagnifier},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)

app.use(router)

app.mount('#app')
