<template>
  <div class="flex justify-center h-screen mt-40">
    <div class="px-40 py-2">
      <div class="flex flex-col items-center">
        <h1 class="font-bold text-blue-600 text-9xl">404</h1>

        <h6 class="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
          <span class="text-red-500">Oops!</span>
        </h6>

        <p class="mb-8 text-center text-gray-500 md:text-lg">Page not found.</p>

        <a href="#" class="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100" @click="$router.go(-1)">Back</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
  setup() {},
}
</script>
