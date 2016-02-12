import { createValidator, required, email, minLength, maxLength, match } from 'utils/validation';
import { loginForm, registerForm } from 'constants/form';

const registerValidation = createValidator({
  emailId: [required, email],
  password: [required, minLength(loginForm.passwordMinLength), maxLength(loginForm.passwordMaxLength)],
  confirmPassword: [required, minLength(loginForm.passwordMinLength), maxLength(loginForm.passwordMaxLength), match('password')],
  username: [required, minLength(registerForm.usernameMinLength), maxLength(registerForm.usernameMaxLength)]
});
export default registerValidation;
