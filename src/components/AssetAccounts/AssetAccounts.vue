<template>
  <SubHeader title="Asset Accounts" back-page="member-details" class="p-5" />
  <div v-if="!isLoadingisErrorLoadingYodleeStatus && !isLoadingisErrorLoadingYodleeProviders" class="p-5">
    <div class="border border-color-grey box-border p-5 rounded-md">
      <div class="text-main font-semibold text-smm">Status</div>
      <el-steps v-if="haveYodleeAcc" :active="2" finish-status="success" align-center>
        <el-step title="Link sent" />
        <el-step title="Link used" />
        <el-step title="Yodlee created" />
      </el-steps>
      <Button
        v-else
        class="w-3/12 mt-5"
        text-btn="Link an account"
        witch-icon
        icon-type="lock"
        default-link-btn
        @click="linkYodleeAcc"
      />
    </div>

    <div v-if="haveYodleeAcc" class="border border-color-grey box-border p-5 rounded-md mt-5">
      <div class="text-main font-semibold text-smm mb-5">Providers</div>
      <el-collapse accordion>
        <el-collapse-item v-for="(item, index) in yodleeProviders.data" :key="index" :title="item.name">
          <template v-if="item.accounts">
            <el-table :data="item.accounts" style="width: 100%">
              <el-table-column prop="name" label="Name" width="300" />
              <el-table-column prop="status" label="status" />
              <el-table-column prop="type" label="type" />
              <el-table-column prop="container" label="container" />
              <el-table-column prop="balance" label="balance" />
            </el-table>
          </template>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
  <el-skeleton v-else :rows="10" animated class="p-5" />
</template>
<script>
import { useYodleeStatus } from '@/api/use-yodlee-status.js'
import { useYodleeProviders } from '@/api/use-yodlee-providers.js'
import { createYodleeAcc } from '@/api/vueQuery/create-yodlee-acc'
import { useMutation } from 'vue-query'
import { useAlert } from '@/utils/use-alert'
import { useQueryClient } from 'vue-query'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  name: 'AssetAccounts',
  setup() {
    const route = useRoute()
    const queryClient = useQueryClient()
    const memberId = route.params.id

    const {
      isLoading: isLoadingisErrorLoadingYodleeStatus,
      isErrorLoadingYodleeStatus,
      data: yodleeStatus,
    } = useYodleeStatus(memberId)

    const {
      isLoading: isLoadingisErrorLoadingYodleeProviders,
      isErrorLoadingYodleeProviders,
      data: yodleeProviders,
    } = useYodleeProviders(memberId)

    const {
      mutateAsync: createYodlee,
      isLoading,
      isError,
      isFetching,
      data,
      error,
      refetch,
    } = useMutation(createYodleeAcc)

    const haveYodleeAcc = computed(() => {
      return (
        yodleeStatus.value.data.yodlee_created || yodleeStatus.value.data.link_sent || yodleeStatus.value.data.link_used
      )
    })

    const linkYodleeAcc = async () => {
      const res = await createYodlee(memberId)
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Link send email',
        })
        queryClient.invalidateQueries(['yodlee/status'])
      }
    }

    return {
      yodleeStatus,
      isErrorLoadingYodleeStatus,
      isLoadingisErrorLoadingYodleeStatus,
      isLoadingisErrorLoadingYodleeProviders,
      isErrorLoadingYodleeProviders,
      yodleeProviders,
      haveYodleeAcc,
      linkYodleeAcc,

      isLoading,
      isError,
      isFetching,
      data,
      error,
      refetch,
      createYodlee,
    }
  },
}
</script>

<style>
.el-step__title {
  font-size: 14px;
}
</style>
