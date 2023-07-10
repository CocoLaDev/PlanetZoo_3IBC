import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./loginForm";
import Register from "./registerForm";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  return (
    <header className="bg-white">
      <div
        className="mx-auto flex h-[10vh] max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8"
      >
        <a className="block text-teal-600" href="/">
          <span className="sr-only">Home</span>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Planet_Zoo_Logo.png/1280px-Planet_Zoo_Logo.png" alt="Logo" className="h-8 w-auto" />
        </a>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link to='/'
                  className="text-gray-500 transition hover:text-gray-500/75">
                  Home
                </Link>
              </li>
              <li>
                <Link to='/Tickets'
                  className="text-gray-500 transition hover:text-gray-500/75">
                  Tickets
                </Link>
              </li>
              <li>
                <Link to='/Visit'
                  className="text-gray-500 transition hover:text-gray-500/75">
                  Visit
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {localStorage.getItem("token") ?
              <div className="sm:flex sm:gap-4">
                <Link to='/profile'
                  className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                >
                  Profile
                </Link>

                <button
                  className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
                  onClick={() => {
                    localStorage.removeItem("token")
                    localStorage.removeItem("userId")
                  }
                  }
                >
                  Logout
                </button>
              </div>
              :
              <div className="sm:flex sm:gap-4">
                <button
                  className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>

                <button
                  className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
                  onClick={() => setIsRegister(true)}
                >
                  Register
                </button>
              </div>
            }


            <button
              className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isLogin &&
        <div className="fixed bg-black/40 -mt-[10vh] h-[100vh] w-screen p-12 z-50">
          <Login setIsRegister={setIsRegister} setIsLogin={setIsLogin} setIsAdmin={setIsAdmin} />
        </div>
      }
      {isRegister &&
        <div className="fixed bg-black/40 -mt-[10vh] h-[100vh] w-screen p-12 z-50">
          <Register setIsRegister={setIsRegister} setIsLogin={setIsLogin} />
        </div>
      }
    </header>
  )
}

export default Navbar;