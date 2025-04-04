import { PASSWORD_REGEX } from '@/constants/Regex';
import { z } from 'zod';

export const signUpSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email(),
    password: z.string().regex(PASSWORD_REGEX, {
      message:
        'Password must be 8-32 characters long and contain at least one letter and one number',
    }),
    passwordConfirmation: z.string().regex(PASSWORD_REGEX, {
      message: 'Invalid password confirmation',
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });

export type ISignUpForm = z.infer<typeof signUpSchema>;

export const initSignUpForm: ISignUpForm = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};
