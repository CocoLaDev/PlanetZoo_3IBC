import { useEffect, useState } from "react";
import { useUserContext } from "../../utils/user.context";
import axios from "axios";
import { Tickets } from "../../services";
import { Ticket } from "../../dto";

interface TicketsParams {
    setTicketChoosed: React.Dispatch<React.SetStateAction<Ticket | undefined>>;
}

const TicketsList = ({ setTicketChoosed }: TicketsParams) => {

    const { data } = useUserContext().user;
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        async function getTickets() {
            if (data) {
                const response = await Tickets.getTicketByUserId(data._id, cancelTokenSource.token);
                console.log(response);
                if (response) {
                    setTickets(response);
                }
            }
        }
        const cancelTokenSource = axios.CancelToken.source();
        getTickets();
        return () => cancelTokenSource.cancel();
    }, [data]);

    return (
        <div className="overflow-y-scroll h-[calc(55vh-60px)] flex gap-2 flex-wrap justify-center">
            {tickets.map((ticket, index) => (
                <div key={index} className="p-4 bg-white border rounded-xl text-gray-800 space-y-1 w-[49%] hover:border-teal-600 cursor-pointer" onClick={() => setTicketChoosed(ticket)}>
                    <div className="flex justify-between">
                        <p className="text-teal-600 text-xs">until {ticket.validUntil?.toString() || "..."}</p>
                        {ticket.escapeGameOrder && ticket.escapeGameOrder.length > 0 &&
                            <p className="text-red-400 text-xs">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="inline align-middle mr-1" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                </svg>predefined visiting direction
                            </p>
                        }
                    </div>
                    <p className="font-bold">{ticket.type}</p>
                    <p className="text-gray-500 text-xs">Spaces allowed :</p>
                    <div className="flex flex-wrap gap-1">
                        {ticket.allowedSpaces.map((space, index) => (
                            <div className="flex gap-1" key={index}>
                                {index > 0 &&
                                    <p className="text-gray-400 text-xs"> - </p>
                                }
                                <p className="text-gray-400 text-xs">{space}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TicketsList;