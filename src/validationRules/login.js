const rules = {
  email: [
    { required: true, message: 'Please input email address', trigger: 'blur' },
    {
      type: 'email',
      message: 'Please input correct email address',
      trigger: ['blur', 'change'],
    },
  ],
  password: [
    { type: 'string', required: true, message: 'Please password' },
    { min: 6, message: 'Length should be min 6', trigger: 'blur' },
  ],
  code: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
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
