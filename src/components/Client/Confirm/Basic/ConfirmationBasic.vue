<template>
  <div v-if="!isFetchingMember">
    <div v-if="$can('client', 'all')" class="flex justify-end mb-4">
      <el-button type="primary" plain class="mr-10" size="small" @click="edit">Edit</el-button>
    </div>
    <el-card class="mb-4 w-full sm:p-5">
      <div>
        <div class="mb-5 text-main font-semibold">General Info</div>
        <div class="sm:flex sm:flex-wrap lg:flex-row text-sm mb-4">
          <!-- CLIENT -->
          <div class="flex text-main mb-2 sm:w-6/12 xl:w-5/12">
            <div class="pr-2 text-gray-500">Name:</div>
            <SwdStubForText :text="member.name" plug="&mdash;" class="text-sm text-main" />
          </div>
          <div class="flex text-main mb-2 sm:w-6/12 xl:w-4/12">
            <div class="pr-2 text-gray-500">E-mail:</div>
            <div class="text-main">{{ member.email }}</div>
          </div>
          <div class="flex text-main mb-2 sm:w-6/12 xl:w-3/12">
            <span class="text-gray-500 pr-2">Age:</span>
            <SwdStubForText :text="member.age" plug="&mdash;" class="text-sm text-main" />
          </div>
          <!-- SPOUSE -->
          <template v-if="member.married">
            <div class="flex text-main mb-2 sm:w-6/12 xl:w-5/12">
              <div class="pr-2 text-gray-500">Spouse Name:</div>
              <div class="text-main">{{ member.spouse.name }}</div>
            </div>
            <div class="flex text-main mb-2 sm:w-6/12 xl:w-4/12">
              <div class="pr-2 text-gray-500">Spouse e-mail:</div>
              <div class="text-main">{{ member.spouse.email }}</div>
            </div>
            <div class="flex text-main mb-2 sm:w-6/12 xl:w-3/12">
              <span class="text-gray-500 pr-2">Spouse Age:</span>
              <span class="">{{ member.spouse.age }}</span>
            </div>
          </template>

          <!-- ADDRESS -->
          <div class="flex text-main mb-2 sm:w-6/12 xl:w-5/12">
            <div class="pr-2 text-gray-500">Address:</div>
            <SwdStubForText :text="member.address" plug="&mdash;" class="text-sm text-main" />
          </div>
          <div class="flex text-main mb-2 sm:w-6/12 xl:w-4/12">
            <div class="pr-2 text-gray-500">City:</div>
            <SwdStubForText :text="member.city" plug="&mdash;" class="text-sm text-main" />
          </div>
          <div class="flex text-main mb-2 sm:w-6/12 xl:w-3/12">
            <span class="text-gray-500 pr-2">State:</span>
            <SwdStubForText :text="member.state" plug="&mdash;" class="text-sm text-main" />
          </div>
          <div class="flex text-main mb-2 sm:w-6/12 xl:w-5/12">
            <span class="text-gray-500 pr-2">Zip:</span>
            <SwdStubForText :text="member.zip" plug="&mdash;" class="text-sm text-main" />
          </div>

          <!-- RETIRED -->
          <div class="flex text-main mb-2 sm:w-6/12 xl:w-4/12">
            <div class="pr-2 text-gray-500">Retired:</div>
            <div class="text-main">
              <SwdRetiredLabel :retired="member.retired" />
            </div>
          </div>
          <div v-if="member.married" class="flex text-main mb-2 sm:w-6/12 xl:w-3/12">
            <div class="pr-2 text-gray-500">Spouse retired:</div>
            <div class="text-main">
              <SwdRetiredLabel :retired="member.spouse.retired" />
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <el-card>
      <MoreInfoAbout />
    </el-card>
  </div>
  <div v-else class="flex justify-center items-center">
    <SwdSpinner large />
  </div>
</template>

<script>
import { useFetchMember } from '@/api/use-fetch-member.js'
import { useRoute, useRouter } from 'vue-router'
import MoreInfoAbout from '@/components/Client/AddNewClient/MoreInfoAbout.vue'

export default {
  name: 'ConfirmationInformation',
  components: {
    MoreInfoAbout,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const { isFetching: isFetchingMember, data: member } = useFetchMember({ id: route.params.id })

    const edit = () => {
      router.push({ name: 'client-basic-information', params: { id: route.params.id } })
    }

    return {
      isFetchingMember,
      member,
      edit,
    }
  },
}
</script>
