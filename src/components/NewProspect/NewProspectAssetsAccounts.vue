<template>
  <div class="px-20 flex flex-col justify-between h-full">
    <div class="">
      <div class="flex">
        <Button
          class="mr-5"
          text-btn="Link an account"
          witch-icon
          icon-type="lock"
          default-link-btn
          @click="sendLinkYodlee"
        />
      </div>
    </div>

    <div class="flex justify-end my-6">
      <div class="pr-3">
        <Button default-gray-btn text-btn="Back" @click="backStep" />
      </div>

      <div>
        <Button default-blue-btn text-btn="Go to the Assets Consolidations" @click="saveStep" />
      </div>
    </div>
  </div>
</template>

<script>
import IconFilePorfolio from '@/assets/svg/icon-file-portfolio.svg'
import IconDeleteLink from '@/assets/svg/icon-delete-link.svg'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { scrollTop } from '@/utils/scrollTop'
import { useYodleeStatus } from '@/api/use-yodlee-status.js'
import { useFetchYodleeSendLink } from '@/api/use-fetch-yodlee-send-link.js'

export default {
  name: 'AssetsAccounts',
  setup() {
    const router = useRouter()
    const store = useStore()
    const route = useRoute()

    const {
      response: sendLinkStatus,
      error: linkSendError,
      fetching: fetchingSendLink,
      sendLink,
    } = useFetchYodleeSendLink(route.params.id)

    const {
      isLoading: isLoadingisErrorLoadingYodleeStatus,
      isErrorLoadingYodleeStatus,
      data: yodleeStatus,
    } = useYodleeStatus(route.params.id)

    onMounted(() => {
      store.commit('newProspect/setStep', 3)
      scrollTop()
    })

    const step = computed(() => store.state.newProspect.step)

    const saveStep = () => {
      store.commit('newProspect/setStep', step.value + 1)
      router.push({ name: 'assetsconsolidations', params: { id: route.params.id } })
    }

    const backStep = () => {
      store.commit('newProspect/setStep', step.value - 1)
      router.push({
        name: 'assets-information',
        params: { id: route.params.id },
      })
    }

    const sendLinkYodlee = async () => {
      await sendLink()
    }

    return {
      IconFilePorfolio,
      IconDeleteLink,
      saveStep,
      backStep,
      yodleeStatus,
      isErrorLoadingYodleeStatus,
      isLoadingisErrorLoadingYodleeStatus,
      sendLinkStatus,
      fetchingSendLink,
      sendLinkYodlee,
      linkSendError,
    }
  },
}
</script>
