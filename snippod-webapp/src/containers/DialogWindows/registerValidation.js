import { createValidator, required, email, minLength, maxLength, space, specialCharCheck, match } from 'utils/validation';
import { loginForm, registerForm } from 'constants/form';

const registerValidation = createValidator({
  emailId: [required, email],
  password: [required, minLength(loginForm.passwordMinLength), maxLength(loginForm.passwordMaxLength)],
  confirmPassword: [match('password')],
  username: [required, minLength(registerForm.usernameMinLength), maxLength(registerForm.usernameMaxLength), specialCharCheck, space]
});
export default registerValidation;
