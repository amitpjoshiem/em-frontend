<template>
  <div class="pt-6">
    <div class="border-b border-color-grey px-20 pb-7">
      <span class="text-xl font-semibold">Current income</span>
      <SchemaFormWithValidation :schema="schemaCurrent" />
    </div>

    <div class="border-b border-color-grey px-20 pt-7">
      <span class="text-xl font-semibold">Liquid assets</span>
      <SchemaFormWithValidation :schema="schemaLiquid" class="mt-7" />
    </div>

    <div class="border-b border-color-grey px-20 pt-7">
      <span class="text-xl font-semibold">Non-liquid assets</span>
      <SchemaFormWithValidation :schema="schemaNoLiquid" class="mt-7" />
    </div>

    <div class="flex justify-end my-6">
      <div class="pr-3">
        <Button default-gray-btn text-btn="Back" />
      </div>

      <div>
        <Button default-blue-btn text-btn="Go to the assets & income" />
      </div>
    </div>
  </div>
</template>

<script>
import { SchemaFormFactory, useSchemaForm } from 'formvuelate'
import VeeValidatePlugin from '@formvuelate/plugin-vee-validate'

import Input from '@/components/Global/Input/Input.vue'
import Radio from '@/components/Global/Radio.vue'
import Label from '@/components/Global/Label.vue'
import TextArea from '@/components/Global/TextArea.vue'

import {
  prospectAssetsSchemaCurrent,
  prospectAssetsSchemaLiquid,
  prospectAssetsSchemaNoLiquid,
} from '@/components/NewProspect/schema/newProspectAssetsSchema'

import { ref, markRaw } from 'vue'

markRaw(Input)
markRaw(Radio)
markRaw(Label)
markRaw(TextArea)

const SchemaFormWithValidation = SchemaFormFactory([VeeValidatePlugin()])

export default {
  name: 'NewProspectAssets',
  components: { SchemaFormWithValidation },
  setup() {
    const schemaCurrent = ref(prospectAssetsSchemaCurrent)
    const schemaLiquid = ref(prospectAssetsSchemaLiquid)
    const schemaNoLiquid = ref(prospectAssetsSchemaNoLiquid)
    const formData = ref({})
    useSchemaForm(formData)

    return {
      schemaCurrent,
      schemaLiquid,
      schemaNoLiquid,
    }
  },
}
</script>
