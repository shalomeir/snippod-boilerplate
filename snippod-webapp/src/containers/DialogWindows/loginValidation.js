import {createValidator, required, email, minLength, maxLength} from 'utils/validation';
import { loginForm } from 'constants/defaults';

export const colors = ['Blue', 'Fuchsia', 'Green', 'Orange', 'Red', 'Taupe'];

const loginValidation = createValidator({
  emailId: [required, email],
  password: [required, minLength(loginForm.passwordMinLength), maxLength(loginForm.passwordMaxLength)],

});
export default loginValidation;
