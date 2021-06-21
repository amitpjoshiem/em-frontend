import { withValidation } from './withValidation'
import InputText from '../Inputs/InputText.vue'

const InputTextForm = withValidation(InputText)

InputTextForm.name = 'InputTextForm'

export default InputTextForm
