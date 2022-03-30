<template>
  <SwdSubHeader title="Final Information" class="p-5" />
  <div v-if="!isFetchingMember" class="p-5">
    <el-form ref="form" :model="ruleForm" label-position="top">
      <el-card class="mb-4 w-full">
        <div>
          <div class="mb-5 text-main font-semibold">General Info</div>
          <div class="sm:flex sm:flex-wrap lg:flex-row text-sm mb-4">
            <!-- CLIENT -->
            <div class="flex text-main mb-2 sm:w-6/12 xl:w-5/12">
              <div class="pr-2 text-gray-500">Name:</div>
              <div class="text-main">{{ member.name }}</div>
            </div>
            <div class="flex text-main mb-2 sm:w-6/12 xl:w-4/12">
              <div class="pr-2 text-gray-500">E-mail:</div>
              <div class="text-main">{{ member.email }}</div>
            </div>
            <div class="flex text-main mb-2 sm:w-6/12 xl:w-3/12">
              <span class="text-gray-500 pr-2">Age:</span>
              <span class="">{{ member.age }}</span>
            </div>
            <!-- SPOUSE -->
            <template v-if="member.married">
              <div class="flex text-main mb-2 sm:w-6/12 xl:w-5/12">
                <div class="pr-2 text-gray-500">Spouse Name:</div>
                <div class="text-main">Yarmachok</div>
              </div>
              <div class="flex text-main mb-2 sm:w-6/12 xl:w-4/12">
                <div class="pr-2 text-gray-500">Spouse e-mail:</div>
                <div class="text-main">ydimas@gmail.com</div>
              </div>
              <div class="flex text-main mb-2 sm:w-6/12 xl:w-3/12">
                <span class="text-gray-500 pr-2">Spouse Age:</span>
                <span class="">33</span>
              </div>
            </template>

            <!-- ADDRESS -->
            <div class="flex text-main mb-2 sm:w-6/12 xl:w-5/12">
              <div class="pr-2 text-gray-500">Addres:</div>
              <div class="text-main">Ukraine</div>
            </div>
            <div class="flex text-main mb-2 sm:w-6/12 xl:w-4/12">
              <div class="pr-2 text-gray-500">City</div>
              <div class="text-main">Zaporizhzhya</div>
            </div>
            <div class="flex text-main mb-2 sm:w-6/12 xl:w-3/12">
              <span class="text-gray-500 pr-2">State</span>
              <span class="">Zaporizhzhya</span>
            </div>
            <div class="flex text-main mb-2 sm:w-6/12 xl:w-5/12">
              <span class="text-gray-500 pr-2">Zip</span>
              <span class="">000000</span>
            </div>

            <!-- RETIRED -->
            <div class="flex text-main mb-2 sm:w-6/12 xl:w-4/12">
              <div class="pr-2 text-gray-500">Retired:</div>
              <div class="text-main">
                <SwdRetiredLabel :retired="member.retired" />
              </div>
            </div>
            <div v-if="member.married" class="flex text-main mb-2 sm:w-6/12 xl:w-3/12">
              <div class="pr-2 text-gray-500">Spouse retired</div>
              <div class="text-main">
                <SwdRetiredLabel :retired="member.spouse.retired" />
              </div>
            </div>
          </div>

          <el-form-item label="Have you watched us during the newson WTTV4 CBS or Fox59" class="mb-4">
            <el-radio-group v-model="ruleForm.wttv">
              <el-radio :label="true">Yes</el-radio>
              <el-radio :label="false">No</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="I have saved the following amount for retirement" class="mb-4">
            <el-radio-group v-model="ruleForm.amount_retirement">
              <el-radio label="150k">$150,000 - $250,000</el-radio>
              <el-radio label="250k">$250,000 - $500,000</el-radio>
              <el-radio label="500k">$500,000 - $1,000,000</el-radio>
              <el-radio label="1kk">$1,000,000+</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </el-card>

      <el-card class="mb-4 w-full">
        <el-form-item class="mb-2">
          <el-radio-group v-model="ruleForm.consultation" class="flex flex-col items-start">
            <el-radio label="yes_book">Yes, I want a Free Consultation & Copy of Matt`s Book </el-radio>
            <el-radio label="yes">Yes, I want a Free Consultation </el-radio>
            <el-radio label="no">No, I want a Free Consultation </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="My Biggest Financial Concern Is:" class="mb-4">
          <el-input v-model="ruleForm.biggest_financial" type="textarea" />
        </el-form-item>
        <el-form-item label="I Currently Have:">
          <el-checkbox label="CDs" class="w-full sm:w-4/12 lg:w-3/12 mr-0" @change="changeCurrently()" />
          <el-checkbox
            label="Bounds or Bound Funds"
            class="w-full sm:w-4/12 lg:w-3/12 mr-0"
            @change="changeCurrently()"
          />
          <el-checkbox
            label="IRA/TSA/401(k)/403(b)"
            class="w-full sm:w-4/12 lg:w-3/12 mr-0"
            @change="changeCurrently()"
          />
          <el-checkbox label="An Annuity" class="w-full sm:w-4/12 lg:w-3/12 mr-0" @change="changeCurrently()" />
          <el-checkbox label="A Variable Annuity" class="w-full sm:w-4/12 lg:w-3/12 mr-0" @change="changeCurrently()" />
          <el-checkbox
            label="Long Term Core Insurance"
            class="w-full sm:w-4/12 lg:w-3/12 mr-0"
            @change="changeCurrently()"
          />
          <el-checkbox label="Life Insurance" class="w-full sm:w-4/12 lg:w-3/12 mr-0" @change="changeCurrently()" />
          <el-checkbox
            label="Mutual Funds or Stocks"
            class="w-full sm:w-4/12 lg:w-3/12 mr-0"
            @change="changeCurrently()"
          />
          <el-checkbox label="Dormant Accounts" class="w-full sm:w-4/12 lg:w-3/12 mr-0" @change="changeCurrently()" />
        </el-form-item>
      </el-card>

      <div class="flex justify-end my-10">
        <div class="pr-3">
          <Button default-gray-btn text-btn="Back" @click="backStep" />
        </div>
        <el-button type="primary" @click="nextStep">Save</el-button>
      </div>
    </el-form>

    <!-- <div>
      {{ member }}
    </div> -->
  </div>
  <el-skeleton v-else :rows="10" animated />
</template>

<script>
import { useFetchMember } from '@/api/use-fetch-member.js'
import { updateStepsClients } from '@/api/vueQuery/clients/fetch-update-steps-clients'

import { useMutation } from 'vue-query'

import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { reactive, ref, computed } from 'vue'

import { useAlert } from '@/utils/use-alert'

export default {
  name: 'FinalInformation',
  setup() {
    const route = useRoute()
    const store = useStore()
    const router = useRouter()
    const form = ref(null)

    const {
      isFetching: isFetchingMember,
      data: member,
      refetch: refetchMember,
    } = useFetchMember({ id: route.params.id })

    const { mutateAsync: updateSteps } = useMutation(updateStepsClients)

    const ruleForm = reactive({
      wttv: true,
      amount_retirement: '150k',
      consultation: 'yes_book',
      biggest_financial: '',
    })

    const step = computed(() => store.state.newClient.step)

    const changeCurrently = () => {
      console.log('changeCurrently')
    }

    const backStep = () => {
      store.commit('newClient/setStep', step.value - 1)
      router.push({ name: 'client-expense-information', params: { id: route.params.id } })
    }

    const nextStep = async () => {
      const res = await updateSteps({ completed_financial_fact_finder: 'completed' })
      if (!('error' in res)) {
        useAlert({
          title: 'Success',
          type: 'success',
          message: 'Information update successfully',
        })

        router.push({
          name: 'client-dashboard',
          params: { id: route.params.id },
        })
      }
    }

    return {
      ruleForm,
      form,
      isFetchingMember,
      member,
      refetchMember,
      changeCurrently,
      backStep,
      nextStep,
    }
  },
}
</script>
