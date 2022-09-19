<template>
  <div>
    <div class="border box-border border-color-grey rounded-lg p-5">
      <TableAssetsConsolidations :is-show-title="true" />
    </div>
    <AccountStatements v-if="!isFetchingYodleeStatus && !yodleeStatus.yodlee_created" class="mt-5" />
    <div class="flex justify-end my-6">
      <div class="pr-3">
        <Button default-gray-btn text-btn="Back" @click="backStep" />
      </div>
      <SwdButton primary main @click="saveStep">Go to the stress test results</SwdButton>
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

import TableAssetsConsolidations from '@/components/AssetsConsolidations/TableAssetsConsolidations.vue'
import AccountStatements from '@/components/AccountStatements/AccountStatements.vue'

export default {
  name: 'AddAssetsConsolidations',
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
      store.commit('newProspect/setStep', 5)
      scrollTop()
    })

    const step = computed(() => store.state.newProspect.step)

    const saveStep = async () => {
      const res = await assetsConfirm(route.params.id)
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Opportunity update successfully',
        })
        store.commit('newProspect/setStep', step.value + 1)
        router.push({ name: 'stresstest', params: { id: route.params.id } })
      }
    }

    const backStep = () => {
      store.commit('newProspect/setStep', step.value - 1)
      router.push({ name: 'assets-account', params: { id: route.params.id } })
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
