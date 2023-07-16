import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import userRoutes from './routes/user.routes';
import zooRoutes from './routes/zoo.routes';
import spaceRoutes from "./routes/spaces.routes";
import servicebookRoutes from "./routes/servicebook.routes";
import ticketRoutes from "./routes/ticket.routes";
import treatmentRoutes from "./routes/treatment.routes";
import animalRoutes from "./routes/animal.routes";
import Database from "./config/database";
import checkticketsRoutes from "./routes/checktickets.routes";
import { AuthMiddleware } from "./middleware/authMiddleware";

class Server {
  private app: express.Application;
  private port: number;
  private authMiddleware: AuthMiddleware;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.authMiddleware = new AuthMiddleware();
  }

  private async initializeDatabase(): Promise<void> {
    const database = new Database(process.env.MONGODB_URI as string, {});
    await database.connect();
  }

  private initializeMiddleware(): void {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    const options = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "PlanodeZoo API with Swagger",
          version: "1.0.0",
        },
        components: {
          securitySchemes: {
            BearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT'
            }
          }
        },
      },
      apis: ["./routes/*.ts"], // path to the files where you've defined doc comments
    };
    const specs = swaggerJsdoc(options);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeRoutes(): void {
    this.app.use('/api/users', this.authMiddleware.validateToken, userRoutes);
    this.app.use('/api/zoo', this.authMiddleware.validateToken, zooRoutes)
    this.app.use("/api/spaces", this.authMiddleware.validateToken, spaceRoutes);
    this.app.use("/api/servicebook", this.authMiddleware.validateToken, servicebookRoutes);
    this.app.use("/api/tickets", this.authMiddleware.validateToken, ticketRoutes);
    this.app.use("/api/treatments", this.authMiddleware.validateToken, treatmentRoutes);
    this.app.use("/api/animals", this.authMiddleware.validateToken, animalRoutes);
    this.app.use('/api', this.authMiddleware.validateToken, checkticketsRoutes);
  }

  private initializeErrorHandling(): void {
    this.app.use(
      (
        err: Error,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.status(500).send({ error: err.message });
      }
    );
  }

  public async start(): Promise<void> {
    await this.initializeDatabase();
    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorHandling();

    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

// Créez une instance du serveur et démarrez-la
const server = new Server(+process.env.PORT! || 3000);
server.start();
