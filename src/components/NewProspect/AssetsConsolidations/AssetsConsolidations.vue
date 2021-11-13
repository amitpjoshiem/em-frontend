<template>
  <div>
    <TableAssetsConsolidations />
    <AccountStatements v-if="!isFetchingYodleeStatus && !yodleeStatus.yodlee_created" class="mt-5" />
    <div class="flex justify-end my-6">
      <div class="pr-3">
        <Button default-gray-btn text-btn="Back" @click="backStep" />
      </div>
      <div>
        <Button default-blue-btn text-btn="Go to the stress test results" @click="saveStep" />
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter, useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { scrollTop } from '@/utils/scrollTop'
import { useYodleeStatus } from '@/api/use-yodlee-status.js'
import { fetchAssetsConsolidationsConfirm } from '@/api/vueQuery/fetch-assets-consolidations-confirm'
import { useMutation } from 'vue-query'
import { useAlert } from '@/utils/use-alert'

import TableAssetsConsolidations from '@/components/NewProspect/AssetsConsolidations/TableAssetsConsolidations.vue'
import AccountStatements from '@/components/NewProspect/AssetsConsolidations/AccountStatements.vue'

export default {
  name: 'AssetsConsolidations',
  components: {
    TableAssetsConsolidations,
    AccountStatements,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    const { mutateAsync: assetsConfirm } = useMutation(fetchAssetsConsolidationsConfirm)

    const {
      data: yodleeStatus,
      error: isErrorLoadingYodleeStatus,
      isFetching: isFetchingYodleeStatus,
      refetch: refetchYodleeStatus,
    } = useYodleeStatus(route.params.id)

    onMounted(() => {
      store.commit('newProspect/setStep', 4)
      scrollTop()
    })

    const step = computed(() => store.state.newProspect.step)

    const saveStep = async () => {
      const res = await assetsConfirm(route.params.id)
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Prospect update successfully',
        })
        store.commit('newProspect/setStep', step.value + 1)
        router.push({ name: 'stresstest', params: { id: route.params.id } })
      }
    }

    const backStep = () => {
      store.commit('newProspect/setStep', step.value - 1)
      router.push({ name: 'assetsacount', params: { id: route.params.id } })
    }

    return {
      saveStep,
      backStep,
      yodleeStatus,
      isErrorLoadingYodleeStatus,
      isFetchingYodleeStatus,
      refetchYodleeStatus,
    }
  },
}
</script>
