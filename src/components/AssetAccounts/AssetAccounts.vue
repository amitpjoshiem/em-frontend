<template>
  <SwdSubHeader title="Asset Accounts" class="p-5" />
  <div v-if="isShowContent" class="p-5">
    <div class="border border-color-grey box-border p-5 rounded-md">
      <div class="text-main font-semibold text-smm">Status</div>
      <el-steps :active="activeStep" finish-status="success" align-center>
        <el-step title="Yodlee created" />
        <el-step title="Link sent" />
        <el-step title="Link used" />
        <el-step title="Provider count" />
      </el-steps>
    </div>
    <div v-if="haveYodleeAcc" class="border border-color-grey box-border p-5 rounded-md mt-5">
      <div class="text-main font-semibold text-smm">Send Link</div>
      <Button
        v-if="!yodleeStatus.data.link_sent"
        class="w-3/12 mt-5"
        text-btn="Link an account"
        witch-icon
        icon-type="lock"
        default-link-btn
        @click="sendLinkYodlee"
      />
      <div>
        <span v-if="yodleeStatus.data.link_sent" class="text-main font-semibold text-xs">
          Expired link: {{ getFormatTime }}
        </span>
      </div>
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
import { useFetchYodleeSendLink } from '@/api/use-fetch-yodlee-send-link.js'
import { useRoute } from 'vue-router'
import { computed, watchEffect } from 'vue'
import { useQueryClient } from 'vue-query'
import { useTimer } from '@/utils/useTimer'

export default {
  name: 'AssetAccounts',
  setup() {
    const route = useRoute()
    const memberId = route.params.id
    const queryClient = useQueryClient()
    const { startTimer, getFormatTime } = useTimer()

    const {
      data: yodleeStatus,
      error: isErrorLoadingYodleeStatus,
      isFetching: isFetchingYodleeStatus,
      refetch: refetchYodleeStatus,
    } = useYodleeStatus(route.params.id)

    const {
      error: isErrorLoadingYodleeProviders,
      data: yodleeProviders,
      isFetching: isFetchingYodleeProviders,
      isLoading: isLoadingYodleeProviders,
    } = useYodleeProviders(memberId)

    const {
      response: sendLinkStatus,
      fetching: fetchingSendLink,
      isLoading: loadingLinkStatus,
      sendLink,
    } = useFetchYodleeSendLink(route.params.id)

    const haveYodleeAcc = computed(() => {
      return yodleeStatus.value.data.yodlee_created
    })

    const isShowContent = computed(() => {
      return !isFetchingYodleeStatus.value && !isFetchingYodleeProviders.value
    })

    watchEffect(() => {
      if (!isFetchingYodleeStatus.value) {
        startTimer(yodleeStatus.value.data.link_ttl)
      }
    })

    const activeStep = computed(() => {
      const status = yodleeStatus.value.data
      switch (true) {
        case status.yodlee_created === false:
          return 0
        case status.link_sent === false:
          return 1
        case status.link_used === false:
          return 2
        case !!status.provider_count.length === false:
          return 3
        default:
          return 0
      }
    })

    const sendLinkYodlee = async () => {
      await sendLink()
      queryClient.invalidateQueries(['yodlee/status'])
    }

    return {
      yodleeStatus,
      isErrorLoadingYodleeStatus,
      isFetchingYodleeStatus,
      isErrorLoadingYodleeProviders,
      isFetchingYodleeProviders,
      yodleeProviders,
      haveYodleeAcc,
      sendLinkYodlee,
      activeStep,
      sendLinkStatus,
      fetchingSendLink,
      sendLink,
      loadingLinkStatus,
      getFormatTime,
      isShowContent,
      refetchYodleeStatus,
      isLoadingYodleeProviders,
    }
  },
}
</script>
