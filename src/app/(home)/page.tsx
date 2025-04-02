import HomeHero from './components/hero';
import HomeSearch from './components/search';

export default function Home() {
  return (
    <section className='flex flex-col'>
      <HomeSearch />
      <HomeHero />
    </section>
  );
}
