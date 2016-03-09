import { createValidator, required, minLength, maxLength } from 'utils/validation';
import { commentsForm } from 'constants/form';

const commentValidation = createValidator({
  content: [required, maxLength(commentsForm.commentMaxLength)],
});
export default commentValidation;
