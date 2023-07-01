import axios, { CancelToken } from "axios";
import { BuyTicket, Ticket } from "../../dto";

export class Tickets {
    static async buy(ticket: Ticket, userId: string, token?: CancelToken): Promise<BuyTicket | null> {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/tickets/createTicket",
                {
                    cancelToken: token,
                    type: ticket.name,
                    userId: userId,
                    allowedSpaces: ticket.allowedSpaces,
                    escapeGameOrder: ticket.escapeGameOrder,
                },
            );
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async getTickets(userId: string, token?: CancelToken): Promise<Ticket[] | null> {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/tickets/getTickets",
                {
                    cancelToken: token,
                    params: {
                        userId: userId,
                    },
                },
            );
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}