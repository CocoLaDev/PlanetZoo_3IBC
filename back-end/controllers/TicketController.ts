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
        const currentDayOfWeek = new Date().getDay();
        const daysUntilSaturday = 6 - currentDayOfWeek;
        validUntil = new Date();
        if (currentDayOfWeek <= 5) {
          validUntil.setDate(validUntil.getDate() + daysUntilSaturday + 1);
        } else if (currentDayOfWeek === 6) {
          validUntil.setDate(validUntil.getDate() + 1);
        }
        validUntil.setHours(23, 59, 59, 999);
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

    if (!validUntil) {
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
      used: false,
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

  public async getTicketsByUser(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    const tickets = await Ticket.find({ userId: userId });
    if (!tickets) {
      res.status(404).json({ message: "Tickets not found" });
      return;
    }
    res.status(200).json(tickets);
  }

  public async getValidTickets(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;

    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    const tickets = await Ticket.find({ userId, used: false });

    const validTickets = tickets.filter(ticket => {
      if (!ticket.validUntil) return;
      if (ticket.validUntil < currentDate) {
        return false;
      }

      switch (ticket.type) {
        case "Week-end PASS":
          return currentDate.getDay() === 6 || currentDate.getDay() === 0;

        case "1daymonth PASS":
          if (!ticket.validDays) return;
          return ticket.validDays.some(day => {
            return (
              day.getDate() === currentDate.getDate() &&
              day.getMonth() === currentDate.getMonth() &&
              day.getFullYear() === currentDate.getFullYear()
            );
          });

        case "Night PASS":
          return currentHour >= 20;

        default:
          return true;
      }
    });

    res.status(200).json({ validTickets });
  }



  public async markTicketAsUsed(req: Request, res: Response): Promise<void> {
    const { ticketId } = req.params;
    const ticket = await Ticket.findById(ticketId);
    
    if (!ticket) {
      res.status(404).json({ message: "Ticket not found" });
      return;
    }

    ticket.used = true;
    await ticket.save();

    res.status(200).json({ message: "Ticket marked as used", ticket: ticket });
  }

  // vérifier que le ticket est bien dans la tranche de jour qu'il peut utiliser



  public async getTicketCountBySpace(req: Request, res: Response): Promise<void> {
    const ticketCounts = await Ticket.aggregate([
      {
        $addFields: {
          allowedSpaces: {
            $map: {
              input: "$allowedSpaces",
              as: "spaceId",
              in: { $toObjectId: "$$spaceId" },
            },
          },
        },
      },
      {
        $lookup: {
          from: "spaces",
          localField: "allowedSpaces",
          foreignField: "_id",
          as: "spaceDetails",
        },
      },
      { $unwind: "$spaceDetails" },
      {
        $group: {
          _id: {
            id: "$spaceDetails._id",
            name: "$spaceDetails.name",
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: "$_id.id",
          name: "$_id.name",
          count: 1,
        },
      },
    ]);

    res.status(200).json(ticketCounts);
  }



  public async getDailyTicketCountBySpace(
    req: Request,
    res: Response
  ): Promise<void> {
    const ticketCounts = await Ticket.aggregate([
      {
        $addFields: {
          allowedSpaces: {
            $map: {
              input: "$allowedSpaces",
              as: "spaceId",
              in: { $toObjectId: "$$spaceId" },
            },
          },
        },
      },
      { $unwind: "$allowedSpaces" },
      {
        $lookup: {
          from: "spaces",
          localField: "allowedSpaces",
          foreignField: "_id",
          as: "spaceDetails",
        },
      },
      { $unwind: "$spaceDetails" },
      {
        $project: {
          spaceDetails: 1,
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        },
      },
      {
        $group: {
          _id: {
            date: "$date",
            spaceId: "$spaceDetails._id",
            spaceName: "$spaceDetails.name",
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id.spaceName",
          count: 1,
        },
      },
    ]);

    res.status(200).json(ticketCounts);
  }

  public async getWeeklyTicketCountBySpace(
    req: Request,
    res: Response
  ): Promise<void> {
    const ticketCounts = await Ticket.aggregate([
      {
        $addFields: {
          allowedSpaces: {
            $map: {
              input: "$allowedSpaces",
              as: "spaceId",
              in: { $toObjectId: "$$spaceId" },
            },
          },
        },
      },
      { $unwind: "$allowedSpaces" },
      {
        $lookup: {
          from: "spaces",
          localField: "allowedSpaces",
          foreignField: "_id",
          as: "spaceDetails",
        },
      },
      { $unwind: "$spaceDetails" },
      {
        $project: {
          spaceDetails: 1,
          week: { $week: "$createdAt" },
        },
      },
      {
        $group: {
          _id: {
            week: "$week",
            spaceId: "$spaceDetails._id",
            spaceName: "$spaceDetails.name",
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id.spaceName",
          count: 1,
        },
      },
    ]);

    res.status(200).json(ticketCounts);
  }
}

export default new TicketController();
