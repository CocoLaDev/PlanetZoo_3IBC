import express, { Router } from "express";
import TicketController from "../controllers/TicketController";
import { AuthMiddleware } from "../middleware/authMiddleware";

class TicketRoutes {
  public router: Router;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = express.Router();
    this.authMiddleware = new AuthMiddleware();
    this.routes();
  }

  public routes(): void {
    /**
 * @swagger
 * /api/tickets/createTicket:
 *   post:
 *     tags:
 *       - Tickets
 *     summary: Create a new ticket
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               userId:
 *                 type: string
 *               allowedSpaces:
 *                 type: array
 *                 items:
 *                   type: string
 *               escapeGameOrder:
 *                 type: array
 *                 items:
 *                   type: string
 *               validDays:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: date-time
 *             required:
 *               - type
 *               - userId
 *               - validUntil
 *     responses:
 *       201:
 *         description: Ticket created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
    this.router.post(
      "/createTicket",
      // this.authMiddleware.validateToken,
      // this.authMiddleware.isRole("admin"),
      TicketController.createTicket
    );

    /**
     * @swagger
     * /api/tickets/getTicket/{id}:
     *   get:
     *     tags:
     *       - Tickets
     *     summary: Get a ticket by id
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: id
     *         description: Id of the ticket.
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Ticket data
     *       404:
     *         description: Ticket not found
     *       401:
     *         description: Unauthorized
     */
    this.router.get(
      "/getTicket/:id",
      this.authMiddleware.validateToken,
      this.authMiddleware.isRole("admin"),
      TicketController.getTicket
    );

      /**
     * @swagger
     * /api/tickets/getTicketByUser/{userId}:
     *   get:
     *     tags:
     *       - Tickets
     *     summary: Get a ticket by userId
     *     parameters:
     *       - name: userId
     *         description: Id of the user.
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Ticket data
     *       404:
     *         description: Ticket not found
     *       401:
     *         description: Unauthorized
     */
      this.router.get(
        "/getTicketByUser/:userId",
        TicketController.getTicketsByUser
      );

    /**
     * @swagger
     * /api/tickets/count-by-space:
     *   get:
     *     tags:
     *       - Tickets
     *     summary: Get the count of tickets by space
     *     responses:
     *       200:
     *         description: Count of tickets by space
     *       400:
     *         description: Bad request
     */
    this.router.get("/count-by-space", TicketController.getTicketCountBySpace);

    /**
     * @swagger
     * /api/tickets/daily-count:
     *   get:
     *     tags:
     *       - Tickets
     *     summary: Get the daily count of tickets by space
     *     responses:
     *       200:
     *         description: Daily count of tickets by space
     *       400:
     *         description: Bad request
     */
    this.router.get(
      "/daily-count",
      TicketController.getDailyTicketCountBySpace
    );

    /**
     * @swagger
     * /api/tickets/weekly-count:
     *   get:
     *     tags:
     *       - Tickets
     *     summary: Get the weekly count of tickets by space
     *     responses:
     *       200:
     *         description: Weekly count of tickets by space
     *       400:
     *         description: Bad request
     */
    this.router.get(
      "/weekly-count",
      TicketController.getWeeklyTicketCountBySpace
    );

  }
}

export default new TicketRoutes().router;
