import { Link } from 'react-router-dom';

export default function TourCard({ tour }) {
  const date = new Date(tour.startDates[0]).toLocaleString('en-us', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-green opacity-70 z-10" />
        <img
          src={`/img/tours/${tour.imageCover}`}
          alt={tour.name}
          className="w-full h-52 object-cover"
        />
        <h3 className="absolute bottom-4 right-4 z-20 text-white text-xl font-bold uppercase text-right">
          <span className="bg-gradient-green px-3 py-1 leading-relaxed box-decoration-clone">
            {tour.name}
          </span>
        </h3>
      </div>

      <div className="p-6 space-y-4">
        <h4 className="text-sm font-bold uppercase text-grey-dark">
          {tour.difficulty} {tour.duration}-day tour
        </h4>
        <p className="text-sm text-grey-dark italic leading-relaxed">{tour.summary}</p>

        <div className="grid grid-cols-2 gap-3 text-sm text-grey-dark">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-dark fill-current"><use href="/img/icons.svg#icon-map-pin" /></svg>
            <span>{tour.startLocation.description}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-dark fill-current"><use href="/img/icons.svg#icon-calendar" /></svg>
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-dark fill-current"><use href="/img/icons.svg#icon-flag" /></svg>
            <span>{tour.locations.length} stops</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-dark fill-current"><use href="/img/icons.svg#icon-user" /></svg>
            <span>{tour.maxGroupSize} people</span>
          </div>
        </div>
      </div>

      <div className="bg-[#f7f7f7] px-6 py-4 flex items-center justify-between border-t">
        <div>
          <span className="font-bold text-grey-dark">${tour.price}</span>{' '}
          <span className="text-sm text-grey-dark">per person</span>
        </div>
        <div>
          <span className="font-bold text-grey-dark">{tour.ratingsAverage}</span>{' '}
          <span className="text-sm text-grey-dark">rating ({tour.ratingsQuantity})</span>
        </div>
        <Link to={`/tour/${tour.slug}`} className="btn btn-green btn-small">
          Details
        </Link>
      </div>
    </div>
  );
}
