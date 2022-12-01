<template>
  <div class="flex">
    <aside class="bg-primary min-h-screen flex-col w-[68px] sm:flex hidden" />
    <div class="flex flex-col w-full">
      <div class="flex justify-center items-center bg-main-gray h-16">
        <InlineSvg :src="IrisLogoStandart" width="100" height="40" />
      </div>
      <div class="flex justify-center mt-10">
        <div class="w-7/12 p-5 border border-main-gray rounded">
          <div class="text-center mb-10">
            <el-icon color="#2AABEE" :size="100"><Promotion /></el-icon>
          </div>
          <div class="mb-4">
            <span class="font-semibold">Telegram ID: </span>
            <span>{{ getTelegramID }}</span>
          </div>
          <div>
            <span class="font-semibold">Bot ID: </span>
            <span>{{ getBotId }}</span>
          </div>
          <div class="flex justify-end mt-10">
            <router-link :to="{ name: `home` }">
              <SwdButton info main class="mr-4">Cancel</SwdButton>
            </router-link>
            <SwdButton primary main :disabled="loadingConnect" @click="connectTelegram">
              <SwdSpinner v-show="loadingConnect" class="mr-2" />
              Connect
            </SwdButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IrisLogoStandart from '@/assets/svg/iris-logo-standard.svg'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { Promotion } from '@element-plus/icons-vue'
import { connectTelegramBot } from '@/api/vueQuery/connect-telegram-bot'
import { useMutation } from 'vue-query'
import { useAlert } from '@/utils/use-alert'

export default {
  name: 'TelegramLogin',
  components: {
    Promotion,
  },

  setup() {
    const route = useRoute()
    const router = useRouter()

    const { mutateAsync: connect, isLoading: loadingConnect } = useMutation(connectTelegramBot)

    const getBotId = computed(() => {
      return route.query.bot_id
    })

    const getTelegramID = computed(() => {
      return route.query.telegram_id
    })

    const connectTelegram = async () => {
      const data = {
        bot_id: route.query.bot_id,
        telegram_id: route.query.telegram_id,
      }
      const res = await connect(data)
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Connect success',
        })
        router.push({ name: `home` })
      }
    }

    return {
      IrisLogoStandart,
      getTelegramID,
      getBotId,
      connectTelegram,
      loadingConnect,
      connect,
    }
  },
}
</script>
