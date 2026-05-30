import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, useAlert } from '../context/AuthContext';
import { getMyBookings } from '../utils/api';
import TourCard from '../components/TourCard';

export default function MyTours() {
  const { user, loading: authLoading } = useAuth();
  const { showAlert } = useAlert();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getMyBookings()
      .then((data) => {
        const bookingTours = data.data.data.map((b) => b.tour);
        setTours(bookingTours);
      })
      .catch((err) => showAlert('error', err.message))
      .finally(() => setLoading(false));
  }, [user, showAlert]);

  if (authLoading) return null;
  if (!user) return <Navigate to="/login" />;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-lg text-grey-dark">Loading your tours...</p>
      </div>
    );
  }

  if (tours.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-lg text-grey-dark">You have no bookings yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {tours.map((tour) => (
        <TourCard key={tour._id} tour={tour} />
      ))}
    </div>
  );
}
