import { useEffect, useState } from "react";
import { Ticket, User } from "../../dto";
import { Tickets, Users } from "../../services/";
import { useUserContext } from "../../utils/user.context";
import axios from "axios";

const Profile = () => {
    const { data } = useUserContext().user;

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [passwordUpdated, setPasswordUpdated] = useState<boolean>(false);
    const [tickets, setTickets] = useState<Ticket[]>([]);


    useEffect(() => {
        if (passwordUpdated) {
            setTimeout(() => {
                setPasswordUpdated(false);
            }, 3000);
        }
    }, [passwordUpdated]);

    useEffect(() => {
        async function getTickets() {
            if (!data) return;
            console.log("ok");
            const response = await Tickets.getTicketByUserId(data._id, cancelTokenSource.token);
            console.log(response);
            if (response) {
                setTickets(response);
            }
        }
        const cancelTokenSource = axios.CancelToken.source();
        getTickets();
        return () => cancelTokenSource.cancel();
    }, []);

    return (
        <div className="px-6 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl p-8 mb-5">
                    <h1 className="text-3xl font-bold">Profile</h1>

                    <hr className="my-4" />
                    <div className="grid grid-cols-2 gap-x-20 pt-4">
                        <div className="h-[55vh] flex flex-col justify-around">
                            <h2 className="text-2xl font-bold mb-4">Personnals informations</h2>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <div className="p-4 bg-violet-100 rounded-xl text-gray-800">
                                        <p className="font-bold text-xl leading-none">Username</p>
                                        <p className="mt-2">{data?.username}</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-orange-100 rounded-xl text-gray-800">
                                    <p className="font-bold text-2xl leading-none">4</p>
                                    <p className="mt-2">Tickets available</p>
                                </div>
                                <div className="p-4 bg-orange-100 rounded-xl text-gray-800">
                                    <p className="font-bold text-2xl leading-none">5</p>
                                    <p className="mt-2">Tickets bought</p>
                                </div>
                                <div className="col-span-2">
                                    <div className="p-4 bg-teal-100 rounded-xl">
                                        <p className="font-bold text-xl text-gray-800 leading-none w-2/3">Need to change your password ?</p>
                                        <p className="mt-3 text-sm italic text-red-600">{errorMessage}</p>
                                        <form className="mt-2"
                                            onSubmit={async (e) => {
                                                e.preventDefault();
                                                setErrorMessage("");
                                                const password = (document.getElementById("Password") as HTMLInputElement).value;
                                                if (!password) {
                                                    setErrorMessage("Password is required");
                                                    return;
                                                }
                                                if (!data) {
                                                    setErrorMessage("User not found");
                                                    return;
                                                }
                                                const user: User = {
                                                    ...data,
                                                    password
                                                }
                                                const response = await Users.update(user);
                                                if (response) {
                                                    setPasswordUpdated(true);
                                                } else {
                                                    setErrorMessage("Error while updating password");
                                                }
                                            }}>
                                            <input type="password" id="Password" required className="rounded-xl border p-2 mr-2 text-sm focus:outline-none focus:border-teal-500 transition" placeholder="New password" />
                                            <button type="submit" className="inline-flex items-center justify-center py-2 px-3 rounded-xl bg-white text-gray-800 hover:text-teal-500 text-sm font-semibold transition">
                                                {passwordUpdated ? "Updated !" : "Reset password"}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Your tickets available</h2>

                            <div className="space-y-4 overflow-scroll h-[calc(55vh-50px)]">
                                {tickets.map((ticket, index) => (
                                    <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-1">
                                        <div className="flex justify-between">
                                            <p className="text-gray-400 text-xs">until {ticket.validUntil?.toString() || "..."}</p>
                                            {ticket.escapeGameOrder && ticket.escapeGameOrder.length > 0 &&
                                                <p className="text-red-400 text-xs">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="inline align-middle mr-1" viewBox="0 0 16 16">
                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                    </svg>predefined visiting direction
                                                </p>
                                            }
                                        </div>
                                        <p className="font-bold">{ticket.type}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile