import axios, { CancelToken } from "axios";
import { BuyTicket, Ticket } from "../../dto";

export class Tickets {
    static async buy(ticket: Ticket, userId: string, token?: CancelToken): Promise<BuyTicket | null> {
        try {
            const userToken = localStorage.getItem("token");
            if (userToken === null) throw new Error("No token found");
            const response = await axios.post(
                "http://localhost:3000/api/tickets/createTicket",
                {
                    cancelToken: token,
                    type: ticket.type,
                    userId: userId,
                    allowedSpaces: ticket.allowedSpaces,
                    escapeGameOrder: ticket.escapeGameOrder,

                },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async getTickets(userId: string, token?: CancelToken): Promise<Ticket[] | null> {
        try {
            const userToken = localStorage.getItem("token");
            if (userToken === null) throw new Error("No token found");
            const response = await axios.get(
                "http://localhost:3000/api/tickets/getTickets",
                {
                    cancelToken: token,
                    params: {
                        userId: userId,
                    },
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    }
                },
            );
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async getTicketByUserId(userId: string, token?: CancelToken): Promise<Ticket[] | null> {
        try {
            const userToken = localStorage.getItem("token");
            if (userToken === null) throw new Error("No token found");
            const response = await axios.get(
                `http://localhost:3000/api/tickets/getTicketByUser/${userId}`,
                {
                    cancelToken: token,
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    }
                },
            );
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async getValidTickets(userId: string, token?: CancelToken): Promise<Ticket[] | null> {
        try {
            const userToken = localStorage.getItem("token");
            if (userToken === null) throw new Error("No token found");
            const response = await axios.get(
                `http://localhost:3000/api/tickets/getValidTickets/${userId}`,
                {
                    cancelToken: token,
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    }
                },
            );
            return response.data.validTickets;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async markTicketAsUsed(ticketId: string, token?: CancelToken): Promise<Ticket | null> {
        try {
            const userToken = localStorage.getItem("token");
            if (userToken === null) throw new Error("No token found");
            const response = await axios.get(
                `http://localhost:3000/api/tickets/markTicketAsUsed/${ticketId}`,
                {
                    cancelToken: token,
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    }
                },
            );
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}