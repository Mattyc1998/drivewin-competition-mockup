import { Link } from 'react-router-dom';

const social = ['Facebook', 'Instagram', 'TikTok', 'X'];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-900">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950 font-black">
                D
              </span>
              <span className="text-base font-extrabold text-white">
                Drive<span className="text-gold-400">Win</span>
              </span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              The UK's newest car and motorbike competition site. Life-changing prizes, for the
              price of a coffee.
            </p>
            <div className="flex gap-3 mt-5">
              {social.map((s) => (
                <a
                  key={s}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label={s}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 hover:text-white hover:border-white/30 transition-colors text-xs font-semibold"
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            title="Explore"
            links={[
              ['Home', '/'],
              ['Competitions', '/competitions'],
              ['How It Works', '/how-it-works'],
              ['Winners', '/winners'],
              ['My Tickets', '/my-tickets'],
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              ['Terms & Conditions', '#'],
              ['Privacy Policy', '#'],
              ['Responsible Play', '#'],
              ['Contact Us', '#'],
              ['Free Postal Entry', '#'],
            ]}
          />
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">18+ Only</h4>
            <p className="text-sm text-white/50 leading-relaxed">
              You must be 18 or over to enter. Please play responsibly. This is a skill-based
              competition, not a lottery.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © 2026 DriveWin Ltd (placeholder). All rights reserved. This is a concept demo — not a
            live service.
          </p>
          <p className="text-xs text-white/40">Company No. 00000000 · Registered in England & Wales</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map(([label, to]) => (
          <li key={label}>
            {to.startsWith('/') ? (
              <Link to={to} className="text-sm text-white/50 hover:text-white transition-colors">
                {label}
              </Link>
            ) : (
              <a
                href={to}
                onClick={(e) => e.preventDefault()}
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                {label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
