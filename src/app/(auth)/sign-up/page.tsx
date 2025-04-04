'use client';

import request from '@/api';
import { AUTH_ROUTES } from '@/api/constants';
import AppLogo from '@/components/AppLogo';
import FormInput from '@/components/FormInput';
import MaxWidthContainer from '@/components/MaxWidthContainer';
import { motion } from 'framer-motion';
import { Mail, RectangleEllipsis, User } from 'lucide-react';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';
import { initSignUpForm, ISignUpForm, signUpSchema } from './schema';

export default function SignUpPage() {
  const [formData, setFormData] = useState<ISignUpForm>(initSignUpForm);
  const [errors, setErrors] = useState<ISignUpForm>(initSignUpForm);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors(initSignUpForm);

    // Validate the form data
    const validation = signUpSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name ? fieldErrors.name[0] : '',
        email: fieldErrors.email ? fieldErrors.email[0] : '',
        password: fieldErrors.password ? fieldErrors.password[0] : '',
        passwordConfirmation: fieldErrors.passwordConfirmation
          ? fieldErrors.passwordConfirmation[0]
          : '',
      });
      return;
    }

    // Submit the form data
    setIsSubmitting(true);
    try {
      const response = await request.post(AUTH_ROUTES.SIGN_UP, formData);
      console.log('~ Sign up response:', response);
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
              Create your account to explore personalized travel
              recommendations.
            </h2>
          </div>
          <div className='flex flex-col gap-2'>
            <FormInput
              required
              name='name'
              icon={<User size={16} />}
              placeholder='Full name'
              error={errors.name}
              value={formData.name}
              onChange={handleChange}
              isSubmitting={isSubmitting}
            />
            <FormInput
              required
              name='email'
              icon={<Mail size={16} />}
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
              icon={<RectangleEllipsis size={16} />}
              placeholder='Password'
              onChange={handleChange}
              error={errors.password}
              value={formData.password}
              isSubmitting={isSubmitting}
            />
            <FormInput
              required
              type='password'
              name='passwordConfirmation'
              icon={<RectangleEllipsis size={16} />}
              placeholder='Confirm password'
              onChange={handleChange}
              error={errors.passwordConfirmation}
              value={formData.passwordConfirmation}
              isSubmitting={isSubmitting}
            />
          </div>
          <motion.button
            type='submit'
            disabled={isSubmitting}
            whileTap={{ scale: 0.95 }}
            className='btn btn-primary'
            aria-disabled={isSubmitting}
          >
            Sign up
          </motion.button>
        </form>
        <div className='divider' />
        <p className='text-center'>
          Already have an account?{' '}
          <Link href='/log-in' className='link text-primary'>
            Sign in
          </Link>
        </p>
      </div>
    </MaxWidthContainer>
  );
}
