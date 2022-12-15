<template>
  <div class="bg-main-gray rounded-lg p-4 h-[295px]">
    <el-skeleton v-if="isLoadingProspectDetails" :rows="5" animated />
    <SwdErrorBlock v-else-if="isErrorProspectDetails" />
    <template v-else-if="member">
      <div class="flex pb-3">
        <div class="w-2/12 flex items-center">
          <SwdAvatar :link="member.avatar.url" />
        </div>
        <div class="w-10/12">
          <div>
            <span class="text-sm text-main font-medium">
              {{ member.name }}
            </span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-small text-activity-item font-medium uppercase">
              {{ getUserType }}
            </span>
            <div class="flex items-center">
              <div class="action-btn">
                <router-link
                  :to="{
                    name: `${route.meta.type}/opportunity-contact`,
                    params: { id: member.id },
                  }"
                >
                  <el-icon class="mt-[7px]" color="#042D52"><Cellphone /></el-icon>
                </router-link>
              </div>
              <div class="action-btn">
                <router-link
                  :to="{
                    name: `${route.meta.type}/basic-information`,
                    params: { id: member.id },
                  }"
                >
                  <el-icon class="mt-[7px]" color="#042D52">
                    <User />
                  </el-icon>
                </router-link>
              </div>
              <SwdMemberActions :user="member" page-details />
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-between pt-2 border-t border-white">
        <div class="flex items-center">
          <span class="w-6 h-6 rounded-md flex justify-center items-center bg-main-orange">
            <el-icon color="white"><House /></el-icon>
          </span>
          <span class="ml-2 text-xs text-main">Location</span>
        </div>
        <div class="text-xs flex items-center">
          <span class="text-main pr-2">{{ member.city }}/{{ member.state }}</span>
        </div>
      </div>

      <div class="flex justify-between pt-2 pb-2">
        <div class="flex items-center">
          <span class="w-6 h-6 rounded-md flex justify-center items-center bg-main-orange">
            <InlineSvg :src="IconProspectAge" />
          </span>
          <span class="ml-2 text-xs text-main">Age</span>
        </div>
        <div class="text-sm">
          <span class="text-main pr-2">{{ member.age }}</span>
        </div>
      </div>

      <el-form ref="form" :model="ruleForm" size="small">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <span class="w-6 h-6 rounded-md flex justify-center items-center bg-main-orange">
              <InlineSvg :src="IconTotal" />
            </span>
            <span class="ml-2 text-xs text-main">Total net worth:</span>
          </div>
          <el-form-item class="w-5/12">
            <SwdCurrencyInput
              v-model="ruleForm.total_net_worth"
              :options="optionsCurrencyInput"
              prepend
              :disabled="isDisabledInput"
              placeholder="$12345"
              size="small"
              @blur="change()"
            />
          </el-form-item>
        </div>

        <div class="flex justify-between pt-2">
          <div class="flex items-center">
            <span class="w-6 h-6 rounded-md flex justify-center items-center bg-main-orange">
              <InlineSvg :src="IconGoal" />
            </span>
            <span class="ml-2 text-xs text-main">Goal:</span>
          </div>
          <el-form-item class="w-5/12">
            <SwdCurrencyInput
              v-model="ruleForm.goal"
              :options="optionsCurrencyInput"
              prepend
              :disabled="isDisabledInput"
              placeholder="$12345"
              size="small"
              @blur="change()"
            />
          </el-form-item>
        </div>
      </el-form>

      <div class="flex justify-between pt-3">
        <div class="flex items-center">
          <span class="pr-2 text-xs text-primary font-semibold">Advisor</span>
        </div>
        <div class="text-sm">
          <el-tag class="ml-2 cursor-pointer" @click="moreInfoOwner">
            {{ owner.value.last_name + ' ' + owner.value.first_name }}
            <el-icon>
              <InfoFilled color="#66B6FF" />
            </el-icon>
          </el-tag>
        </div>
      </div>

      <div v-if="member.type === 'prospect'" class="flex justify-between pt-3">
        <SwdButton v-if="!$can('client', 'all') && !$can('support', 'all')" primary small class="mr-2" @click="convert">
          Convert to client
        </SwdButton>

        <router-link :to="{ name: `${route.meta.type}/blueprint-report`, params: { id: member.id } }">
          <SwdButton primary small class="mr-2">Blueprint report</SwdButton>
        </router-link>
      </div>
      <div v-else class="flex justify-end py-3">
        <router-link
          :to="{ name: `${route.meta.type}/client-reports-list`, params: { id: member.id } }"
          class="font-medium"
        >
          <SwdButton primary small>Client report</SwdButton>
        </router-link>
      </div>
    </template>
    <ModalMemberDetailsOwner :owner="owner" />
  </div>
</template>

<script>
import IconProspectAge from '@/assets/svg/prospect-age.svg'
import IconTotal from '@/assets/svg/icon-total.svg'
import IconGoal from '@/assets/svg/icon-goal.svg'
import { computed, reactive, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useMutation } from 'vue-query'
import { useAlert } from '@/utils/use-alert'
import { updateMembers } from '@/api/vueQuery/update-members'
import { useProspectDetails } from '@/api/use-prospect-details.js'
import { convertToClient } from '@/api/vueQuery/convert-to-client'
import { ElMessageBox } from 'element-plus'
import { User, Cellphone, House } from '@element-plus/icons-vue'
import { InfoFilled } from '@element-plus/icons-vue'
import ModalMemberDetailsOwner from './ModalMemberDetailsOwner.vue'
import { useStore } from 'vuex'

export default {
  name: 'WidgetMemberDetails',
  components: {
    User,
    Cellphone,
    InfoFilled,
    ModalMemberDetailsOwner,
    House,
  },
  setup() {
    const route = useRoute()
    const memberId = route.params.id
    const store = useStore()

    const {
      isLoading: isLoadingProspectDetails,
      isError: isErrorProspectDetails,
      data: member,
      updateMemberInfo,
      owner,
    } = useProspectDetails()

    const { isLoading: isLoadingUpdate, mutateAsync: updateMember } = useMutation(updateMembers)

    const { isLoading, isFetching, data, error, mutateAsync: convertClient } = useMutation(convertToClient)

    const optionsCurrencyInput = {
      currency: 'USD',
      locale: 'en-US',
      currencyDisplay: 'hidden',
      precision: 2,
    }

    const ruleForm = reactive({
      total_net_worth: '',
      goal: '',
    })

    watchEffect(() => {
      if (isLoadingProspectDetails.value === false && !isErrorProspectDetails.value) {
        ruleForm.total_net_worth = member.value.total_net_worth
        ruleForm.goal = member.value.goal
      }
    })

    const convert = async () => {
      ElMessageBox.confirm('Are you sure to convert this opportunity to client?', 'Info', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'info',
      })
        .then(async () => {
          const res = await convertToClient(memberId)
          if (!('error' in res)) {
            useAlert({
              title: 'Success',
              type: 'success',
              message: 'Convert successfully',
            })
            updateMemberInfo()
          } else {
            useAlert({
              title: 'Error',
              type: 'error',
              message: res.error.message,
            })
          }
        })
        .catch(() => {})
    }

    const getUserType = computed(() => {
      if (member.value.type === 'prospect') return 'Opportunity'
      return member.value.type
    })

    const change = async () => {
      const res = await updateMember({ form: ruleForm, id: memberId })

      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Opportunity update successfully',
        })
      }
    }

    const moreInfoOwner = () => {
      store.commit('globalComponents/setShowModal', {
        destination: 'moreOwnerInfo',
        value: true,
      })
    }

    const isDisabledInput = computed(() => {
      return isLoadingUpdate.value || route.meta.type === 'support' || route.meta.type === 'client'
    })

    return {
      IconProspectAge,
      IconTotal,
      IconGoal,
      convert,
      memberId,
      convertClient,
      isLoading,
      isFetching,
      data,
      error,
      getUserType,
      ruleForm,
      change,
      optionsCurrencyInput,
      isLoadingProspectDetails,
      isErrorProspectDetails,
      member,
      updateMemberInfo,
      owner,
      moreInfoOwner,
      route,
      isDisabledInput,
    }
  },
}
</script>

<style>
.action-btn {
  @apply flex justify-center items-center w-7 h-7 cursor-pointer bg-white border border-primary rounded mr-3;
}
</style>
