import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useAlert } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setSubmitting(true);
      await login(email, password);
      navigate('/');
    } catch (err) {
      showAlert('error', err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-md mx-auto py-16 px-8">
      <h2 className="text-2xl font-bold text-green-dark uppercase mb-8 text-center">
        Log into your account
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-grey-dark mb-2">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-dark focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-bold text-grey-dark mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-dark focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full btn btn-green"
        >
          {submitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
