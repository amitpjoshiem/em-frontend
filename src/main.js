import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'

import InlineSvg from 'vue-inline-svg'
import { SchemaForm, SchemaWizard, SchemaFormFactory, useSchemaForm } from 'formvuelate'

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
import SwdSelect from '@/components/Global/Form/SwdSelect.vue'
import SwdSelectForm from '@/components/Global/Form/SwdSelectForm.vue'
import ItemsPerPage from '@/components/Global/ItemsPerPage.vue'
import DropDown from '@/components/Global/DropDown.vue'
import InputText from '@/components/Global/Inputs/InputText.vue'
import InputTextForm from '@/components/Global/Inputs/InputTextForm.js'
import InputPassword from '@/components/Global/Inputs/InputPassword.vue'
import Checkbox from '@/components/Global/Сheckbox.vue'
import Label from '@/components/Global/Label.vue'
import TextArea from '@/components/Global/TextArea.vue'
import Radio from '@/components/Global/Radio.vue'
import RadioBoolean from '@/components/Global/RadioBoolean.vue'
import DatePicker from '@/components/Global/DatePicker.vue'
import NextButton from '@/components/Global/Button/NextButton.vue'
import BackButton from '@/components/Global/Button/BackButton.vue'
import Dialog from '@/components/Global/Dialog.vue'
import Pagination from '@/components/Global/Pagination.vue'
import SubHeader from '@/components/SubHeader.vue'
import PlugForField from '@/components/Global/PlugForField.vue'

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
  InputText,
  InputTextForm,
  InputPassword,
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
  ElDatePicker,
  DatePicker,
  ElPopover,
  NextButton,
  BackButton,
  ElSwitch,
  ElDialog,
  Dialog,
  ElButton,
  ElPagination,
  Pagination,
  ElRadioGroup,
  ElPopper,
  RadioBoolean,
  ElSelect,
  SwdSelect,
  SwdSelectForm,
  ElOption,
  SubHeader,
  ElSkeleton,
  PlugForField,
  ElForm,
  ElFormItem,
  ElAutocomplete,
]

components.forEach((component) => {
  app.component(component.name, component)
})

app.config.globalProperties.$dayjs = dayjs
dayjs.extend(relativeTime)

app.mount('#app')
