import { createRouter, createWebHashHistory } from 'vue-router'
import MemoContent from './components/MemoContent.vue'
import MemoHome from './components/MemoHome.vue'

const routes = [
  { path: '/', component: MemoHome },
  { path: '/:id', component: MemoContent }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router