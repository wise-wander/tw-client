import HomeHero from './components/HomeHero';
import HomeSearch from './components/HomeSearch';

export default function HomePage() {
  return (
    <section className='flex flex-col gap-20 select-none'>
      <HomeSearch />
      <HomeHero />
    </section>
  );
}
