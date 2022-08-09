import { createApp } from 'vue'
import App from './App.vue'
// 路由管理
import router from './router'
// 状态管理
import { createPinia } from 'pinia'
// 全局样式
import './style/main.css'
//  api接口
import * as API from '@/api'

const app = createApp(App)
app.config.globalProperties.$http = API
app.use(router)
app.use(createPinia())
app.mount('#app')
