import { useState } from 'react';
import { useAuth, useAlert } from '../context/AuthContext';
import { updatePassword, updateMe } from '../utils/api';
import { Navigate } from 'react-router-dom';

export default function Account() {
  const { user, setUser, loading } = useAuth();
  const { showAlert } = useAlert();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [photo, setPhoto] = useState(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [savingData, setSavingData] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;

  async function handleDataSubmit(e) {
    e.preventDefault();
    try {
      setSavingData(true);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      if (photo) formData.append('photo', photo);

      const data = await updateMe(formData);
      setUser(data.data.user);
      showAlert('success', 'Data updated successfully!');
    } catch (err) {
      showAlert('error', err.message);
    } finally {
      setSavingData(false);
    }
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault();
    try {
      setSavingPassword(true);
      await updatePassword(currentPassword, newPassword, newPasswordConfirm);
      showAlert('success', 'Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setNewPasswordConfirm('');
    } catch (err) {
      showAlert('error', err.message);
    } finally {
      setSavingPassword(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-8 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-12">
      {/* Sidebar */}
      <nav className="space-y-2">
        <SidenavItem href="/me" text="Settings" active />
        <SidenavItem href="/my-tours" text="My bookings" />
        <SidenavItem href="#" text="My reviews" />
        <SidenavItem href="#" text="Billing" />
        {user.role === 'admin' && (
          <div className="mt-8">
            <h5 className="text-xs font-bold uppercase text-grey-dark mb-3">Admin</h5>
            <div className="space-y-2">
              <SidenavItem href="#" text="Manage tours" />
              <SidenavItem href="#" text="Manage users" />
              <SidenavItem href="#" text="Manage reviews" />
              <SidenavItem href="#" text="Manage bookings" />
            </div>
          </div>
        )}
      </nav>

      {/* Content */}
      <div className="space-y-12">
        <div>
          <h2 className="text-xl font-bold text-green-dark uppercase mb-6">
            Your account settings
          </h2>
          <form onSubmit={handleDataSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-grey-dark mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-dark"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-grey-dark mb-2">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-dark"
              />
            </div>
            <div className="flex items-center gap-4">
              <img
                src={`/img/users/${user.photo}`}
                alt="User photo"
                className="w-16 h-16 rounded-full"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="text-sm text-grey-dark"
              />
            </div>
            <button type="submit" disabled={savingData} className="btn btn-green btn-small">
              {savingData ? 'Saving...' : 'Save settings'}
            </button>
          </form>
        </div>

        <hr className="border-gray-200" />

        <div>
          <h2 className="text-xl font-bold text-green-dark uppercase mb-6">Password change</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-grey-dark mb-2">Current password</label>
              <input
                type="password"
                minLength={8}
                required
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-dark"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-grey-dark mb-2">New password</label>
              <input
                type="password"
                minLength={8}
                required
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-dark"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-grey-dark mb-2">Confirm password</label>
              <input
                type="password"
                minLength={8}
                required
                placeholder="••••••••"
                value={newPasswordConfirm}
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-dark"
              />
            </div>
            <button type="submit" disabled={savingPassword} className="btn btn-green btn-small">
              {savingPassword ? 'Updating...' : 'Save password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function SidenavItem({ href, text, active }) {
  return (
    <a
      href={href}
      className={`block px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
        active
          ? 'bg-gradient-green text-white'
          : 'text-grey-dark hover:bg-gray-100'
      }`}
    >
      {text}
    </a>
  );
}
