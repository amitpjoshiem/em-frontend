<template>
  <div class="bg-widget-bg rounded-lg p-5 h-[269px]">
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
                    name: 'opportunity-contact',
                    params: { id: member.id },
                  }"
                >
                  <el-icon class="mt-[7px]" color="#042D52"><Cellphone /></el-icon>
                </router-link>
              </div>
              <div class="action-btn">
                <router-link
                  :to="{
                    name: 'member-basic-information',
                    params: { id: member.id },
                  }"
                >
                  <el-icon class="mt-[7px]" color="#042D52"><User /></el-icon>
                </router-link>
              </div>
              <SwdMemberActions :user="member" page-details />
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-between pb-3 pt-3 border-t border-input-border">
        <div class="flex items-center">
          <span class="w-6 h-6 rounded-md flex justify-center items-center bg-color-error">
            <InlineSvg :src="IconProspectAge" />
          </span>
          <span class="ml-2 text-xs text-gray03">Age</span>
        </div>
        <div class="text-sm">
          <span class="text-main pr-2">{{ member.age }}</span>
        </div>
      </div>

      <el-form ref="form" :model="ruleForm" size="small">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <span class="w-6 h-6 rounded-md flex justify-center items-center bg-color-error">
              <InlineSvg :src="IconTotal" />
            </span>
            <span class="ml-2 text-xs text-gray03">Total net worth:</span>
          </div>
          <el-form-item class="w-5/12">
            <SwdCurrencyInput
              v-model="ruleForm.total_net_worth"
              :options="optionsCurrencyInput"
              prepend
              :disabled="isLoadingUpdate"
              placeholder="$12345"
              size="small"
              @blur="change()"
            />
          </el-form-item>
        </div>

        <div class="flex justify-between pt-3">
          <div class="flex items-center">
            <span class="w-6 h-6 rounded-md flex justify-center items-center bg-color-error">
              <InlineSvg :src="IconGoal" />
            </span>
            <span class="ml-2 text-xs text-gray03">Goal:</span>
          </div>
          <el-form-item class="w-5/12">
            <SwdCurrencyInput
              v-model="ruleForm.goal"
              :options="optionsCurrencyInput"
              prepend
              :disabled="isLoadingUpdate"
              placeholder="$12345"
              size="small"
              @blur="change()"
            />
          </el-form-item>
        </div>
      </el-form>

      <div v-if="member.type === 'prospect'" class="flex justify-between pt-5">
        <Button small-btn-activity text-semi-bold text-btn="Convert to client" @click="convert" />

        <router-link :to="{ name: 'blueprint-report', params: { id: member.id } }" class="pl-2.5 font-medium">
          <Button small-btn-gray text-semi-bold text-btn="Blueprint report" />
        </router-link>
      </div>
      <div v-else class="flex justify-end pt-5">
        <router-link :to="{ name: 'clientreport', params: { id: member.id } }" class="pl-2.5 font-medium">
          <Button small-btn-gray text-semi-bold text-btn="Client report" />
        </router-link>
      </div>
    </template>
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
import { User, Cellphone } from '@element-plus/icons-vue'

export default {
  name: 'WidgetMemberDetails',
  components: {
    User,
    Cellphone,
  },
  setup() {
    const route = useRoute()
    const memberId = route.params.id

    const {
      isLoading: isLoadingProspectDetails,
      isError: isErrorProspectDetails,
      data: member,
      updateMemberInfo,
      other,
    } = useProspectDetails()

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

    const { isLoading: isLoadingUpdate, mutateAsync: updateMember } = useMutation(updateMembers)

    const { isLoading, isFetching, data, error, mutateAsync: convertClient } = useMutation(convertToClient)

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
      isLoadingUpdate,

      isLoadingProspectDetails,
      isErrorProspectDetails,
      member,
      updateMemberInfo,
      other,
    }
  },
}
</script>

<style>
.action-btn {
  @apply flex justify-center items-center w-7 h-7 cursor-pointer bg-white border border-primary rounded mr-3;
}
</style>
