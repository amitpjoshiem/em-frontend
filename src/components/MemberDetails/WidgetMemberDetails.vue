<template>
  <div class="bg-widget-bg rounded-lg p-5">
    <div class="border-b pb-5 flex justify-between">
      <div class="flex">
        <SwdAvatar :link="user.avatar.url" />
        <div class="flex flex-col ml-2">
          <router-link
            :to="{
              name: 'member-basic-information',
              params: { id: memberId },
            }"
            class="text-sm text-main font-medium"
          >
            {{ user.name }}
          </router-link>
          <span class="text-small text-activity-item font-medium uppercase">
            {{ getUserType }}
          </span>
        </div>
      </div>
      <SwdMemberActions :user="user" />
    </div>

    <div class="flex justify-between py-3">
      <div class="flex items-center">
        <span class="w-6 h-6 rounded-md flex justify-center items-center bg-color-error">
          <InlineSvg :src="IconProspectAge" />
        </span>
        <span class="ml-2 text-xs text-gray03">Age</span>
      </div>
      <div class="text-sm">
        <span class="text-main pr-2">{{ user.age }}</span>
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

    <div v-if="user.type === 'prospect'" class="flex justify-between pt-5">
      <Button small-btn-activity text-semi-bold text-btn="Convert to client" @click="convert" />

      <router-link :to="{ name: 'blueprint-report', params: { id: user.id } }" class="pl-2.5 font-medium">
        <Button small-btn-gray text-semi-bold text-btn="Blueprint report" />
      </router-link>
    </div>
    <div v-else class="flex justify-end pt-5">
      <router-link :to="{ name: 'clientreport', params: { id: user.id } }" class="pl-2.5 font-medium">
        <Button small-btn-gray text-semi-bold text-btn="Client report" />
      </router-link>
    </div>
  </div>
</template>

<script>
import IconProspectAge from '@/assets/svg/prospect-age.svg'
import IconTotal from '@/assets/svg/icon-total.svg'
import IconGoal from '@/assets/svg/icon-goal.svg'
import { useRoute } from 'vue-router'
import { convertToClient } from '@/api/vueQuery/convert-to-client'
import { useMutation } from 'vue-query'
import { useAlert } from '@/utils/use-alert'
import { computed, reactive, watchEffect } from 'vue'
import { updateMembers } from '@/api/vueQuery/update-members'

export default {
  name: 'WidgetMemberDetails',
  props: {
    user: {
      type: Object,
      require: true,
      default: () => {},
    },
    isLoadingProspectDetails: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  emits: ['updateMemberInfo'],
  setup(props, { emit }) {
    const route = useRoute()
    const memberId = route.params.id

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
      if (props.isLoadingProspectDetails === false) {
        ruleForm.total_net_worth = props.user.total_net_worth
        ruleForm.goal = props.user.goal
      }
    })

    const convert = async () => {
      const res = await convertToClient(memberId)
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Convert successfully',
        })
        emit('updateMemberInfo')
      } else {
        useAlert({
          title: 'Error',
          type: 'error',
          message: res.error.message,
        })
      }
    }

    const getUserType = computed(() => {
      if (props.user.type === 'prospect') return 'Opportunity'
      return props.user.type
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
    }
  },
}
</script>
