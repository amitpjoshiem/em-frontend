import { rulesEmail } from './fields/rules-email'
import { rulesPassword } from './fields/rules-password'

const rules = {
  email: rulesEmail,
  password: rulesPassword,
  code: [
    { required: true, message: 'Please input OTP code', trigger: 'blur' },
    { validator: checkOtp, trigger: 'blur' },
  ],
}

function checkOtp(rule, value, callback) {
  if (!value) {
    return callback(new Error('Please input OTP code'))
  }

  if (!Number.isInteger(Number(value))) {
    callback(new Error('Please input digits'))
  } else {
    callback()
  }
}

export { rules }
