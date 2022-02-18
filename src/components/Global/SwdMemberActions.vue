<template>
  <SwdDropDown :options="actionsOptions" @select="handleSelect">
    <template #titleDropDown>
      <span class="cursor-pointer bg-white rounded flex justify-center items-center py-2 px-3">
        <InlineSvg :src="IconActionGray" />
      </span>
    </template>
  </SwdDropDown>
</template>

<script>
import IconActionGray from '@/assets/svg/icon-action-gray.svg'
import { useRouter } from 'vue-router'

const allAvailibleOptions = {
  1: {
    title: 'Basic Information',
    command: 'basic-information',
  },
  2: { title: 'Blueprint Report', command: 'blueprint-report' },
  3: { title: 'Client Report', command: 'client-report' },
  4: { title: 'Onboarding', command: 'onboarding' },
  5: { title: 'Assets Accounts', command: 'assets-accounts' },
  6: { title: 'Contact', command: 'opportunity-contact' },
}

const optionsPerStepAndType = {
  client: [1, 3, 5, 6],
  'prospect@step-0': [4, 5, 6],
  'prospect@step-1': [1, 4, 5, 6],
  'prospect@step-2': [1, 4, 5, 6],
  'prospect@step-3': [1, 4, 5, 6],
  'prospect@step-4': [1, 4, 5, 6],
  'prospect@step-5': [1, 4, 5, 6],
  onboarding: [4],
}

function getClientStepHash(user) {
  switch (true) {
    case user.type === 'client':
      return 'client'
    case user.type === 'prospect' && user.step === 'basic':
      return 'prospect@step-1'
    case user.type === 'prospect' && user.step === 'assets_income':
      return 'prospect@step-2'
    case user.type === 'prospect' && user.step === 'assets_accounts':
      return 'prospect@step-3'
    case user.type === 'prospect' && user.step === 'assets_consolidation':
      return 'prospect@step-4'
    case user.type === 'prospect' && user.step === 'member_report':
      return 'prospect@step-5'
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
      return 'assetsacount'
    case step === 'assets_accounts':
      return 'assetsconsolidations'
    case step === 'assets_consolidation':
      return 'stresstest'
    default:
      return 'basic-information'
  }
}

function buildOptions(user) {
  const hash = getClientStepHash(user)
  const optionsIds = optionsPerStepAndType[hash]

  return optionsIds.map((id) => allAvailibleOptions[id])
}

export default {
  name: 'SwdMemberActions',
  props: {
    user: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  setup(props) {
    const router = useRouter()
    const actionsOptions = buildOptions(props.user)

    const handleSelect = (command) => {
      const actionHandler = actionsMap[command]
      actionHandler()
    }

    const actionsMap = {
      'basic-information': () =>
        router.push({
          name: 'member-basic-information',
          params: { id: props.user.id },
        }),
      'blueprint-report': () =>
        router.push({
          name: 'blueprint-report',
          params: { id: props.user.id },
        }),
      'client-report': () => router.push({ name: 'clientreport', params: { id: props.user.id } }),
      onboarding: () =>
        router.push({
          name: routerForStep(props.user.step),
          params: { id: props.user.id, step: props.user.step },
        }),
      'assets-accounts': () => router.push({ name: 'asset-accounts', params: { id: props.user.id } }),
      'opportunity-contact': () => router.push({ name: 'opportunity-contact', params: { id: props.user.id } }),
    }

    return {
      IconActionGray,
      actionsOptions,
      handleSelect,
    }
  },
}
</script>
