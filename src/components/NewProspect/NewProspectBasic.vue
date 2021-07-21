<template>
  <div class="pt-6">
    <div class="border-color-grey px-20 pb-7">
      <span class="text-xl font-medium">General</span>
      <SchemaFormWithValidation
        :schema="schemaGeneral"
        schema-row-classes="pt-6"
        @submit="onSubmit"
      >
        <template #afterForm>
          <div class="pt-12 text-right">
            <Button
              default-blue-btn
              text-btn="Go to the assets &amp; income"
              @click="saveStep"
            />
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
import Radio from '@/components/Global/Radio.vue'
import Label from '@/components/Global/Label.vue'
import TextArea from '@/components/Global/TextArea.vue'
import SchemaLabel from '@/components/NewProspect/SchemaLabel.vue'
import SchemaSeparator from '@/components/NewProspect/SchemaSeparator.vue'

import { shemaBasic } from '@/components/NewProspect/schema/newProspectBasicSchema'

import { ref, markRaw } from 'vue'
// import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { onMounted } from 'vue'
// import { computed, onMounted } from 'vue'

markRaw(Input)
markRaw(Radio)
markRaw(Label)
markRaw(TextArea)
markRaw(SchemaSeparator)
markRaw(SchemaLabel)

const SchemaFormWithValidation = SchemaFormFactory([VeeValidatePlugin()])

export default {
  name: 'NewProspectBasic',
  components: { SchemaFormWithValidation },
  setup() {
    // const router = useRouter()
    const store = useStore()

    onMounted(() => {
      store.commit('newProspect/setStep', 1)
      window.scrollTo(0, 0)
    })

    const schemaGeneral = ref(shemaBasic)
    const formData = ref({})
    useSchemaForm(formData)

    // const step = computed(() => store.state.newProspect.step)

    const saveStep = () => {
      console.log('formDataformData - ', formData.value)
      // store.commit('newProspect/setStep', step.value + 1)
      // router.push({ name: 'assets-information' })
    }

    const onSubmit = () => {
      console.log('onSubmit')
    }

    return {
      schemaGeneral,
      saveStep,
      onSubmit,
    }
  },
}
</script>
