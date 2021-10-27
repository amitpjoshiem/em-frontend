import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dayjs from 'dayjs'

import calendar from 'dayjs/plugin/calendar'
import updateLocale from 'dayjs/plugin/updateLocale'
import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'

import InlineSvg from 'vue-inline-svg'

// Global Component Import
import Button from '@/components/Global/Button/Button.vue'
import ShareBtn from '@/components/Global/Button/ShareBtn.vue'
import SwdAvatar from '@/components/Global/SwdAvatar.vue'
import SwdTypeUserLabel from '@/components/Global/SwdTypeUserLabel.vue'
import SwdSelect from '@/components/Global/SwdSelect.vue'
import SwdItemsPerPage from '@/components/Global/SwdItemsPerPage.vue'
import SwdDropDown from '@/components/Global/SwdDropDown.vue'
import SwdDatePicker from '@/components/Global/SwdDatePicker.vue'
import BackButton from '@/components/Global/Button/BackButton.vue'
import SwdDialog from '@/components/Global/SwdDialog.vue'
import SwdPagination from '@/components/Global/SwdPagination.vue'
import SwdSubHeader from '@/components/SwdSubHeader.vue'
import SwdStubForText from '@/components/Global/SwdStubForText.vue'
import SwdMemberActions from '@/components/Global/SwdMemberActions.vue'
import SwdNativeSelect from '@/components/Global/SwdNativeSelect.vue'
import SwdSelectFilter from '@/components/Global/SwdSelectFilter.vue'
import SwdSpinner from '@/components/Global/SwdSpinner.vue'

import ElementPlus from 'element-plus'

import './styles/index.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus)

// Global Component
const components = [
  Button,
  InlineSvg,
  ShareBtn,
  SwdAvatar,
  SwdTypeUserLabel,
  SwdItemsPerPage,
  SwdDropDown,
  SwdDatePicker,
  BackButton,
  SwdDialog,
  SwdPagination,
  SwdSelect,
  SwdSubHeader,
  SwdStubForText,
  SwdMemberActions,
  SwdNativeSelect,
  SwdSelectFilter,
  SwdSpinner,
]

components.forEach((component) => {
  app.component(component.name, component)
})

app.config.globalProperties.$dayjs = dayjs
dayjs.extend(relativeTime)
dayjs.extend(calendar)
dayjs.extend(updateLocale)
dayjs.extend(duration)

dayjs.updateLocale('en', {
  calendar: {
    sameDay: '[Today]',
    lastDay: '[Yesterday]',
    lastWeek: 'D MMM YYYY',
    sameElse: 'D MMM YYYY',
  },
})

app.mount('#app')
