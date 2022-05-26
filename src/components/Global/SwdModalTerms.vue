<template>
  <el-dialog
    v-model="dialogVisible"
    title="Terms and Conditions"
    width="80%"
    center
    :show-close="false"
    custom-class="dialog-terms"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
  >
    <div class="text-black pb-4">
      <p class="pb-2 font-semibold text-lg">Disclaimer</p>
      <p class="pb-2 text-base">The data you provided is safe with us and solely used for IRIS platform fulfillment.</p>
    </div>
    <el-scrollbar height="400px" class="text-black pr-3">
      <p class="pb-2 font-semibold text-base pt-4">Terms and Conditions</p>
      <p class="pb-2">We use your personal information collected via our application and forms for</p>
      <ol>
        <li class="pb-2">
          1. Facilitating account creation and logon process- If you choose to link your account with us we used the
          information you provided us to facilitate and manage your account creation and logon process
        </li>
        <li class="pb-2">2. Requesting Feedback- We may use your information to request feedback and to contact you</li>
        <li class="pb-2">
          3. Managing user's Account-We may use your information for the purpose of managing your account and keeping it
          in working order.
        </li>
        <li class="pb-2">
          4. Sending administrative information to you-We may use your personal information to send our product ,Service
          and new feature information or information about changes to our terms,conditions and policies.
        </li>
        <li class="pb-2">
          5. Protecting our services- We may use your information as a part of our efforts to keep our services secure
          and safe ( For example-for Fraud monitoring and prevention).
        </li>
        <li class="pb-2">
          6. Enforcing our terms ,conditions and policies for business purposes, to comply with legal and regulatory
          requirements or in connection with our contract.
        </li>
        <li class="pb-2">
          7. Responding to legal requests and prevent harm- If receive a subpoena or legal request ,We may need to
          inspect the data we hold to determine how to respond.
        </li>
        <li class="pb-2">
          8. Delivering and facilitating delivery of services to the user- We may use your information to provide you
          with the requested services.
        </li>
        <li class="pb-2">
          9. Responding to user inquiries- We may use your information to respond to your inquiries and solve any
          potential issue user might have with the use of our services.
        </li>
        <li class="pb-2">10. Keeping your account updated.</li>
      </ol>
    </el-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <el-button plain type="danger" :loading="fetching" class="w-[90px]" @click="handleDecline">Cancel</el-button>
        <el-button plain type="primary" :loading="isLoadingUpdate" class="w-[90px]" @click="handleAccept">
          I Agree
        </el-button>
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

export default defineComponent({
  name: 'SwdModalTerms',
  setup() {
    const store = useStore()

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
</style>
