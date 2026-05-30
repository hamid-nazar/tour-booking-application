export default function Alert({ type, message }) {
  const bgColor = type === 'success' ? 'bg-green-dark' : 'bg-red-500';

  return (
    <div
      className={`fixed top-0 left-0 w-full z-[9999] py-4 px-8 text-center text-white text-lg font-semibold ${bgColor}`}
    >
      {message}
    </div>
  );
}
