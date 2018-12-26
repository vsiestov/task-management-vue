const requiredField = 'This field is required';

export const validationMessages: any = {
  firstName: requiredField,
  lastName: requiredField,
  description: requiredField,
  due: requiredField,
  email: {
    required: requiredField,
    invalid: 'Email is not correct'
  },
  password: 'Password must be at lease 6 symbols'
};

export const errorMessage = (message: string) => {
  return {
    errors: [
      {
        msg: message
      }
    ]
  };
};
