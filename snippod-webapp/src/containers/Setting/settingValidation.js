import { createValidator, required, minLength, maxLength, match } from 'utils/validation';
import { loginForm } from 'constants/form';

const settingValidation = createValidator({
  password: [required, minLength(loginForm.passwordMinLength), maxLength(loginForm.passwordMaxLength)],
  confirmPassword: [match('password')],
});
export default settingValidation;
