'use client';

import MaxWidthContainer from '@/components/MaxWidthContainer';
import { motion } from 'framer-motion';
import { MapPin, Search } from 'lucide-react';
import { useState } from 'react';

export default function HomeSearch() {
  const [input, setInput] = useState<string>('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('Search for:', input);
  }

  return (
    <MaxWidthContainer className='mt-24 flex flex-col items-center justify-center gap-4'>
      <h1 className='text-center text-4xl/relaxed font-extrabold'>
        Discover the Land of Timeless Wonders
      </h1>
      <form onSubmit={handleSubmit} className='join flex w-full justify-center'>
        <label className='input join-item w-full max-w-3xl'>
          <MapPin />
          <input
            type='text'
            name='search'
            value={input}
            aria-required
            className='input-accent'
            onChange={(e) => setInput(e.target.value)}
            placeholder='Places to go, things to do, hotels...'
          />
        </label>
        <motion.button
          type='submit'
          aria-label='Search'
          whileTap={{ scale: 0.95 }}
          className='btn join-item btn-primary'
        >
          <Search size={16} />
        </motion.button>
      </form>
    </MaxWidthContainer>
  );
}
