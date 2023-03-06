<template>
  <el-dialog
    v-model="dialogVisible"
    title="Terms and Conditions"
    width="80%"
    center
    :show-close="false"
    class="dialog-terms"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
  >
    <div class="text-main pb-4">
      <p class="pb-2 font-semibold text-lg">Disclaimer</p>
      <p class="pb-2 text-base">The data you provide is safe and used solely for IRIS platform fulfillment.</p>
    </div>
    <el-scrollbar height="400px" class="text-main pr-3">
      <p class="pb-2 font-semibold text-base pt-4">Terms and Conditions</p>
      <p class="term-item">We use your personal information collected via our application and forms for:</p>
      <p class="term-item">1. Facilitating your account creation and the logon process.</p>
      <p class="term-item">2. Requesting Feedback: We may use your information to contact you and request feedback.</p>
      <p class="term-item">
        3. Managing user’s account: We may use your information for the purpose of managing your account and keeping it
        in working order.
      </p>
      <p class="term-item">
        4. Sending administrative information: We may use your personal information to send details on products and
        services we offer, or to inform you of changes to our terms, conditions, and policies.
      </p>
      <p class="term-item">
        5. Protecting our services: We may use your information as part of our ongoing efforts to keep our services safe
        and secure through fraud monitoring and prevention.
      </p>
      <p class="term-item">
        6. Enforcement of our terms, conditions, and policies regarding legal and regulatory requirements in connection
        with this contract.
      </p>
      <p class="term-item">
        7. Responding to legal requests and to prevent potential harm: If we receive a subpoena or legal request, we may
        be required to inspect data to determine an appropriate response.
      </p>
      <p class="term-item">
        8. Delivery of services or user inquiries: We may use your information to respond to your inquiries or solve
        potential issues users may have with our services.
      </p>
      <p class="term-item">9. Keeping your account updated.</p>
    </el-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <div class="flex justify-center">
          <div class="pr-3">
            <Button default-gray-btn text-btn="Cancel" @click="handleDecline" />
          </div>
          <SwdButton primary main :disabled="isLoadingUpdate" class="w-2/12" @click="handleAccept">
            <SwdSpinner v-show="isLoadingUpdate" class="mr-2" />
            I Agree
          </SwdButton>
        </div>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, ref, watchEffect } from 'vue'
import { useLogout } from '@/api/authentication/use-logout'
import { updateClients } from '@/api/vueQuery/clients/update-clients'
import { useMutation } from 'vue-query'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'SwdModalTerms',
  setup() {
    const store = useStore()
    const router = useRouter()

    const { isLoading: isLoadingUpdate, mutateAsync: update } = useMutation(updateClients)

    const dialogVisible = ref(false)

    const { fetching, logout } = useLogout()

    watchEffect(() => {
      dialogVisible.value = store.state.globalComponents.termsAndConditions === false
    })

    const handleDecline = () => {
      logout()
    }

    const handleAccept = async () => {
      const res = await update({ terms_and_conditions: true })
      if (!('error' in res)) {
        store.commit('globalComponents/setTermsAndConditions', true)
        store.commit('globalComponents/setIsLoadingApp', false)
        if (store.state.globalComponents.role === 'lead') {
          router.push({ name: 'lead/dashboard' })
        }

        if (store.state.globalComponents.role === 'client') {
          router.push({ name: `client/member-details`, params: { id: store.state.globalComponents.clientId } })
        }
      }
    }

    return {
      dialogVisible,
      handleDecline,
      fetching,
      handleAccept,
      update,
      isLoadingUpdate,
    }
  },
})
</script>

<style>
.dialog-terms {
  border-radius: 0;
}
.term-item {
  padding-bottom: 10px;
  word-break: break-word;
}
</style>
