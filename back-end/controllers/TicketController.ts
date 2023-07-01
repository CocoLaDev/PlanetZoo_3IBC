import Ticket from "../models/ticket";
import { Request, Response } from "express";

class TicketController {
  public async createTicket(req: Request, res: Response): Promise<void> {
    const {
      type,
      userId,
      allowedSpaces,
      escapeGameOrder,
      validDays = [],
    } = req.body;

    // Check if order array is subset of allowedSpaces array
    if (
      type === "PASS Escape game" &&
      !escapeGameOrder.every((v: string) => allowedSpaces.includes(v))
    ) {
      res.status(400).json({
        message:
          "Invalid escapeGameOrder: all values must be included in allowedSpaces",
      });
      return;
    }

    let validUntil;
    switch (type) {
      case "Day PASS":
        validUntil = new Date();
        validUntil.setDate(validUntil.getDate() + 1);
        break;
      case "Week-end PASS":
        validUntil = new Date();
        validUntil.setDate(validUntil.getDate() + 2);
        break;
      case "1daymonth PASS":
        const currentDate = new Date();
        validUntil = new Date(
          currentDate.getFullYear() + 1,
          currentDate.getMonth(),
          currentDate.getDate()
        );
        for (let i = 0; i < 12; i++) {
          const validDay = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + i,
            1
          );
          validDays.push(validDay);
        }
        break;

      case "Year PASS":
        validUntil = new Date();
        validUntil.setFullYear(validUntil.getFullYear() + 1);
        break;
      case "Escape game PASS":
        validUntil = new Date();
        validUntil.setDate(validUntil.getDate() + 1);
        break;
      case "Night PASS":
        validUntil = new Date();
        validUntil.setHours(23, 59, 59, 999); // Set to the end of the current day
        break;
    }

    if(!validUntil) {
      res.status(400).json({
        message:
          "Invalid ticket type",
      });
      return;
    }

    const newTicket = new Ticket({
      type,
      userId,
      allowedSpaces,
      escapeGameOrder,
      validUntil,
      validDays,
    });

    await newTicket.save();
    res
      .status(201)
      .json({ message: "Ticket created successfully", ticket: newTicket });
  }

  public async getTicket(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      res.status(404).json({ message: "Ticket not found" });
      return;
    }

    res.status(200).json(ticket);
  }

  public async getTicketCountBySpace(req: Request, res: Response): Promise<void> {
    const ticketCounts = await Ticket.aggregate([
      { $unwind: "$allowedSpaces" },
      { $group: { _id: "$allowedSpaces", count: { $sum: 1 } } },
    ]);
    res.status(200).json(ticketCounts);
  }

  public async getDailyTicketCountBySpace(req: Request, res: Response): Promise<void> {
    const ticketCounts = await Ticket.aggregate([
      { $unwind: "$allowedSpaces" },
      {
        $lookup: {
          from: "spaces",
          localField: "allowedSpaces",
          foreignField: "_id",
          as: "spaceDetails"
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            space: { id: "$allowedSpaces", name: { $first: "$spaceDetails.name" } },
          },
          count: { $sum: 1 }
        }
      },
    ]);

    res.status(200).json(ticketCounts);
  }

  public async getWeeklyTicketCountBySpace(req: Request, res: Response): Promise<void> {
    const ticketCounts = await Ticket.aggregate([
      { $unwind: "$allowedSpaces" },
      {
        $lookup: {
          from: "spaces",
          localField: "allowedSpaces",
          foreignField: "_id",
          as: "spaceDetails"
        }
      },
      {
        $group: {
          _id: {
            week: { $week: "$createdAt" },
            space: { id: "$allowedSpaces", name: { $first: "$spaceDetails.name" } },
          },
          count: { $sum: 1 }
        }
      },
    ]);

    res.status(200).json(ticketCounts);
  }
}

export default new TicketController();
