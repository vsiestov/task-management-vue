import { format, isValid } from 'date-fns';

export const dateInput = (value: string) => {
  const date = new Date(value);

  if (!isValid(date)) {
    return value;
  }

  return format(date, 'YYYY-MM-DDTHH:MM');
};

