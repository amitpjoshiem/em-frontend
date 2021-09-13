<template>
  <SwdDialog title="Change name" confirm-action="changeName" destination-dialog="changeName">
    <template #buttonDialog>
      <div class="flex items-center">
        <InlineSvg :src="IconPencil" class="mb-1" />
      </div>
    </template>
    <template #contentDialog>
      <el-form ref="form" :model="ruleForm" status-icon :rules="rules" label-position="top">
        <el-form-item label="First name" prop="first_name" class="w-full">
          <el-input v-model="ruleForm.first_name" placeholder="Enter first name" />
        </el-form-item>
        <el-form-item label="Last name" prop="last_name" class="w-full">
          <el-input v-model="ruleForm.last_name" placeholder="Enter last name" />
        </el-form-item>
        <div class="pt-3 text-right">
          <Button default-blue-btn text-btn="Save" @click="saveName" />
        </div>
      </el-form>
    </template>
  </SwdDialog>
</template>
<script>
import IconPencil from '@/assets/svg/icon-pencil.svg'
import { useUserProfile } from '@/api/use-user-profile.js'
import { useMutation, useQueryClient } from 'vue-query'
import { useStore } from 'vuex'
import { changeUserName } from '@/api/vueQuery/change-user-name'
import { reactive, ref, onMounted } from 'vue'
import { rules } from '@/validationRules/changeName.js'

export default {
  name: 'ChangePassword',
  setup() {
    const store = useStore()
    const queryClient = useQueryClient()
    const form = ref(null)

    const ruleForm = reactive({
      first_name: '',
      last_name: '',
    })

    const {
      mutateAsync: changeUserNameProfile,
      isLoading,
      isError,
      isFetching,
      data,
      error,
    } = useMutation(changeUserName)

    const { isLoading: isLoadingUserProfile, isError: isErrorUserProfile, data: user, refetch } = useUserProfile()

    onMounted(async () => {
      if (user.value.firstName) {
        ruleForm.first_name = user.value.firstName
      }
      if (user.value.lastName) {
        ruleForm.last_name = user.value.lastName
      }
    })

    const saveName = async (e) => {
      e.preventDefault()
      changeUserNameProfile({ form: ruleForm, id: user.value.id })
        .then(() => {
          queryClient.invalidateQueries(['users'])
          store.commit('globalComponents/setShowModal', {
            destination: 'changeName',
            value: false,
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
      IconPencil,
      isLoadingUserProfile,
      isErrorUserProfile,
      user,
      refetch,
      ruleForm,
      form,
      rules,
    }
  },
}
</script>
