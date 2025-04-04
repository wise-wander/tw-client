'use client';

import request from '@/api';
import FormInput from '@/components/FormInput';
import MaxWidthContainer from '@/components/MaxWidthContainer';
import { PASSWORD_REGEX } from '@/constants/Regex';
import { motion } from 'framer-motion';
import { LockKeyhole, Mail } from 'lucide-react';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().regex(PASSWORD_REGEX, {
    message:
      'Password must be 8-32 characters long and contain at least one letter and one number',
  }),
});

type ILoginForm = z.infer<typeof loginSchema>;

export default function LogInPage() {
  const [formData, setFormData] = useState<ILoginForm>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<ILoginForm>({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({ email: '', password: '' });

    // Validate the form data
    const validation = loginSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email ? fieldErrors.email[0] : '',
        password: fieldErrors.password ? fieldErrors.password[0] : '',
      });
      return;
    }

    // Submit the form data
    setIsSubmitting(true);
    try {
      const response = await request.post(`/auth/log-in`, formData);
      console.log('~ Login response:', response);
    } catch (error) {
      console.log('~ Login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'tween', stiffness: 50 }}
      className='absolute top-0 right-0 z-20 h-screen w-full bg-white shadow-md shadow-white md:max-w-1/2'
    >
      <MaxWidthContainer className='flex h-full items-center justify-center'>
        <div className='flex w-full max-w-xl flex-col gap-2'>
          <form onSubmit={handleSubmit} className='flex w-full flex-col gap-12'>
            <div className='flex flex-col gap-2'>
              <h1 className='text-3xl leading-10 font-bold text-primary'>
                Intelligent Destination and Route Recommendations for Journey
              </h1>
              <h2 className='text-secondary'>
                Welcome back! Please login to your account.
              </h2>
            </div>
            <div className='flex flex-col gap-4'>
              <FormInput
                required
                name='email'
                icon={<Mail />}
                placeholder='Email'
                error={errors.email}
                value={formData.email}
                onChange={handleChange}
                isSubmitting={isSubmitting}
              />
              <FormInput
                required
                type='password'
                name='password'
                icon={<LockKeyhole />}
                placeholder='Password'
                onChange={handleChange}
                error={errors.password}
                value={formData.password}
                isSubmitting={isSubmitting}
              />
              <Link
                href={'/forgot-password'}
                className='text-right text-sm hover:link'
              >
                Forgot password?
              </Link>
            </div>
            <motion.button
              type='submit'
              disabled={isSubmitting}
              whileTap={{ scale: 0.95 }}
              className='btn btn-primary'
              aria-disabled={isSubmitting}
            >
              Sign in
            </motion.button>
          </form>
          <div className='divider' />
          <p className='text-center'>
            Don&apos;t have account?{' '}
            <Link href='/register' className='link text-primary'>
              Register
            </Link>{' '}
            now.
          </p>
        </div>
      </MaxWidthContainer>
    </motion.div>
  );
}
