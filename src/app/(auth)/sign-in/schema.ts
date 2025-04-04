import { PASSWORD_REGEX } from '@/constants/Regex';
import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().regex(PASSWORD_REGEX, {
    message:
      'Password must be 8-32 characters long and contain at least one letter and one number',
  }),
});

export type ISignInForm = z.infer<typeof signInSchema>;

export const initSignInForm: ISignInForm = {
  email: '',
  password: '',
};
