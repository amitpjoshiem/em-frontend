import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dayjs from 'dayjs'

import { abilitiesPlugin } from '@casl/vue'
import ability from './services/ability'

import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing'

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
import BackButton from '@/components/Global/Button/BackButton.vue'
import SwdDialog from '@/components/Global/SwdDialog.vue'
import SwdPagination from '@/components/Global/SwdPagination.vue'
import SwdSubHeader from '@/components/SwdSubHeader.vue'
import SwdStubForText from '@/components/Global/SwdStubForText.vue'
import SwdMemberActions from '@/components/Global/SwdMemberActions.vue'
import SwdLeadActions from '@/components/Global/SwdLeadActions.vue'
import SwdNativeSelect from '@/components/Global/SwdNativeSelect.vue'
import SwdSelectFilter from '@/components/Global/SwdSelectFilter.vue'
import SwdSpinner from '@/components/Global/SwdSpinner.vue'
import SwdOpportunityItemActions from '@/components/Global/SwdOpportunityItemActions.vue'
import SwdCurrencyInput from '@/components/Global/SwdCurrencyInput.vue'
import SwdInputNumber from '@/components/Global/SwdInputNumber.vue'
import SwdRetiredLabel from '@/components/Global/SwdRetiredLabel.vue'
import SwdFullScreenLoading from '@/components/Global/SwdFullScreenLoading.vue'

import ElementPlus from 'element-plus'

import './styles/index.css'

const app = createApp(App)

// Global Component
const components = [
  Button,
  InlineSvg,
  ShareBtn,
  SwdAvatar,
  SwdTypeUserLabel,
  SwdItemsPerPage,
  SwdDropDown,
  BackButton,
  SwdDialog,
  SwdPagination,
  SwdSelect,
  SwdSubHeader,
  SwdStubForText,
  SwdMemberActions,
  SwdLeadActions,
  SwdNativeSelect,
  SwdSelectFilter,
  SwdSpinner,
  SwdOpportunityItemActions,
  SwdCurrencyInput,
  SwdInputNumber,
  SwdRetiredLabel,
  SwdFullScreenLoading,
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

app.use(router)
app.use(store)
app.use(ElementPlus)

app.use(abilitiesPlugin, ability, {
  useGlobalProperties: true,
})

Sentry.init({
  app,
  dsn: 'https://c35f75fb2a1f4674b8fa122fb415b584@o1149395.ingest.sentry.io/6247228',
  // eslint-disable-next-line no-undef
  environment: process.env.VUE_APP_ENV,
  integrations: [
    new Integrations.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ['https://dev.app.swdgroup.net/', 'https://stage.app.swdgroup.net/', /^\//],
    }),
  ],
  tracesSampleRate: 1.0,
})

app.mount('#app')
