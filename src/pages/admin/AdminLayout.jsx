import { Link, NavLink, Outlet } from 'react-router-dom';

const links = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/new', label: 'Create Competition' },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-navy-950">
      <header className="border-b border-white/10 bg-navy-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link to="/admin" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950 font-black">
                D
              </span>
              <span className="text-base font-extrabold text-white">
                Drive<span className="text-gold-400">Win</span>{' '}
                <span className="text-white/40 font-medium">Admin</span>
              </span>
            </Link>
            <nav className="hidden sm:flex items-center gap-5">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) =>
                    `text-sm font-medium ${isActive ? 'text-gold-400' : 'text-white/60 hover:text-white'}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <Link to="/" className="text-sm font-medium text-white/50 hover:text-white">
            ← Back to public site
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
