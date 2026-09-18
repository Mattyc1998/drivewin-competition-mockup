import Header from './Header.jsx';
import Footer from './Footer.jsx';

// Placeholder for future legal/compliance work: an 18+ age-verification gate
// (and a "free postal entry" route as required by UK skill-competition law)
// would be wired in here before rendering the main app in a production build.

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-navy-950">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
