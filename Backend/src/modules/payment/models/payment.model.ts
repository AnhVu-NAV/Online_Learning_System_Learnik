// payment.model.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  orderId: string;
  amount: number;
  courseId: string;
  status: string; // "pending", "completed", "failed"
  paymentMethod: string; // "VietQR"
  paymentDate: Date;
  transactionId: string; // Mã giao dịch của VietQR
}

const paymentSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    paymentMethod: { type: String, default: 'VietQR' },
    paymentDate: { type: Date, default: Date.now },
    transactionId: { type: String, required: true },
  },
  { timestamps: true }
);

const Payment = mongoose.model<IPayment>('Payment', paymentSchema);

export default Payment;
