import { useState, useEffect } from 'react';
import { getAllTours } from '../utils/api';
import TourCard from '../components/TourCard';

export default function Overview() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    getAllTours()
      .then((data) => setTours(data.data.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-lg text-grey-dark">Loading tours...</p>
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
