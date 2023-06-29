import React from "react";
import { Auth } from "../../services";
import { UserRole } from "../../dto";

interface ComponentProps {
    setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register = ({ setIsRegister, setIsLogin }: ComponentProps) => {

    const [errorMessage, setErrorMessage] = React.useState<string>("");
    const [resgistred, setResgistred] = React.useState<boolean>(false);

    return (
        <div className="relative lg:grid lg:min-h-full lg:grid-cols-12 bg-white">
            <button className="absolute left-3 top-3 w-4 h-4" onClick={() => setIsRegister(false)}>
                <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 490 490">
                    <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337 " />
                </svg>
            </button>
            <aside
                className="relative lg:block hidden lg:order-last lg:col-span-5 lg:h-full xl:col-span-6"
            >
                <img
                    alt="Pattern"
                    src="https://assets-prd.ignimgs.com/2022/03/09/planetzoo-1646788240786.jpg"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </aside>
            <aside
                className="relative block h-32 lg:hidden"
            >
                <img
                    alt="Pattern"
                    src="https://www.gamepressure.com/i/h/4/515016281.jpg"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </aside>

            <main
                className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
            >
                <div className="max-w-xl lg:max-w-3xl">
                    <h1
                        className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
                    >
                        Welcome to Planet Zoo !
                    </h1>

                    <p className="mt-4 leading-relaxed text-gray-500 text-justify">
                        Immerse yourself in a unique wild world and encounter fascinating animals by signing up now on Planet Zoo!
                    </p>

                    <form action="#" className="mt-8 grid grid-cols-6 gap-6"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setErrorMessage("");
                            const pseudo = (document.getElementById("pseudo") as HTMLInputElement).value;
                            const password = (document.getElementById("Password") as HTMLInputElement).value;
                            const password_confirmation = (document.getElementById("PasswordConfirmation") as HTMLInputElement).value;

                            if (password !== password_confirmation) {
                                setErrorMessage("Passwords are not the same");
                                return;
                            }
                            if (!pseudo || !password || !password_confirmation) {
                                setErrorMessage("Please fill all fields");
                                return;
                            }
                            const data = await Auth.register(pseudo, password, UserRole.visitor);
                            if (data) {
                                setResgistred(true);
                            } else {
                                setErrorMessage("An error occured");
                            }
                        }}
                    >
                        <div className="col-span-6">
                            <label
                                className="block text-sm font-medium text-gray-700"
                            >
                                Pseudo
                            </label>

                            <input
                                type="text"
                                id="pseudo"
                                name="pseudo"
                                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>

                            <input
                                type="password"
                                id="Password"
                                name="password"
                                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password Confirmation
                            </label>

                            <input
                                type="password"
                                id="PasswordConfirmation"
                                name="password_confirmation"
                                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                            />
                        </div>

                        <p className="text-sm text-red-500 col-span-6 sm:col-span-3">
                            {errorMessage}
                        </p>
                        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                            <button
                                className="inline-block shrink-0 rounded-md border bg-teal-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-teal-600 focus:outline-none focus:ring"
                            >
                                {resgistred ? "Registered !" : "Create an account"}
                            </button>

                            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                {resgistred ? "You can now " : "Already have an account? "}
                                <button
                                    onClick={() => { setIsRegister(false); setIsLogin(true); }}
                                    className="text-gray-700 underline">
                                    Log in
                                </button>.
                            </p>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Register;