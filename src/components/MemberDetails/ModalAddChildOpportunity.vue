<template>
  <el-dialog v-model="state.dialogVisible" :title="getModalTitle" width="80%" :before-close="closeDialog">
    <div v-if="!isLoadingContent" class="border-color-grey">
      <el-form
        ref="form"
        v-loading="isEditModal || isLoadingInitOpportunity || isLoadingOpportunity"
        :model="ruleForm"
        :rules="rules"
        label-position="top"
      >
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
            <el-input v-model="ruleForm.amount" placeholder="Enter amount" type="number" />
          </el-form-item>
        </div>
      </el-form>

      <div class="flex justify-end">
        <SwdButton primary main :disabled="isLoadingAddOpportunity" class="w-[100px]" @click="submitForm('ruleForm')">
          <SwdSpinner v-show="isLoadingAddOpportunity" class="mr-2" />
          Save
        </SwdButton>
      </div>
    </div>
    <el-skeleton v-else :rows="11" animated class="p-5" />
  </el-dialog>
</template>

<script>
import { reactive, ref, computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOpportunityInit } from '@/api/use-opportunity-init.js'
import { useProspectDetails } from '@/api/use-prospect-details.js'
import { useFetchChildOpportunityById } from '@/api/use-fetch-child-opportunity-by-id.js'
import { useUserProfile } from '@/api/use-user-profile.js'
import { createChildOpportunity } from '@/api/vueQuery/create-child-opportunity'
import { updateChildOpportunity } from '@/api/vueQuery/update-child-opportunity'
import { useMutation, useQueryClient } from 'vue-query'
import { useAlert } from '@/utils/use-alert'
import { rules } from '@/validationRules/opportunity.js'
import { useStore } from 'vuex'

import dayjs from 'dayjs'

export default {
  name: 'ModalAddChildOpportunity',
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const queryClient = useQueryClient()
    const isEditModal = ref(false)

    const form = ref(null)
    const id = route.params.id

    const state = reactive({
      dialogVisible: false,
    })

    const ruleForm = reactive({
      member_id: '',
      stage: '',
      close_date: '',
      type: '',
      amount: '',
      name: '',
    })

    const { mutateAsync: addOpportunity, isLoading: isLoadingAddOpportunity } = useMutation(createChildOpportunity)
    const { mutateAsync: updateOpportunity, isLoading: isLoadingUpdateOpportunity } =
      useMutation(updateChildOpportunity)
    const { isLoading: isLoadingProspectDetails, data: prospectDetails } = useProspectDetails(id)
    const { isLoading: isLoadingInitOpportunity, data: initOpportunity } = useOpportunityInit()
    const { isLoading: isLoadingUserProfile, data: userProfile } = useUserProfile(userFilter)
    const {
      isLoading: isLoadingOpportunity,
      data: childOpportunity,
      refetch: refetchOpportunity,
    } = useFetchChildOpportunityById({ enabled: false })

    const userFilter = 'last_name;first_name'

    watchEffect(async () => {
      state.dialogVisible = store.state.globalComponents.dialog.showDialog.addChildOpportunity
      if (!isLoadingProspectDetails.value) ruleForm.opportunity_owner = prospectDetails.value.name
      if (!isLoadingUserProfile.value)
        ruleForm.account_name = userProfile.value.firstName + ' ' + userProfile.value.lastName
      if (store.state.globalComponents.opportunityId) {
        isEditModal.value = true
        await refetchOpportunity.value()
        setInitValue()
      }
    })

    const closeDialog = () => {
      resetState()
      store.commit('globalComponents/setOpportunityId', null)
      store.commit('globalComponents/setShowModal', {
        destination: 'addChildOpportunity',
        value: false,
      })
    }

    const submitForm = async () => {
      form.value.validate(async (valid) => {
        if (valid) {
          let res
          if (isEditModal.value) {
            const data = {
              stage: ruleForm.stage,
              close_date: ruleForm.close_date,
              type: ruleForm.type,
              amount: ruleForm.amount.toString(),
              name: ruleForm.name,
            }
            res = await updateOpportunity({ data, id: store.state.globalComponents.opportunityId })
          } else {
            res = await addOpportunity({ ...ruleForm, member_id: id })
          }
          if (!('error' in res)) {
            useAlert({
              title: 'Success',
              type: 'success',
              message: 'Opportunity created successfully',
            })
            queryClient.invalidateQueries(['opportunityList', id])
            closeDialog()
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
      return isLoadingInitOpportunity.value || isLoadingProspectDetails.value || isLoadingUserProfile.value
    })

    const getModalTitle = computed(() => {
      if (isEditModal.value) return 'Edit child opportunity'
      return 'Add child opportunity'
    })

    const setInitValue = () => {
      ruleForm.stage = childOpportunity.value.stage
      ruleForm.close_date = childOpportunity.value.close_date
      ruleForm.type = childOpportunity.value.type
      ruleForm.amount = childOpportunity.value.amount
      ruleForm.name = childOpportunity.value.name
    }

    const resetState = () => {
      ruleForm.member_id = ''
      ruleForm.stage = ''
      ruleForm.close_date = ''
      ruleForm.type = ''
      ruleForm.amount = ''
      ruleForm.name = ''
      isEditModal.value = false
    }

    return {
      state,
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
      goPartnerSettings,
      isLoadingContent,
      isLoadingAddOpportunity,
      closeDialog,
      getModalTitle,
      isLoadingOpportunity,
      childOpportunity,
      refetchOpportunity,
      updateOpportunity,
      isLoadingUpdateOpportunity,
      isEditModal,
    }
  },
}
</script>
