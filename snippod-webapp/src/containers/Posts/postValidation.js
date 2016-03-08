import { createValidator, required, minLength, maxLength, url } from 'utils/validation';
import { postsForm } from 'constants/form';

const postValidation = createValidator({
  title: [required, minLength(postsForm.titleMinLength), maxLength(postsForm.titleMaxLength)],
  link: [required, url]
});
export default postValidation;
