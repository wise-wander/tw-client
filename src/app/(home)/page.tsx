import HomeHero from './components/HomeHero';
import HomeSearch from './components/HomeSearch';

export default function HomePage() {
  return (
    <section className='flex flex-col'>
      <HomeSearch />
      <HomeHero />
    </section>
  );
}
