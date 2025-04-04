import HomeImage from '@/assets/HomeImage.jpg';
import MaxWidthContainer from '@/components/MaxWidthContainer';
import Image from 'next/image';

export default function HomeHero() {
  return (
    <MaxWidthContainer className='h-80 w-full md:h-96 lg:h-[32rem]'>
      <div className='relative h-full w-full overflow-hidden rounded-box'>
        <Image
          fill
          priority
          src={HomeImage}
          alt="Da Nang's Golden Bridge"
          className='object-cover object-center'
        />
        <div className='absolute top-0 left-0 z-10 h-full w-full bg-neutral/50' />
        <div className='absolute z-20 flex h-full w-full items-center justify-center text-neutral-content'>
          <div className='max-w-lg text-center'>
            <h1 className='text-6xl/relaxed font-bold capitalize'>
              Step into wonder
            </h1>
            <p className='text-xl'>
              Explore Vietnam&apos;s attractions and Beyond!
            </p>
          </div>
        </div>
      </div>
    </MaxWidthContainer>
  );
}
