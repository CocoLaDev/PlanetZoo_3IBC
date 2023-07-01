import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <section
      className="relative bg-[url(https://cms-cdn.zaonce.net/2021-06/PZ_Africa_Pack_Key_Art_%28middled%29_1920x1080.jpg)] bg-cover bg-center bg-no-repeat"
    >
      <div
        className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 sm:bg-gradient-to-r"
      ></div>

      <div
        className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
      >
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Welcome to the World of

            <strong className="block font-extrabold text-teal-700">
              Planet Zoo!
            </strong>
          </h1>

          <p className="mt-4 max-w-lg sm:text-xl/relaxed">
            Discover captivating wildlife and extraordinary species at our zoo.
            Join us in celebrating the beauty and diversity of our planet's creatures.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-center">
            <Link
              to="/Tickets"
              className="block w-full rounded bg-teal-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-teal-700 focus:outline-none focus:ring active:bg-teal-500 sm:w-auto"
            >
              Buy tickets
            </Link>

            <Link
              to="/visit"
              className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-teal-600 shadow hover:text-teal-700 focus:outline-none focus:ring active:text-teal-500 sm:w-auto"
            >
              Visit the zoo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
