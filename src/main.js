import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import InlineSvg from 'vue-inline-svg'

// Global Component Import
import Input from '@/components/Global/Input/Input.vue'
import Button from '@/components/Global/Button/Button.vue'
import CircularProgress from '@/components/Global/CircularProgress.vue'
import LinearProgress from '@/components/Global/LinearProgress.vue'
import ActionBtn from '@/components/Global/Button/ActionBtn.vue'
import ShareBtn from '@/components/Global/Button/ShareBtn.vue'
import Avatar from '@/components/Global/Avatar.vue'
import TypeUserLabel from '@/components/Global/TypeUserLabel.vue'
import { ElProgress } from 'element-plus'

import './styles/index.css'

const app = createApp(App)

app.use(router)
app.use(store)

// Global Component
const components = [
  ElProgress,
  Input,
  Button,
  InlineSvg,
  CircularProgress,
  LinearProgress,
  ActionBtn,
  ShareBtn,
  Avatar,
  TypeUserLabel,
]

components.forEach((component) => {
  app.component(component.name, component)
})

app.mount('#app')
