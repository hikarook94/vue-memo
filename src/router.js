import { createRouter, createWebHashHistory } from 'vue-router'
import MemoContent from './components/MemoContent.vue'
import MemoHome from './components/MemoHome.vue'

const routes = [
  { path: '/memos', component: MemoHome },
  { path: '/memos/:id', component: MemoContent, props: true }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router