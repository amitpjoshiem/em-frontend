const rules = {
  email: [
    { required: true, message: 'Please input email address', trigger: 'blur' },
    {
      type: 'email',
      message: 'Please input correct email address',
      trigger: ['blur'],
    },
  ],
  password: [{ type: 'string', required: true, message: 'Please input password' }],
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
