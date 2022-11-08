<template>
  <SwdDropDown :options="actionsOptions" @select="handleSelect">
    <template #titleDropDown>
      <span
        class="cursor-pointer bg-white rounded flex justify-center items-center w-[28px] h-[28px]"
        :class="{ 'border border-primary': pageDetails }"
      >
        <el-icon :color="pageDetails ? '#042D52' : '#C7CFE3'" class="rotate-90"><MoreFilled /></el-icon>
      </span>
    </template>
  </SwdDropDown>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { MoreFilled } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { useGetDetails } from '@/hooks/use-get-details'

const allAvailibleOptions = {
  1: {
    title: 'Details',
    command: 'details',
  },
  2: {
    title: 'Basic Information',
    command: 'basic-information',
  },
  3: { title: 'Blueprint Report', command: 'blueprint-report' },
  4: { title: 'Client Report', command: 'client-report' },
  5: { title: 'Onboarding', command: 'onboarding' },
  6: { title: 'Assets Accounts', command: 'assets-accounts' },
  7: { title: 'Assets Consolidations', command: 'assets-consolidations' },
  8: { title: 'Contacts', command: 'opportunity-contact' },
}

const optionsPerStepAndType = {
  'widget-details-client': [6, 7],
  'widget-details-support': [6, 7],
  'widget-details-prospect': [5, 6, 7],
  client: [1, 2, 4, 6, 7, 8],
  'prospect@step-0': [1, 5, 6, 7, 8],
  'prospect@step-1': [1, 2, 5, 6, 7, 8],
  'prospect@step-2': [1, 2, 5, 6, 7, 8],
  'prospect@step-3': [1, 2, 5, 6, 7, 8],
  'prospect@step-4': [1, 2, 5, 6, 7, 8],
  'prospect@step-5': [1, 2, 5, 6, 7, 8],
  'prospect@step-6': [1, 2, 5, 6, 7, 8],
  onboarding: [5, 8],
}

function getClientStepHash(user, pageDetails, type = null) {
  switch (true) {
    case type !== null && type === 'support':
      return 'widget-details-support'
    case type !== null && type === 'client':
      return 'widget-details-client'
    case pageDetails && user.type === 'prospect':
      return 'widget-details-prospect'
    case user.type === 'client':
      return 'client'
    case user.type === 'prospect' && user.step === 'basic':
      return 'prospect@step-1'
    case user.type === 'prospect' && user.step === 'assets_income':
      return 'prospect@step-2'
    case user.type === 'prospect' && user.step === 'monthly_expense':
      return 'prospect@step-3'
    case user.type === 'prospect' && user.step === 'assets_accounts':
      return 'prospect@step-4'
    case user.type === 'prospect' && user.step === 'assets_consolidation':
      return 'prospect@step-5'
    case user.type === 'prospect' && user.step === 'member_report':
      return 'prospect@step-6'
    default:
      return 'onboarding'
  }
}

function routerForStep(step) {
  switch (true) {
    case step === 'default':
      return 'basic-information'
    case step === 'basic':
      return 'assets-information'
    case step === 'assets_income':
      return 'monthly-expense'
    case step === 'monthly_expense':
      return 'assets-account'
    case step === 'assets_accounts':
      return 'add-assets-consolidations'
    case step === 'assets_consolidation':
      return 'stresstest'
    default:
      return 'basic-information'
  }
}

function buildOptions(user, pageDetails, type) {
  const hash = getClientStepHash(user, pageDetails, type)
  const optionsIds = optionsPerStepAndType[hash]

  return optionsIds.map((id) => allAvailibleOptions[id])
}

export default {
  name: 'SwdMemberActions',
  components: {
    MoreFilled,
  },
  props: {
    user: {
      type: Object,
      require: true,
      default: () => {},
    },
    pageDetails: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    const { getDetails } = useGetDetails()

    const actionsOptions = buildOptions(props.user, props.pageDetails, route.meta.type)

    const handleSelect = (command) => {
      const actionHandler = actionsMap[command]
      actionHandler()
    }

    const actionsMap = {
      details: () => details(),
      'basic-information': () =>
        router.push({
          name: `${route.meta.type}/basic-information`,
          params: { id: props.user.id },
        }),
      'blueprint-report': () =>
        router.push({
          name: `${route.meta.type}/blueprint-report`,
          params: { id: props.user.id },
        }),
      'client-report': () => router.push({ name: `${route.meta.type}/clientreport`, params: { id: props.user.id } }),
      onboarding: () => getOnboarding(),

      'assets-accounts': () =>
        router.push({ name: `${route.meta.type}/asset-accounts`, params: { id: props.user.id } }),
      'assets-consolidations': () =>
        router.push({ name: `${route.meta.type}/assets-consolidations`, params: { id: props.user.id } }),
      'opportunity-contact': () =>
        router.push({ name: `${route.meta.type}/opportunity-contact`, params: { id: props.user.id } }),
    }

    const getOnboarding = () => {
      store.commit('globalComponents/setAdvisorId', props.user.owner_id)
      router.push({
        name: routerForStep(props.user.step),
        params: { id: props.user.id, step: props.user.step },
      })
    }

    const details = () => {
      getDetails({ member: props.user })
    }

    return {
      actionsOptions,
      handleSelect,
    }
  },
}
</script>
