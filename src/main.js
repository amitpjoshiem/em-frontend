import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import InlineSvg from 'vue-inline-svg'
import {
  SchemaForm,
  SchemaWizard,
  SchemaFormFactory,
  useSchemaForm,
} from 'formvuelate'

// Global Component Import
import Input from '@/components/Global/Input/Input.vue'
import Button from '@/components/Global/Button/Button.vue'
import CircularProgress from '@/components/Global/CircularProgress.vue'
import LinearProgress from '@/components/Global/LinearProgress.vue'
import ActionBtn from '@/components/Global/Button/ActionBtn.vue'
import ShareBtn from '@/components/Global/Button/ShareBtn.vue'
import Avatar from '@/components/Global/Avatar.vue'
import TypeUserLabel from '@/components/Global/TypeUserLabel.vue'
import Select from '@/components/Global/Form/Select.vue'
import ItemsPerPage from '@/components/Global/ItemsPerPage.vue'
import DropDown from '@/components/Global/DropDown.vue'
import Checkbox from '@/components/Global/Сheckbox.vue'
import Label from '@/components/Global/Label.vue'
import TextArea from '@/components/Global/TextArea.vue'
import Radio from '@/components/Global/Radio.vue'

import {
  ElProgress,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElSteps,
  ElStep,
  ElCheckbox,
  ElRadio,
  ElInput,
} from 'element-plus'

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
  Select,
  ItemsPerPage,
  ElSteps,
  ElStep,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  DropDown,
  SchemaForm,
  SchemaWizard,
  SchemaFormFactory,
  useSchemaForm,
  Checkbox,
  ElCheckbox,
  ElRadio,
  Label,
  TextArea,
  ElInput,
  Radio,
]

components.forEach((component) => {
  app.component(component.name, component)
})

app.mount('#app')
