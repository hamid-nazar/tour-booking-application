import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTour, getCheckoutSession } from '../utils/api';
import { useAuth, useAlert } from '../context/AuthContext';
import { loadStripe } from '@stripe/stripe-js';
import Map from '../components/Map';
import ReviewCard from '../components/ReviewCard';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

export default function Tour() {
  const { slug } = useParams();
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    getTour(slug)
      .then((data) => setTour(data.data.data[0]))
      .catch((err) => showAlert('error', err.message))
      .finally(() => setLoading(false));
  }, [slug, showAlert]);

  async function handleBooking() {
    try {
      setBooking(true);
      const data = await getCheckoutSession(tour._id);
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.session.id });
    } catch (err) {
      showAlert('error', err.message);
    } finally {
      setBooking(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-lg text-grey-dark">Loading tour...</p>
      </div>
    );
  }

  if (!tour) return null;

  const date = new Date(tour.startDates[0]).toLocaleString('en-us', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[85vh]">
        <div className="absolute inset-0 bg-gradient-green opacity-70 z-10" />
        <img
          src={`/img/tours/${tour.imageCover}`}
          alt={tour.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center">
          <h1 className="text-white text-5xl font-light uppercase tracking-wider mb-6">
            <span className="bg-gradient-green px-4 py-2 leading-loose box-decoration-clone">
              {tour.name} tour
            </span>
          </h1>
          <div className="flex gap-8 text-white text-lg">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 fill-current"><use href="/img/icons.svg#icon-clock" /></svg>
              <span>{tour.duration} days</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 fill-current"><use href="/img/icons.svg#icon-map-pin" /></svg>
              <span>{tour.startLocation.description}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="max-w-5xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-green-dark uppercase mb-6">Quick facts</h2>
            <div className="space-y-3">
              <OverviewBox icon="calendar" label="Next date" text={date} />
              <OverviewBox icon="trending-up" label="Difficulty" text={tour.difficulty} />
              <OverviewBox icon="user" label="Participants" text={`${tour.maxGroupSize} people`} />
              <OverviewBox icon="star" label="Rating" text={`${tour.ratingsAverage} / 5`} />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-green-dark uppercase mb-6">Your tour guides</h2>
            <div className="space-y-4">
              {tour.guides.map((guide) => (
                <div key={guide._id} className="flex items-center gap-3">
                  <img
                    src={`/img/users/${guide.photo}`}
                    alt={guide.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-xs font-bold uppercase text-green-dark">
                    {guide.role === 'lead-guide' ? 'Lead guide' : 'Tour guide'}
                  </span>
                  <span className="text-sm text-grey-dark">{guide.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-green-dark uppercase mb-6">
            About {tour.name} tour
          </h2>
          {tour.description.split('\n').map((p, i) => (
            <p key={i} className="text-grey-dark leading-relaxed mb-4">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Pictures Section */}
      <section className="grid grid-cols-3">
        {tour.images.map((img, i) => (
          <div key={i} className="overflow-hidden">
            <img
              src={`/img/tours/${img}`}
              alt={`${tour.name} ${i + 1}`}
              className="w-full h-64 object-cover transition-transform hover:scale-105"
            />
          </div>
        ))}
      </section>

      {/* Map Section */}
      <section>
        <Map locations={tour.locations} />
      </section>

      {/* Reviews Section */}
      <section className="bg-[#f7f7f7] py-16">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-2xl font-bold text-green-dark uppercase text-center mb-10">
            Reviews
          </h2>
          <div className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory">
            {tour.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-green">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold uppercase mb-4">What are you waiting for?</h2>
          <p className="text-lg mb-8">
            {tour.duration} days. 1 adventure. Infinite memories. Make it yours today!
          </p>
          {user ? (
            <button
              onClick={handleBooking}
              disabled={booking}
              className="btn bg-white text-green-dark hover:bg-gray-100"
            >
              {booking ? 'Processing...' : 'Book tour now!'}
            </button>
          ) : (
            <a href="/login" className="btn bg-white text-green-dark hover:bg-gray-100">
              Log in to book tour
            </a>
          )}
        </div>
      </section>
    </>
  );
}

function OverviewBox({ icon, label, text }) {
  return (
    <div className="flex items-center gap-3">
      <svg className="w-5 h-5 text-green-dark fill-current">
        <use href={`/img/icons.svg#icon-${icon}`} />
      </svg>
      <span className="text-xs font-bold uppercase text-grey-dark">{label}</span>
      <span className="text-sm text-grey-dark">{text}</span>
    </div>
  );
}
