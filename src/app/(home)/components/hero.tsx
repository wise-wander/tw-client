import MaxWidthContainer from '@/components/max-width-container';

const HERO_IMAGE_URL =
  'https://www.wanderlustmagazine.com/wp-content/uploads/2023/11/golden-hands-bridge-da-nang-vietnam.jpg';

export default function HomeHero() {
  return (
    <MaxWidthContainer
      className='hero my-8 min-h-[500px] rounded-lg bg-cover bg-center p-0 shadow-md'
      style={{
        backgroundImage: `url(${HERO_IMAGE_URL})`,
      }}
    >
      <div className='hero-overlay rounded-lg' />
      <div className='hero-content text-center text-neutral-content'>
        <div className='max-w-md'>
          <h1 className='mb-5 text-5xl font-bold capitalize'>
            Step into wonder
          </h1>
          <p>Explore Vietnam&apos;s attractions and Beyond!</p>
        </div>
      </div>
    </MaxWidthContainer>
  );
}
