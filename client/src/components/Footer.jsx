export default function Footer() {
  return (
    <footer className="bg-[#f7f7f7] py-12 px-8 flex flex-col items-center gap-4 border-t border-gray-200">
      <div>
        <img src="/img/logo-green.png" alt="Natours logo" className="h-12" />
      </div>
      <ul className="flex gap-6 text-sm">
        <li><a href="#" className="text-grey-dark hover:text-green-dark transition-colors">About us</a></li>
        <li><a href="#" className="text-grey-dark hover:text-green-dark transition-colors">Download apps</a></li>
        <li><a href="#" className="text-grey-dark hover:text-green-dark transition-colors">Become a guide</a></li>
        <li><a href="#" className="text-grey-dark hover:text-green-dark transition-colors">Careers</a></li>
        <li><a href="#" className="text-grey-dark hover:text-green-dark transition-colors">Contact</a></li>
      </ul>
      <p className="text-grey-dark text-sm">
        &copy; {new Date().getFullYear()} by Hamid Nazari.
      </p>
    </footer>
  );
}
