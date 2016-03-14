import { createValidator, required, minLength, maxLength, specialCharCheck, space } from 'utils/validation';
import { registerForm } from 'constants/form';

const userValidation = createValidator({
  username: [required, minLength(registerForm.usernameMinLength), maxLength(registerForm.usernameMaxLength), specialCharCheck, space],
  description: [maxLength(registerForm.descriptionMaxLength)]
});
export default userValidation;
