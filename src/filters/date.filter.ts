import { format } from 'date-fns';
export const dateFilter = (value: string, attrs: string) => {
  return format(value, attrs);
};
