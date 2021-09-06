<template>
  <Dialog title="Change password" confirm-action="changePassword" destination-dialog="changePassword">
    <template #buttonDialog>
      <div class="flex items-center">
        <InlineSvg :src="IconPencil" class="mb-1" />
      </div>
    </template>
    <template #contentDialog>
      <SchemaFormWithValidation :schema="schema" schema-row-classes="pt-3" @submit="savePass">
        <template #afterForm>
          <div class="pt-12 text-right">
            <Button default-blue-btn text-btn="Save" type="submit" />
          </div>
        </template>
      </SchemaFormWithValidation>
    </template>
  </Dialog>
</template>
<script>
import IconPencil from '@/assets/svg/icon-pencil.svg'
import { useChangePassword } from '@/api/authentication/use-change-password'
import Label from '@/components/Global/Label.vue'
import Input from '@/components/Global/Input/Input.vue'
import VeeValidatePlugin from '@formvuelate/plugin-vee-validate'
import { schemaChangePassword } from '@/components/Settings/schema/changePassword'
import { SchemaFormFactory, useSchemaForm } from 'formvuelate'
import { ref, markRaw, reactive } from 'vue'
import { useStore } from 'vuex'

const SchemaFormWithValidation = SchemaFormFactory([VeeValidatePlugin()])

markRaw(Input)
markRaw(Label)

export default {
  name: 'ChangePassword',
  components: { SchemaFormWithValidation },

  setup() {
    const store = useStore()
    const { response, error, fetching, changePassword } = useChangePassword()

    const data = reactive({
      hideDialog: false,
    })

    const schema = ref(schemaChangePassword)
    const formData = ref({})
    useSchemaForm(formData)

    const savePass = async () => {
      changePassword(formData.value)
        .then(() => {
          store.commit('globalComponents/setShowModal', {
            destination: 'changePassword',
            value: true,
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }

    return {
      response,
      error,
      fetching,
      changePassword,
      IconPencil,
      savePass,
      schema,
      data,
    }
  },
}
</script>
