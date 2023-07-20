import mongoose, { Document } from "mongoose";

export interface ServicebookInterface extends Document {
  spaceId: string;
  maintenanceStart: Date;
  maintenanceEnd?: Date;
  description: string;
}

const servicebookschema = new mongoose.Schema({
  spaceId: {
    type: String,
    required: true,
  },
  maintenanceStart: {
    type: Date,
  },
  maintenanceEnd: {
    type: Date,
  },
  description: {
    type: String,
  },
});

export default mongoose.model<ServicebookInterface>("Servicebook", servicebookschema);
