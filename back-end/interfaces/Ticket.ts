import { ObjectId } from "mongoose";

interface ITicket {
  type: string;
  userId: ObjectId;
  allowedSpaces: ObjectId[];
  validUntil?: Date;
  escapeGameOrder?: ObjectId[];
  validDays?: Date[];
}

export default ITicket;
