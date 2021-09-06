<template>
  <Dialog title="Change password" confirm-action="changeName" destination-dialog="changeName">
    <template #buttonDialog>
      <div class="flex items-center">
        <InlineSvg :src="IconPencil" class="mb-1" />
      </div>
    </template>
    <template #contentDialog>
      <SchemaFormWithValidation :schema="schema" schema-row-classes="pt-3" @submit="saveName">
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
import Label from '@/components/Global/Label.vue'
import Input from '@/components/Global/Input/Input.vue'
import VeeValidatePlugin from '@formvuelate/plugin-vee-validate'
import { schemaChangeName } from '@/components/Settings/schema/changeName'
import { SchemaFormFactory, useSchemaForm } from 'formvuelate'
import { ref, markRaw } from 'vue'
import { useUserProfile } from '@/api/use-user-profile.js'
import { useMutation, useQueryClient } from 'vue-query'
import { useStore } from 'vuex'
import { changeUserName } from '@/api/vueQuery/change-user-name'

const SchemaFormWithValidation = SchemaFormFactory([VeeValidatePlugin()])

markRaw(Input)
markRaw(Label)

export default {
  name: 'ChangePassword',
  components: { SchemaFormWithValidation },

  setup() {
    const store = useStore()
    const queryClient = useQueryClient()

    const {
      mutateAsync: changeUserNameProfile,
      isLoading,
      isError,
      isFetching,
      data,
      error,
    } = useMutation(changeUserName)

    const { isLoading: isLoadingUserProfile, isError: isErrorUserProfile, data: user, refetch } = useUserProfile()

    const schema = ref(schemaChangeName)
    const formData = ref({})
    useSchemaForm(formData)

    const saveName = async () => {
      changeUserNameProfile({ form: formData.value, id: user.value.id })
        .then(() => {
          queryClient.invalidateQueries(['users'])
          store.commit('globalComponents/setShowModal', {
            destination: 'changeName',
            value: true,
          })
        })
        .catch((error) => {
          console.error(error)
        })
    }

    return {
      changeUserNameProfile,
      isLoading,
      isError,
      isFetching,
      data,
      error,
      saveName,
      schema,
      IconPencil,
      isLoadingUserProfile,
      isErrorUserProfile,
      user,
      refetch,
    }
  },
}
</script>
