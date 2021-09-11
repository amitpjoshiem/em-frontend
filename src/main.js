import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'
import InlineSvg from 'vue-inline-svg'

// Global Component Import
import Button from '@/components/Global/Button/Button.vue'
import ShareBtn from '@/components/Global/Button/ShareBtn.vue'
import Avatar from '@/components/Global/Avatar.vue'
import TypeUserLabel from '@/components/Global/TypeUserLabel.vue'
import Select from '@/components/Global/Form/Select.vue'
import SwdSelect from '@/components/Global/Form/SwdSelect.vue'
import ItemsPerPage from '@/components/Global/ItemsPerPage.vue'
import DropDown from '@/components/Global/DropDown.vue'
import DatePicker from '@/components/Global/DatePicker.vue'
import BackButton from '@/components/Global/Button/BackButton.vue'
import Dialog from '@/components/Global/Dialog.vue'
import Pagination from '@/components/Global/Pagination.vue'
import SubHeader from '@/components/SubHeader.vue'
import PlugForField from '@/components/Global/PlugForField.vue'
import MemberActions from '@/components/Global/MemberActions.vue'

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
  ElDatePicker,
  ElPopover,
  ElSwitch,
  ElDialog,
  ElButton,
  ElPagination,
  ElRadioGroup,
  ElPopper,
  ElSelect,
  ElOption,
  ElSkeleton,
  ElForm,
  ElFormItem,
  ElAutocomplete,
} from 'element-plus'

import './styles/index.css'

const app = createApp(App)

app.use(router)
app.use(store)

// Global Component
const components = [
  Button,
  InlineSvg,
  ShareBtn,
  Avatar,
  TypeUserLabel,
  Select,
  ItemsPerPage,
  DropDown,
  DatePicker,
  BackButton,
  Dialog,
  Pagination,
  SwdSelect,
  SubHeader,
  PlugForField,
  MemberActions,
  ElForm,
  ElFormItem,
  ElAutocomplete,
  ElProgress,
  ElSkeleton,
  ElOption,
  ElRadioGroup,
  ElPopper,
  ElSelect,
  ElButton,
  ElPagination,
  ElSwitch,
  ElDialog,
  ElPopover,
  ElCheckbox,
  ElRadio,
  ElInput,
  ElDatePicker,
  ElSteps,
  ElStep,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
]

components.forEach((component) => {
  app.component(component.name, component)
})

app.config.globalProperties.$dayjs = dayjs
dayjs.extend(relativeTime)

app.mount('#app')
