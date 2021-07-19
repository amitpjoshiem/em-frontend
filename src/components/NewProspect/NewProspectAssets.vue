<template>
  <div class="pt-6">
    <div class="border-b border-color-grey px-20 pb-7">
      <span class="text-xl font-medium">Current income</span>
      <SchemaFormWithValidation :schema="schemaCurrent" />
    </div>

    <div class="border-b border-color-grey px-20 pt-7">
      <span class="text-xl font-medium">Liquid assets</span>
      <SchemaFormWithValidation :schema="schemaLiquid" class="mt-7" />
    </div>

    <div class="border-b border-color-grey px-20 pt-7">
      <span class="text-xl font-medium">Non-liquid assets</span>
      <SchemaFormWithValidation :schema="schemaNoLiquid" class="mt-7" />
    </div>

    <div class="flex justify-end my-6">
      <div class="pr-3">
        <Button default-gray-btn text-btn="Back" @click="backStep" />
      </div>

      <div>
        <Button
          default-blue-btn
          text-btn="Go to the assets accounts"
          @click="saveStep"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { SchemaFormFactory, useSchemaForm } from 'formvuelate'
import VeeValidatePlugin from '@formvuelate/plugin-vee-validate'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed, ref, markRaw, onMounted } from 'vue'

import Input from '@/components/Global/Input/Input.vue'
import Radio from '@/components/Global/Radio.vue'
import Label from '@/components/Global/Label.vue'
import TextArea from '@/components/Global/TextArea.vue'

import {
  prospectAssetsSchemaCurrent,
  prospectAssetsSchemaLiquid,
  prospectAssetsSchemaNoLiquid,
} from '@/components/NewProspect/schema/newProspectAssetsSchema'

markRaw(Input)
markRaw(Radio)
markRaw(Label)
markRaw(TextArea)

const SchemaFormWithValidation = SchemaFormFactory([VeeValidatePlugin()])

export default {
  name: 'NewProspectAssets',
  components: { SchemaFormWithValidation },
  setup() {
    const store = useStore()
    const router = useRouter()
    const schemaCurrent = ref(prospectAssetsSchemaCurrent)
    const schemaLiquid = ref(prospectAssetsSchemaLiquid)
    const schemaNoLiquid = ref(prospectAssetsSchemaNoLiquid)
    const formData = ref({})
    useSchemaForm(formData)

    onMounted(() => {
      store.commit('newProspect/setStep', 2)
    })

    const step = computed(() => store.state.newProspect.step)

    const saveStep = () => {
      store.commit('newProspect/setStep', step.value + 1)
      router.push({ name: 'assetsacount' })
    }

    const backStep = () => {
      store.commit('newProspect/setStep', step.value - 1)
      router.push({ name: 'basic-information' })
    }

    return {
      schemaCurrent,
      schemaLiquid,
      schemaNoLiquid,
      saveStep,
      backStep,
    }
  },
}
</script>
