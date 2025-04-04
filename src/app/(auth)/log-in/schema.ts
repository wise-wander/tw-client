import { PASSWORD_REGEX } from '@/constants/Regex';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().regex(PASSWORD_REGEX, {
    message:
      'Password must be 8-32 characters long and contain at least one letter and one number',
  }),
});

export type ILoginForm = z.infer<typeof loginSchema>;

export const initialLoginForm: ILoginForm = {
  email: '',
  password: '',
};
