import mongoose, { Document } from 'mongoose';
import ITicket from '../interfaces/Ticket';

const Schema = mongoose.Schema;

const TicketSchema = new Schema<ITicket>({
    type: { type: String, required: true },
    userId: { type: String, required: true },
    allowedSpaces: [{ type: String }],
    validUntil: { type: Date, required: true },
    escapeGameOrder: [{ type: Schema.Types.ObjectId, ref: 'Space' }],
    validDays: { type: [Date], default: undefined },
    used: { type: Boolean, default: false },
}, {
    timestamps: true
});


export default mongoose.model<ITicket & Document>('Ticket', TicketSchema);
