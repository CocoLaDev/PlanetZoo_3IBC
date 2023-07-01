import { useParams } from "react-router-dom";
import { ticketsArray } from "../../dto/tickets/tickets";
import { Tickets } from "../../services";
import { useEffect, useState } from "react";

const Ticket = () => {

    const { index } = useParams();
    const [ticketBuy, setTicketBuy] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        if (ticketBuy === true) {
            setTimeout(() => {
                setTicketBuy(false);
            }, 2000);
        }
    }, [ticketBuy]);

    return (
        <section>
            {index &&
                <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
                        <div className="relative z-10 lg:py-16">
                            <div className="relative h-64 sm:h-80 lg:h-full">
                                <img
                                    alt="House"
                                    src={ticketsArray[parseInt(index)].image}
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="relative flex items-center bg-gray-100 w-full">
                            <span
                                className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-gray-100"
                            ></span>

                            <div className="p-8 sm:p-16 lg:p-24 w-full">
                                <h2 className="text-2xl font-bold sm:text-3xl">
                                    {ticketsArray[parseInt(index)].name}
                                </h2>

                                <p className="mt-4 text-gray-600 text-justify">
                                    {ticketsArray[parseInt(index)].descriptionLong}
                                </p>


                                <div className="w-full">
                                    <ol
                                        className="flex w-full divide-x divide-gray-100 no-scrollbar overflow-y-scroll rounded-lg border border-gray-100 text-sm text-gray-500 mt-4"
                                    >
                                        {ticketsArray[parseInt(index)].allowedSpaces.map((allowedSpace, i) => (
                                            i % 2 === 0 ?
                                                <li key={i} className="relative flex items-center justify-center gap-2 bg-gray-50 p-3">
                                                    {i > 0 &&
                                                        <span
                                                            className="absolute -left-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 border border-gray-100 ltborder-b-0 border-s-0 bg-gray-200 sm:block"
                                                        >
                                                        </span>
                                                    }

                                                    <svg
                                                        className="h-7 w-7 shrink-0"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                    </svg>

                                                    <p className="leading-none">
                                                        <strong className="block font-medium"> {allowedSpace} </strong>
                                                    </p>
                                                </li>
                                                :
                                                <li key={i} className="relative flex items-center justify-center gap-2 p-3 bg-gray-200">
                                                    <span
                                                        className="absolute -left-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 border border-gray-100 border-e-0 border-t-0 bg-gray-50 sm:block"
                                                    >
                                                    </span>
                                                    <svg
                                                        className="h-7 w-7 shrink-0"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                    </svg>

                                                    <p className="leading-none">
                                                        <strong className="block font-medium"> {allowedSpace} </strong>
                                                    </p>
                                                </li>
                                        ))}
                                    </ol>
                                </div>
                                <p className="my-4 text-red-600 text-justify">{errorMessage}</p>
                                <div className="flex items-center gap-4">
                                    <button
                                        className="inline-block rounded border border-teal-600 bg-teal-600 px-12 py-3 font-bold text-white hover:bg-transparent hover:text-teal-600 focus:outline-none focus:ring active:text-teal-500"
                                        disabled={ticketBuy}
                                        onClick={async () => {
                                            setErrorMessage("");
                                            const data = await Tickets.buy(ticketsArray[parseInt(index)], "649db96b5f877c7ecc3fac4c");
                                            if (data?.message) {
                                                setTicketBuy(true);
                                            } else {
                                                setErrorMessage("An error occured, please try again later");
                                            }
                                        }}
                                    >
                                        {!ticketBuy ? "Buy" : "Ticket bought !"}
                                    </button>
                                    <p className="inline-block text-xl font-bold text-gray-600">
                                        {ticketsArray[parseInt(index)].price}€
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </section>
    );
}

export default Ticket;