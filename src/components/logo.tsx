import { DraftingCompass } from 'lucide-react';

export default function Logo() {
  return (
    <div className='flex h-10 flex-row items-center space-x-2'>
      <DraftingCompass size={28} />
      <span className='text-2xl font-bold tracking-wide'>TripWise</span>
    </div>
  );
}
