import cn from '@/utils';
import React, { Fragment, HTMLInputTypeAttribute, JSX } from 'react';

interface Props {
  name: string;
  value: string;
  error: string;
  icon?: JSX.Element;
  required?: boolean;
  placeholder?: string;
  isSubmitting?: boolean;
  type?: HTMLInputTypeAttribute;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({
  name,
  icon,
  value,
  error,
  placeholder,
  isSubmitting,
  type = 'text',
  required = false,
  onChange,
}: Props) {
  return (
    <div className='flex w-full flex-col gap-1'>
      <div className={cn('input w-full', error && 'input-error')}>
        <Fragment>{icon}</Fragment>
        <input
          type={type}
          name={name}
          value={value}
          required={required}
          onChange={onChange}
          disabled={isSubmitting}
          placeholder={placeholder}
          aria-disabled={isSubmitting}
          aria-label={`${name} input`}
        />
      </div>
      {error && (
        <span className='text-sm font-medium text-pretty text-ellipsis text-error'>
          {error}
        </span>
      )}
    </div>
  );
}
