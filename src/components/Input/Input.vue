<template>
  <div>
    <div class="flex items-center justify-between">
      <label class="label block text-sm text-main">{{ label }}</label>
    </div>
    <input :type="type" :placeholder="placeholder" class="input" />
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
  width: 320px;
  height: 36px;
  border: 1px solid #d4ddeb;
  box-shadow: 0px 0px 1.5px rgba(102, 182, 255, 0.6);
  border-radius: 6px;
  padding-top: 9px;
  padding-bottom: 9px;
  padding-left: 20px;
  &::placeholder {
    color: #b2bccd;
    font-style: 13px;
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
