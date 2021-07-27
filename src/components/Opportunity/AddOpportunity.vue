<template>
  <div class="p-5">
    <SubHeader
      title="New opportunity"
      back-page="prospect-details"
      back-page-title="Prospect details"
    />
    <div
      v-if="
        !isLoadingStage && !isLoadingProspectDetails && !isLoadingUserProfile
      "
      class="border-color-grey px-10 pb-7"
    >
      <SchemaFormWithValidation
        :schema="schema"
        schema-row-classes="pt-3"
        @submit="saveStep"
      >
        <template #afterForm>
          <div class="pt-12 text-right">
            <Button default-blue-btn text-btn="Save" type="submit" />
          </div>
        </template>
      </SchemaFormWithValidation>
    </div>
    <el-skeleton v-else :rows="11" animated class="p-5" />
  </div>
</template>

<script>
import { SchemaFormFactory, useSchemaForm } from 'formvuelate'
import VeeValidatePlugin from '@formvuelate/plugin-vee-validate'
import Input from '@/components/Global/Input/Input.vue'
import Label from '@/components/Global/Label.vue'
import TextArea from '@/components/Global/TextArea.vue'
import SwdSelect from '@/components/Global/Form/SwdSelect.vue'
import { schemaOpportunity } from '@/components/Opportunity/schema/newOpportunity'
import { ref, markRaw, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStageOpportunity } from '@/api/use-stage-opportunity.js'
import { useProspectDetails } from '@/api/use-prospect-details.js'
import { useUserProfile } from '@/api/use-user-profile.js'
import { createOpportunity } from '@/api/vueQuery/create-opportunity'
import { useMutation } from 'vue-query'
import { ElNotification } from 'element-plus'

markRaw(Input)
markRaw(Label)
markRaw(TextArea)
markRaw(SwdSelect)

const SchemaFormWithValidation = SchemaFormFactory([VeeValidatePlugin()])

export default {
  name: 'AddOpportunity',
  components: { SchemaFormWithValidation },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const schema = ref(schemaOpportunity)
    const formData = ref({ opportunity_owner: '' })
    const id = route.params.id

    useSchemaForm(formData)

    const saveStep = async () => {
      addOpportunity({
        ...formData.value,
        member_id: id,
        stage_name: 'Prospecting',
      })
        .then(() => {
          ElNotification.success({
            title: 'Success',
            message: 'Prospect created successfully',
            type: 'success',
          })
          router.push({ name: 'prospect-details', params: { id } })
        })
        .catch((error) => {
          ElNotification.error({
            title: 'Error',
            message: error.message,
            offset: 100,
          })
        })
    }

    const {
      mutateAsync: addOpportunity,
      isError,
      error,
    } = useMutation(createOpportunity)

    const {
      isLoading: isLoadingProspectDetails,
      isError: isErrorProspectDetails,
      data: prospectDetails,
    } = useProspectDetails(id)

    const {
      isLoading: isLoadingStage,
      isErrorLoadingStage,
      data: stageSelect,
    } = useStageOpportunity()

    const {
      isLoading: isLoadingUserProfile,
      isError: isErrorUserProfile,
      data: userProfile,
    } = useUserProfile()

    watch(isLoadingStage, (newV, oldV) => {
      if (newV === false && oldV === true) {
        const stageList = stageSelect.value.data.stage_list.map((item) => {
          return {
            title: item,
            command: item,
          }
        })
        schema.value[0][1].options = stageList
      }
    })

    watch(
      prospectDetails,
      (newV) => {
        if (newV) {
          schema.value[1][1].value = newV.firstName + ' ' + newV.lastName
          formData.value.opportunity_owner =
            newV.firstName + ' ' + newV.lastName
        }
      },
      { immediate: true }
    )

    watch(
      userProfile,
      (newV) => {
        if (newV) {
          schema.value[0][0].value = newV.firstName + ' ' + newV.lastName
        }
      },
      { immediate: true }
    )

    return {
      schema,
      saveStep,
      isLoadingStage,
      isError,
      isErrorProspectDetails,
      stageSelect,
      prospectDetails,
      isLoadingProspectDetails,
      isLoadingUserProfile,
      isErrorUserProfile,
      userProfile,
      isErrorLoadingStage,
      error,
    }
  },
}
</script>
