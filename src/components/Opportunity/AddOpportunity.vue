<template>
  <SwdSubHeader title="New child opportunities" class="p-5" />
  <div v-if="!isLoadingContent" class="p-5">
    <div v-if="statusSfAcc.auth" class="border-color-grey px-10 pb-7">
      <el-form ref="form" :model="ruleForm" :rules="rules" label-position="top">
        <div class="flex mb-5">
          <el-form-item label="Opportunity owner" prop="opportunity_owner" class="w-6/12 pr-5">
            <el-input v-model="ruleForm.opportunity_owner" placeholder="Enter prospect’s name" :disabled="true" />
          </el-form-item>
          <el-form-item label="Stage" prop="stage" class="w-6/12 pr-3">
            <el-select v-model="ruleForm.stage" placeholder="Stage" class="w-full">
              <el-option v-for="item in initOpportunity.data.init.stage_list" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="close_date" label="Close date" class="w-3/12">
            <el-date-picker
              v-model="ruleForm.close_date"
              type="date"
              :placeholder="getPlaceholder"
              format="MM/DD/YYYY"
              value-format="MM/DD/YYYY"
            />
          </el-form-item>
        </div>
        <div class="flex mb-5">
          <el-form-item label="Opportunity name" prop="name" class="w-6/12 pr-2.5">
            <el-input v-model="ruleForm.name" placeholder="Enter opportunity name" />
          </el-form-item>
          <el-form-item label="Account name" prop="account_name" class="w-6/12 pl-2.5">
            <el-input v-model="ruleForm.account_name" placeholder="Enter account name" :disabled="true" />
          </el-form-item>
        </div>

        <div class="flex mb-5">
          <el-form-item label="Type" prop="type" class="w-6/12 pr-2.5">
            <el-select v-model="ruleForm.type" placeholder="Type" class="w-full">
              <el-option v-for="item in initOpportunity.data.init.type_list" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Amount" prop="amount" class="w-6/12 pl-2.5">
            <el-input v-model="ruleForm.amount" placeholder="Enter amount" />
          </el-form-item>
        </div>
      </el-form>

      <div class="flex justify-end my-10">
        <el-button
          type="primary"
          plain
          :loading="isLoadingAddOpportunity"
          :disabled="isLoadingAddOpportunity"
          class="w-[85px]"
          @click="submitForm('ruleForm')"
        >
          Save
        </el-button>
      </div>
    </div>
    <div v-else class="flex flex-col text-main text-xs justify-center items-center">
      <span>Your SalesForce account isn’t authorized.</span>
      <span class="py-5">
        Please check your Partners Settings Make Partner Settings clickable link to the Partner screen
      </span>
      <el-button type="primary" plain class="w-[150px]" size="small" @click="goPartnerSettings">
        Partner Settings
      </el-button>
    </div>
  </div>
  <el-skeleton v-else :rows="11" animated class="p-5" />
</template>

<script>
import { reactive, ref, computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOpportunityInit } from '@/api/use-opportunity-init.js'
import { useProspectDetails } from '@/api/use-prospect-details.js'
import { useSalesForceAuth } from '@/api/use-sales-force-auth.js'
import { useUserProfile } from '@/api/use-user-profile.js'
import { createChildOpportunity } from '@/api/vueQuery/create-child-opportunity'
import { useMutation } from 'vue-query'
import { useAlert } from '@/utils/use-alert'
import { rules } from '@/validationRules/opportunity.js'
import dayjs from 'dayjs'

export default {
  name: 'AddOpportunity',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const form = ref(null)
    const id = route.params.id

    const ruleForm = reactive({
      member_id: '',
      stage: '',
      close_date: '',
      type: '',
      amount: '',
    })

    const userFilter = 'last_name;first_name'

    const { mutateAsync: addOpportunity, isLoadingAddOpportunity } = useMutation(createChildOpportunity)
    const { isLoading: isLoadingProspectDetails, data: prospectDetails } = useProspectDetails(id)
    const { isLoading: isLoadingInitOpportunity, data: initOpportunity } = useOpportunityInit()
    const { isLoading: isLoadingUserProfile, data: userProfile } = useUserProfile(userFilter)
    const { isLoading: isLoadingStatusSfAcc, data: statusSfAcc } = useSalesForceAuth()

    watchEffect(() => {
      if (!isLoadingProspectDetails.value) ruleForm.opportunity_owner = prospectDetails.value.name
      if (!isLoadingUserProfile.value)
        ruleForm.account_name = userProfile.value.firstName + ' ' + userProfile.value.lastName
    })

    const submitForm = async () => {
      form.value.validate(async (valid) => {
        if (valid) {
          const res = await addOpportunity({ ...ruleForm, member_id: id })
          if (!('error' in res)) {
            useAlert({
              title: 'Success',
              type: 'success',
              message: 'Opportunity created successfully',
            })
            router.push({ name: 'member-details', params: { id } })
          }
        } else {
          return false
        }
      })
    }

    const getPlaceholder = computed(() => {
      return dayjs(new Date()).format('MM/DD/YYYY')
    })

    const goPartnerSettings = () => {
      router.push({ name: 'partners' })
    }

    const isLoadingContent = computed(() => {
      return (
        isLoadingStatusSfAcc.value ||
        isLoadingInitOpportunity.value ||
        isLoadingProspectDetails.value ||
        isLoadingUserProfile.value
      )
    })

    return {
      prospectDetails,
      isLoadingProspectDetails,
      isLoadingUserProfile,
      isLoadingInitOpportunity,
      initOpportunity,
      ruleForm,
      submitForm,
      form,
      rules,
      getPlaceholder,
      isLoadingStatusSfAcc,
      statusSfAcc,
      goPartnerSettings,
      isLoadingContent,
      isLoadingAddOpportunity,
    }
  },
}
</script>
