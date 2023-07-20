import { AuthMiddleware } from "./../middleware/authMiddleware";
import express, { Router } from "express";
import SpaceController from "../controllers/SpaceController";
import ticketMiddleware from "../middleware/ticketMiddleware";

class SpacesRoutes {
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
     * /api/spaces/getallspaces:
     *   get:
     *     security:
     *       - BearerAuth: []
     *     tags:
     *       - Spaces
     *     summary: Retrieve a list of spaces
     *     description: Returns a list of all spaces
     *     responses:
     *       200:
     *         description: A list of spaces
     *       404:
     *         description: No spaces found
     */
    this.router.get(
      "/getallspaces",
      // this.authMiddleware.isRole(["admin"]),
      SpaceController.getAllSpaces
    );

    /**
     * @swagger
     * /api/spaces/getspacebyname:
     *   get:
     *     security:
     *       - BearerAuth: []
     *     tags:
     *       - Spaces
     *     summary: Retrieve a space by name
     *     description: Returns a space by its name
     *     parameters:
     *       - name: name
     *         description: Name of the space
     *         in: query
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: A space object
     *       404:
     *         description: No space found
     */
    this.router.get(
      "/getspacebyname",
      this.authMiddleware.isRole(["admin"]),
      SpaceController.getSpaceByName
    );

    /**
     * @swagger
     * /api/spaces/getspacebyid/{id}:
     *   get:
     *     security:
     *       - BearerAuth: []
     *     tags:
     *       - Spaces
     *     summary: Retrieve a space by ID
     *     description: Returns a single space
     *     parameters:
     *       - name: id
     *         description: ID of the space to retrieve
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Space data
     *       404:
     *         description: Space not found
     */
    this.router.get(
      "/getspacebyid/:id",
      // ticketMiddleware.validateTicket, // Ajout du middleware de validation des tickets
      SpaceController.getSpaceById
    );

    /**
     * @swagger
     * /api/spaces/createspace:
     *   post:
     *     security:
     *       - BearerAuth: []
     *     tags:
     *       - Spaces
     *     summary: Create a new space
     *     description: Creates a new space
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               description:
     *                 type: string
     *               images:
     *                 type: string
     *               type:
     *                 type: string
     *               capacity:
     *                 type: number
     *               duration:
     *                 type: number
     *               openingHours:
     *                 type: string
     *               disabledAccess:
     *                 type: boolean
     *               currentVisitors:
     *                 type: number
     *             required:
     *               - spacename
     *     responses:
     *       201:
     *         description: Space created successfully
     *       400:
     *         description: Bad request
     */
    this.router.post(
      "/createspace",
      // this.authMiddleware.isRole(["admin"]),
      SpaceController.createSpace
    );

    /**
     * @swagger
     * /api/spaces/update/{id}:
     *   put:
     *     security:
     *       - BearerAuth: []
     *     tags:
     *       - Spaces
     *     summary: Update a space by ID
     *     description: Updates an existing space
     *     parameters:
     *       - name: id
     *         description: ID of the space to update.
     *         in: path
     *         required: true
     *         type: string
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               spacename:
     *                 type: string
     *               description:
     *                 type: string
     *               images:
     *                 type: string
     *               type:
     *                 type: string
     *               capacity:
     *                 type: number
     *               duration:
     *                 type: number
     *               openingHours:
     *                 type: string
     *               disabledAccess:
     *                 type: boolean
     *             required:
     *               - spacename
     *     responses:
     *       200:
     *         description: Space updated successfully
     *       404:
     *         description: Space not found
     */
    this.router.put(
      "/update/:id",
      this.authMiddleware.isRole(["admin"]),
      SpaceController.updateSpace
    );

    /**
     * @swagger
     * /api/spaces/delete/{id}:
     *   delete:
     *     security:
     *       - BearerAuth: []
     *     tags:
     *       - Spaces
     *     summary: Delete a space by ID
     *     description: Deletes an existing space by ID
     *     parameters:
     *       - name: id
     *         description: ID of the space to delete.
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Space deleted successfully
     *       404:
     *         description: Space not found
     */
    this.router.delete(
      "/delete/:id",
      this.authMiddleware.isRole(["admin"]),
      SpaceController.deleteSpace
    );

    /**
     * @swagger
     * /api/spaces/maintenance/{id}:
     *   put:
     *     security:
     *       - BearerAuth: []
     *     tags:
     *       - Spaces
     *     summary: Update a space by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: The updated space.
     */
    this.router.put(
      "/maintenance/:id",
      // this.authMiddleware.isRole(["admin"]),
      SpaceController.maintenanceSpace
    );

    /**
     * @swagger
     * /api/spaces/maintenanceoff/{id}:
     *   put:
     *     security:
     *       - BearerAuth: []
     *     tags:
     *       - Spaces
     *     summary: Update a space by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: The updated space.
     */
    this.router.put(
      "/maintenanceoff/:id",
      this.authMiddleware.validateToken,
      this.authMiddleware.isRole(["admin"]),
      SpaceController.maintenanceOffSpace
    );

    /**
     * @swagger
     * /api/spaces/checkcapacity/{id}:
     *   put:
     *     security:
     *       - BearerAuth: []
     *     tags:
     *       - Spaces
     *     summary: Modify the visitor count of a space
     *     description: Checks if the space is full or if there is still room for more visitors, then adds or removes a visitor based on the action parameter
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The id of the space
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               action:
     *                 type: string
     *                 enum: [add, remove]
     *                 description: The action to perform
     *             required:
     *               - action
     *     responses:
     *       200:
     *         description: Space checked successfully, returning the space data
     *       400:
     *         description: Space is full or invalid action
     *       404:
     *         description: Space not found
     *       500:
     *         description: Server error
     */
    this.router.put(
      "/checkcapacity/:id",
      // this.authMiddleware.isRole(["admin", "user"]), // Uncomment this if you want to restrict access
      SpaceController.getSpaceCapacity
    );

    /**
 * @swagger
 * /api/spaces/getSpaceCapacity/{id}:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Spaces
 *     summary: Get a space's capacity and current visitor count by id
 *     parameters:
 *       - name: id
 *         description: Id of the space.
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Space capacity and current visitors data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 capacity:
 *                   type: number
 *                 currentVisitors:
 *                   type: number
 *       404:
 *         description: Space not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
    this.router.get(
      "/getSpaceCapacity/:id",
      // this.authMiddleware.isRole(["admin"]),
      SpaceController.getSpaceCapacityById
    );
  }
}

export default new SpacesRoutes().router;
