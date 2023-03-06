import { rulesFirstName } from './fields/rules-first-name'
import { rulesLastName } from './fields/rules-last-name'
import { rulesEmail } from './fields/rules-email'
import { rulesPhoneRequired } from './fields/rules-phone'

const rules = {
  first_name: rulesFirstName,
  last_name: rulesLastName,
  email: rulesEmail,
  phone: rulesPhoneRequired,
}

export { rules }
