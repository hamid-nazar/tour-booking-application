export default function ReviewCard({ review }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center text-center min-w-[300px] snap-center">
      <div className="flex flex-col items-center mb-4">
        <img
          src={`/img/users/${review.user.photo}`}
          alt={review.user.name}
          className="w-12 h-12 rounded-full mb-2"
        />
        <h6 className="text-xs font-bold uppercase text-grey-dark">
          {review.user.name}
        </h6>
      </div>
      <p className="text-sm text-grey-dark italic mb-4 leading-relaxed">
        {review.review}
      </p>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${
              review.rating >= star ? 'text-green-dark' : 'text-gray-300'
            } fill-current`}
          >
            <use href="/img/icons.svg#icon-star" />
          </svg>
        ))}
      </div>
    </div>
  );
}
