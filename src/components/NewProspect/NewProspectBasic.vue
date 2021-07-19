<template>
  <div class="pt-6">
    <div class="border-b border-color-grey px-20 pb-7">
      <span class="text-xl font-medium">General</span>
      <SchemaFormWithValidation
        :schema="schemaGeneral"
        schema-row-classes="pt-6"
      />
    </div>
    <div class="border-b border-color-grey px-20 py-7">
      <span class="text-xl font-medium">Spouse</span>
      <SchemaFormWithValidation
        :schema="schemaSpouse"
        schema-row-classes="pt-6"
      />
    </div>
    <div class="border-b border-color-grey px-20 pt-7">
      <span class="text-xl font-medium">Housing Information</span>
      <SchemaFormWithValidation
        :schema="schemaHousing"
        schema-row-classes="pb-6"
      />
    </div>
    <div class="border-b border-color-grey px-20 pt-7">
      <span class="text-xl font-medium">Housing Information</span>
      <SchemaFormWithValidation
        :schema="schemaEmployment"
        schema-row-classes="pb-6"
      />
    </div>
    <div class="border-b border-color-grey px-20 pt-7">
      <span class="text-xl font-medium">Housing Information</span>
      <SchemaFormWithValidation
        :schema="schemaEmployment"
        schema-row-classes="pb-6"
      />
    </div>
    <div class="px-20 pt-7">
      <span class="text-xl font-medium">Other</span>
      <SchemaFormWithValidation
        :schema="schemaOther"
        schema-row-classes="pb-6"
      />
    </div>
    <div class="my-6 flex justify-end">
      <Button
        default-blue-btn
        text-btn="Go to the assets &amp; income"
        @click="saveStep"
      />
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
  prospectBasicSchemaGeneral,
  prospectBasicSchemaSpouse,
  prospectBasicSchemaHousing,
  prospectBasicSchemaEmployment,
  prospectBasicSchemaOther,
} from '@/components/NewProspect/schema/newProspectBasicSchema'

import { ref, markRaw } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'

markRaw(Input)
markRaw(Radio)
markRaw(Label)
markRaw(TextArea)

const SchemaFormWithValidation = SchemaFormFactory([VeeValidatePlugin()])

export default {
  name: 'NewProspectBasic',
  components: { SchemaFormWithValidation },
  emits: ['hello'],
  setup() {
    const router = useRouter()
    const store = useStore()

    onMounted(() => {
      store.commit('newProspect/setStep', 1)
    })

    const schemaGeneral = ref(prospectBasicSchemaGeneral)
    const schemaSpouse = ref(prospectBasicSchemaSpouse)
    const schemaHousing = ref(prospectBasicSchemaHousing)
    const schemaEmployment = ref(prospectBasicSchemaEmployment)
    const schemaOther = ref(prospectBasicSchemaOther)
    const formData = ref({})
    useSchemaForm(formData)

    const step = computed(() => store.state.newProspect.step)

    const saveStep = () => {
      store.commit('newProspect/setStep', step.value + 1)
      router.push({ name: 'assets-information' })
    }

    return {
      schemaGeneral,
      schemaSpouse,
      schemaHousing,
      schemaEmployment,
      schemaOther,
      saveStep,
    }
  },
}
</script>
