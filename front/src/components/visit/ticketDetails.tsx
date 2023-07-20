import { Ticket } from "../../dto";

interface TicketDetailsProps {
    ticket: Ticket | undefined;
}

const TicketDetails = ({ ticket }: TicketDetailsProps) => {
    return (
        <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-1 w-full h-[84%]">
            <p className="text-gray-400 text-xs w-full text-right">until {ticket?.validUntil?.toString() || "..."}</p>
            {ticket?.escapeGameOrder && ticket?.escapeGameOrder.length > 0 &&
                <p className="text-red-400 text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="inline align-middle mr-1" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>predefined visiting direction
                </p>
            }
            <p className="font-bold text-2xl py-2">{ticket?.type}</p>
            <p className="text-gray-500">Spaces allowed :</p>
            {ticket?.allowedSpaces.map((space, index) => (
                <div className="flex gap-1" key={index}>
                    <p className="text-gray-400 text-sm"> - </p>
                    <p className="text-gray-400 text-sm">{space}</p>
                </div>
            ))}
        </div>
    );
};

export default TicketDetails;