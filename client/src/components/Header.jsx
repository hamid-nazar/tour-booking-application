import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gradient-green px-8 py-4 flex items-center justify-between">
      <nav>
        <Link to="/" className="text-white font-bold uppercase text-sm tracking-wide hover:opacity-80">
          All tours
        </Link>
      </nav>

      <div className="flex items-center">
        <img src="/img/logo-white.png" alt="Natours logo" className="h-9" />
      </div>

      <nav className="flex items-center gap-6">
        {user ? (
          <>
            <button
              onClick={logout}
              className="text-white font-bold uppercase text-sm tracking-wide hover:opacity-80"
            >
              Log out
            </button>
            <Link to="/me" className="flex items-center gap-2">
              <img
                src={`/img/users/${user.photo}`}
                alt={user.name}
                className="h-9 w-9 rounded-full"
              />
              <span className="text-white font-bold text-sm">
                {user.name.split(' ')[0]}
              </span>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-white font-bold uppercase text-sm tracking-wide hover:opacity-80"
            >
              Log in
            </Link>
            <Link
              to="#"
              className="btn btn-white btn-small"
            >
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
