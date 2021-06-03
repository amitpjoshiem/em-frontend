<template>
  <div>
    <div class="flex items-center justify-between">
      <label class="label block text-sm text-main">{{ label }}</label>
    </div>
    <div class="relative">
      <input :type="type" :placeholder="placeholder" class="input" />
      <span
        v-if="type === 'password'"
        class="absolute inset-y-0 right-0 flex items-center"
      >
        <button
          type="button"
          class="p-1 focus:outline-none focus:shadow-outline"
        >
          <img class="pr-2" src="../../assets/img/showpassword.png" />
        </button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  setup() {},
}
</script>

<style lang="scss" scoped>
.input {
  width: 100%;
  border: 1px solid #d4ddeb;
  box-shadow: 0px 0px 1.5px rgba(102, 182, 255, 0.6);
  border-radius: 6px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 20px;
  justify-content: center;
  &::placeholder {
    color: #b2bccd;
    font-size: 13px;
    font-family: 'Eina04';
  }
  &:focus {
    border: 1px solid #66b6ff;
    box-shadow: 0px 0px 1.5px rgba(102, 182, 255, 0.6);
  }
}

.label {
  font-size: 13px;
}
</style>
