import express, { Router } from 'express';
import ZooController from '../controllers/ZooController';

class ZooRoutes {
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  public routes(): void {
    /**
     * @swagger
     * /api/zoo/canZooOpen/{day}:
     *   get:
     *     tags:
     *       - Zoo
     *     summary: Check if zoo can open on a specific day
     *     parameters:
     *       - name: day
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *           enum:
     *             - "Monday"
     *             - "Tuesday"
     *             - "Wednesday"
     *             - "Thursday"
     *             - "Friday"
     *             - "Saturday"
     *             - "Sunday"
     *     responses:
     *       200:
     *         description: The zoo can open
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *       400:
     *         description: The zoo cannot open
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     */
    this.router.get('/canZooOpen/:day', ZooController.canZooOpen);
  }

}

export default new ZooRoutes().router;
