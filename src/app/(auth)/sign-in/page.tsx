'use client';

import request from '@/api';
import { AUTH_ROUTES } from '@/api/constants';
import AppLogo from '@/components/AppLogo';
import FormInput from '@/components/FormInput';
import MaxWidthContainer from '@/components/MaxWidthContainer';
import { IResponse } from '@/interfaces/IResponse';
import { motion } from 'framer-motion';
import { Mail, RectangleEllipsis } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import toast from 'react-hot-toast';
import { initSignInForm, ISignInForm, signInSchema } from './schema';

export default function SignInPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<ISignInForm>(initSignInForm);
  const [errors, setErrors] = useState<ISignInForm>(initSignInForm);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors(initSignInForm);

    // Validate the form data
    const validation = signInSchema.safeParse(formData);
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
      const response = await request.post<IResponse<null>>(
        AUTH_ROUTES.SIGN_IN,
        formData,
      );
      if (response.data.status === 200) {
        toast.success(response.data.message);
        router.push('/');
      } else {
        toast.error(response.data.message);
      }
    } catch {
      toast.error('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <MaxWidthContainer className='flex h-full items-center justify-center'>
      <div className='flex w-full max-w-md flex-col gap-4'>
        <Link href='/' passHref>
          <AppLogo />
        </Link>
        <form onSubmit={handleSubmit} className='flex w-full flex-col gap-10'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-3xl leading-10 font-bold text-primary'>
              Intelligent Destination and Route Recommendations for Journey
            </h1>
            <h2 className='text-secondary'>
              Welcome back! Please sign in to your account.
            </h2>
          </div>
          <div className='flex flex-col gap-2'>
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
              icon={<RectangleEllipsis />}
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
          <Fragment>Don&apos;t have account?</Fragment>
          <Link href='/sign-up' className='mx-1 link text-primary'>
            Sign up
          </Link>
          <Fragment>now.</Fragment>
        </p>
      </div>
    </MaxWidthContainer>
  );
}
