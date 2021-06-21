<template>
  <div class="flex justify-between">
    <BackButton @click="back" />
    <span class="text-title text-main font-semibold">Basic information</span>
    <NextButton @click="back" />
  </div>
</template>
<script>
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

export default {
  name: 'NewProspectHeader',
  setup() {
    const router = useRouter()

    function pushBack() {
      router.push({
        name: 'dashboard',
      })
    }

    return {
      pushBack,
    }
  },
  methods: {
    back() {
      ElMessageBox.confirm(
        'This will permanently delete the file. Continue?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      )
        .then(() => {
          console.log('ok')
          this.pushBack()
        })
        .catch(() => {
          console.log('cancel')
        })
    },
    next() {
      ElMessageBox.confirm(
        'This will permanently delete the file. Continue?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }
      )
        .then(() => {
          console.log('ok')
          this.pushBack()
        })
        .catch(() => {
          console.log('cancel')
        })
    },
  },
}
</script>
