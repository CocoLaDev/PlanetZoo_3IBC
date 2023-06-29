// Interfaces/express.d.ts

declare namespace Express {
  interface Request {
    userId?: string;
    userRole?: string;
  }
}
