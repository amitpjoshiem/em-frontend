import { useField } from 'vee-validate'
import { computed } from 'vue'

const withValidation = (component) => {
  return Object.assign({}, component, {
    setup: (props, { emit }) => {
      const emitValue = (e) => {
        emit('update:value', e.target.value)
        emit('update:modelValue', e.target.modelValue)
      }

      const {
        value: formValue,
        errorMessage,
        handleChange,
        handleBlur,
        meta,
      } = useField(props.name, undefined, {
        validateOnValueUpdate: false,
        bails: true,
        initialValue: props.value ?? props.modelValue,
      })

      const showError = computed(() => {
        return meta.touched && Boolean(errorMessage) && !meta.valid
      })

      const handleChangeExtended = (e) => {
        emitValue(e)
        handleChange(e)
      }

      return {
        formValue,
        errorMessage,
        handleChange: handleChangeExtended,
        handleBlur,
        showError,
        meta,
      }
    },
  })
}

export { withValidation }
