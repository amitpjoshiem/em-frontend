<template>
  <div class="pt-6">
    <div class="border-color-grey px-20 pb-7">
      <span class="text-xl font-medium">New opportunity</span>
      <SchemaFormWithValidation
        :schema="schema"
        schema-row-classes="pt-6"
        @submit="onSubmit"
      >
        <template #afterForm>
          <div class="pt-12 text-right">
            <Button default-blue-btn text-btn="Save" @click="saveStep" />
          </div>
        </template>
      </SchemaFormWithValidation>
    </div>
  </div>
</template>

<script>
import { SchemaFormFactory, useSchemaForm } from 'formvuelate'
import VeeValidatePlugin from '@formvuelate/plugin-vee-validate'
import Input from '@/components/Global/Input/Input.vue'
import Label from '@/components/Global/Label.vue'
import TextArea from '@/components/Global/TextArea.vue'
import { schemaOpportunity } from '@/components/Opportunity/schema/newOpportunity'
import { ref, markRaw } from 'vue'

markRaw(Input)
markRaw(Label)
markRaw(TextArea)

const SchemaFormWithValidation = SchemaFormFactory([VeeValidatePlugin()])

export default {
  name: 'NewProspectBasic',
  components: { SchemaFormWithValidation },
  setup() {
    const schema = ref(schemaOpportunity)
    const formData = ref({})
    useSchemaForm(formData)

    const saveStep = async () => {
      console.log('save step')
    }

    const onSubmit = () => {
      console.log('onSubmit')
    }

    return {
      schema,
      saveStep,
      onSubmit,
    }
  },
}
</script>
