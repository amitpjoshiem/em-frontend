<template>
  <div class="pt-6">
    <div class="border-color-grey px-20 pb-7">
      <span class="text-xl font-medium">General</span>
      <SchemaFormWithValidation
        :schema="schemaGeneral"
        schema-row-classes="pt-6"
        @submit="saveStep"
      >
        <template #afterForm>
          <div class="pt-12 text-right">
            <Button
              default-blue-btn
              text-btn="Go to the assets &amp; income"
              type="submit"
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
import { useMutation } from 'vue-query'
import { useAlert } from '@/utils/use-alert'
import Input from '@/components/Global/Input/Input.vue'
import Radio from '@/components/Global/Radio.vue'
import RadioBoolean from '@/components/Global/RadioBoolean.vue'
import Label from '@/components/Global/Label.vue'
import TextArea from '@/components/Global/TextArea.vue'
import SchemaLabel from '@/components/NewProspect/SchemaLabel.vue'
import SchemaSeparator from '@/components/NewProspect/SchemaSeparator.vue'
import { shemaBasic } from '@/components/NewProspect/schema/newProspectBasicSchema'
import { ref, markRaw, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { createMembers } from '@/api/vueQuery/create-members'

markRaw(Input)
markRaw(Radio)
markRaw(RadioBoolean)
markRaw(Label)
markRaw(TextArea)
markRaw(SchemaSeparator)
markRaw(SchemaLabel)

const SchemaFormWithValidation = SchemaFormFactory([VeeValidatePlugin()])

export default {
  name: 'NewProspectBasic',
  components: { SchemaFormWithValidation },
  setup() {
    const router = useRouter()
    const store = useStore()

    const {
      mutateAsync: createMember,
      isLoading,
      isError,
      isFetching,
      data,
      error,
      refetch,
    } = useMutation(createMembers)

    onMounted(() => {
      store.commit('newProspect/setStep', 1)
      window.scrollTo(0, 0)
    })

    const schemaGeneral = ref(shemaBasic)
    const formData = ref({})
    useSchemaForm(formData)

    const step = computed(() => store.state.newProspect.step)

    const saveStep = async () => {
      createMember(formData.value)
        .then(() => {
          useAlert({
            title: 'Success',
            type: 'success',
            message: 'Prospect created successfully',
          })
          store.commit('newProspect/setStep', step.value + 1)
          router.push({ name: 'assets-information' })
        })
        .catch((error) => {
          useAlert({
            title: 'Error',
            message: error.message,
            type: 'error',
          })
        })
    }

    return {
      schemaGeneral,
      saveStep,
      isLoading,
      isError,
      isFetching,
      data,
      error,
      refetch,
    }
  },
}
</script>
