import Layout from '../components/Layout.jsx';
import WinnerCard from '../components/WinnerCard.jsx';
import { useAllWinners } from '../store/AppContext.jsx';

export default function Winners() {
  const winners = useAllWinners();

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Our Winners</h1>
        <p className="mt-3 text-white/55 max-w-2xl mx-auto">
          Every winner is real, every draw is filmed live. Here's who's driven away happy so far.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {winners.map((w) => (
            <WinnerCard key={w.id} winner={w} large />
          ))}
        </div>
      </section>
    </Layout>
  );
}
