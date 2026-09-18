import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Competitions from './pages/Competitions.jsx';
import CompetitionDetail from './pages/CompetitionDetail.jsx';
import Checkout from './pages/Checkout.jsx';
import Confirmation from './pages/Confirmation.jsx';
import MyTickets from './pages/MyTickets.jsx';
import HowItWorks from './pages/HowItWorks.jsx';
import Winners from './pages/Winners.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminCreateCompetition from './pages/admin/AdminCreateCompetition.jsx';
import AdminCompetitionDetail from './pages/admin/AdminCompetitionDetail.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/competitions" element={<Competitions />} />
      <Route path="/competitions/:slug" element={<CompetitionDetail />} />
      <Route path="/checkout/:slug" element={<Checkout />} />
      <Route path="/confirmation/:slug" element={<Confirmation />} />
      <Route path="/my-tickets" element={<MyTickets />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/winners" element={<Winners />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="new" element={<AdminCreateCompetition />} />
        <Route path="competitions/:id" element={<AdminCompetitionDetail />} />
      </Route>

      <Route path="*" element={<Home />} />
    </Routes>
    </>
  );
}
