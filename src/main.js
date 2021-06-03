import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import './styles/index.css'

import {
  ElButton,
  ElSelect,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElFooter,
  ElRow,
  ElCol,
  ElInput,
} from 'element-plus'

const components = [
  ElAside,
  ElButton,
  ElSelect,
  ElHeader,
  ElMain,
  ElContainer,
  ElFooter,
  ElRow,
  ElCol,
  ElInput,
]

const app = createApp(App)

app.use(router)
app.use(store)

components.forEach((component) => {
  app.component(component.name, component)
})

app.mount('#app')
