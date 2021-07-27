<template>
  <div class="p-5">
    <SubHeader
      title="New opportunity"
      back-page="prospect-details"
      back-page-title="Prospect details"
    />
    <div
      v-if="!isLoadingStage && !isLoadingWidgetProspectDetails"
      class="border-color-grey px-10 pb-7"
    >
      <SchemaFormWithValidation :schema="schema" schema-row-classes="pt-3">
        <template #afterForm>
          <div class="pt-12 text-right">
            <Button default-blue-btn text-btn="Save" @click="saveStep" />
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
import { useRoute } from 'vue-router'
import { useStageOpportunity } from '@/api/use-stage-opportunity.js'
import { useProspectDetails } from '@/api/use-prospect-details.js'

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
    const schema = ref(schemaOpportunity)
    const formData = ref({})
    const id = route.params.id

    useSchemaForm(formData)

    const saveStep = async () => {
      console.log('save step')
      console.log('formData - ', formData)
    }

    const {
      isLoading: isLoadingWidgetProspectDetails,
      isError: isErrorWidgetProspectDetails,
      data: prospectDetails,
    } = useProspectDetails(id)

    const {
      isLoading: isLoadingStage,
      isError,
      data: stageSelect,
    } = useStageOpportunity()

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

    watch(isLoadingWidgetProspectDetails, (newV, oldV) => {
      if (newV === false && oldV === true) {
        schema.value[1][1].value =
          prospectDetails.value.firstName + ' ' + prospectDetails.value.lastName
      }
    })

    return {
      schema,
      saveStep,
      isLoadingStage,
      isError,
      isErrorWidgetProspectDetails,
      stageSelect,
      prospectDetails,
      isLoadingWidgetProspectDetails,
    }
  },
}
</script>
