import { regExp } from '@/helpers/regexp';
import { validationMessages } from '@/helpers/constants';

export const isItemValid = (errors: any, form: any, name: string): boolean => {
  errors[name] = '';
  let isValid = true;

  switch (name) {
    case 'description':
      if (!form.description || form.description.length < 10) {
        errors[name] = validationMessages.description;
      }
      break;

    case 'email':
      if (!form.email) {
        errors.email = validationMessages.email.required;

        isValid = false;
      } else if (!regExp.email.test(form.email)) {
        errors.email = validationMessages.email.invalid;

        isValid = false;
      }
      break;

    default:
      if (!form[name] && validationMessages[name]) {
        errors[name] = validationMessages[name];
        isValid = false;
      }
  }

  return isValid;
};

export const isFormValid = (form: any, errors = {}): boolean => {
  let counter = 0;

  for (const item in form) {

    if (form.hasOwnProperty(item)) {
      if (!isItemValid(errors, form, item)) {
        counter++;
      }
    }

  }

  return !counter;
};
