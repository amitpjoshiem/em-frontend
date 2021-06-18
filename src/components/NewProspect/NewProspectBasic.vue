<template>
  <div class="px-20 pt-6">
    <span class="text-xl font-semibold">General</span>
    <SchemaForm :schema="schemaGeneral" schema-row-classes="pb-6 " />
    <span class="text-xl font-semibold">Spouse</span>
    <SchemaForm :schema="schemaSpouse" schema-row-classes="pb-6" />
    <span class="text-xl font-semibold">Housing Information</span>
    <SchemaForm :schema="schemaHousing" schema-row-classes="pb-6" />
    <span class="text-xl font-semibold">Housing Information</span>
    <SchemaForm :schema="schemaEmployment" schema-row-classes="pb-6" />
    <span class="text-xl font-semibold">Housing Information</span>
    <SchemaForm :schema="schemaEmployment" schema-row-classes="pb-6" />
    <span class="text-xl font-semibold">Other</span>
    <SchemaForm :schema="schemaOther" schema-row-classes="pb-6" />
  </div>
</template>

<script>
import { SchemaForm, useSchemaForm } from 'formvuelate'
import Input from '@/components/Global/Input/Input.vue'
import Radio from '@/components/Global/Radio.vue'

import {
  prospectBasicSchemaGeneral,
  prospectBasicSchemaSpouse,
  prospectBasicSchemaHousing,
  prospectBasicSchemaEmployment,
  prospectBasicSchemaOther,
} from '@/components/NewProspect/schema/newProspectBasicSchema'

import { ref, markRaw } from 'vue'

markRaw(Input)
markRaw(Radio)

export default {
  name: 'NewProspectBasic',
  components: { SchemaForm },
  setup() {
    const schemaGeneral = ref(prospectBasicSchemaGeneral)
    const schemaSpouse = ref(prospectBasicSchemaSpouse)
    const schemaHousing = ref(prospectBasicSchemaHousing)
    const schemaEmployment = ref(prospectBasicSchemaEmployment)
    const schemaOther = ref(prospectBasicSchemaOther)
    const formData = ref({})
    useSchemaForm(formData)

    return {
      schemaGeneral,
      schemaSpouse,
      schemaHousing,
      schemaEmployment,
      schemaOther,
    }
  },
}
</script>
