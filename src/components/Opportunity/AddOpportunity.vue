<template>
  <div class="p-5">
    <SubHeader title="New opportunity" back-page="member-details" />
    <div
      v-if="
        !isLoadingInitOpportunity &&
        !isLoadingProspectDetails &&
        !isLoadingUserProfile
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
import SwdSelectForm from '@/components/Global/Form/SwdSelectForm.vue'
import { schemaOpportunity } from '@/components/Opportunity/schema/newOpportunity'
import { ref, markRaw, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOpportunityInit } from '@/api/use-opportunity-init.js'
import { useProspectDetails } from '@/api/use-prospect-details.js'
import { useUserProfile } from '@/api/use-user-profile.js'
import { createOpportunity } from '@/api/vueQuery/create-opportunity'
import { useMutation } from 'vue-query'

markRaw(Input)
markRaw(Label)
markRaw(TextArea)
markRaw(SwdSelectForm)

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
      const res = await addOpportunity({
        ...formData.value,
        member_id: id,
      })

      if (!res.error) router.push({ name: 'member-details', params: { id } })
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
      isLoading: isLoadingInitOpportunity,
      isErrorLoadingInit,
      data: initOpportunity,
    } = useOpportunityInit()

    const {
      isLoading: isLoadingUserProfile,
      isError: isErrorUserProfile,
      data: userProfile,
    } = useUserProfile()

    watch(
      initOpportunity,
      (newV) => {
        if (newV) {
          const stageList = initOpportunity.value.data.init.stage_list.map(
            (item) => {
              return {
                title: item,
                command: item,
              }
            }
          )
          const typeList = initOpportunity.value.data.init.type_list.map(
            (item) => {
              return {
                title: item,
                command: item,
              }
            }
          )
          schema.value[0][1].options = stageList
          schema.value[2][0].options = typeList
        }
      },
      { immediate: true }
    )

    watch(
      prospectDetails,
      (newV) => {
        if (newV) {
          schema.value[1][1].value = newV.namelastName
          formData.value.opportunity_owner = newV.name
        }
      },
      { immediate: true }
    )

    watch(
      userProfile,
      (newV) => {
        if (newV) {
          schema.value[0][0].value = newV.firstName + ' ' + newV.lastName
          formData.value.account_name = newV.firstName + ' ' + newV.lastName
        }
      },
      { immediate: true }
    )

    return {
      schema,
      saveStep,
      isError,
      isErrorProspectDetails,
      prospectDetails,
      isLoadingProspectDetails,
      isLoadingUserProfile,
      isErrorUserProfile,
      userProfile,
      error,
      isLoadingInitOpportunity,
      isErrorLoadingInit,
      initOpportunity,
    }
  },
}
</script>
