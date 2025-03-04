// payment.service.ts
import axios, { AxiosError } from "axios";
import config from '../../../config/config'; // Lấy thông tin cấu hình
import { IUser } from '../../user/models/user.model';
import Payment from '../../payment/models/payment.model'; // Import Payment model
import UserCourse from '../../user_courses/models/user_courses.model'; // Import UserCourse model
import Course from '../../course/models/course.model'; // Import Course model
import type { PaymentRequest, VietQRResponse, PaymentDocument } from "../../../types/payment.types";

class PaymentService {
  async createVietQRPayment(paymentRequest: PaymentRequest): Promise<VietQRResponse> {
    try {
      const response = await axios.post<VietQRResponse>(
        "https://api.vietqr.vn/qrpayment",
        {
          amount: paymentRequest.amount,
          order_id: paymentRequest.orderId,
          user_id: paymentRequest.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${config.VIETQR_API_KEY}`,
          },
        },
      );

      const transactionId = response.data.transactionId;

      if (!transactionId) {
        throw new Error("Transaction ID not received from VietQR");
      }

      // Create payment record
      const payment = await Payment.create({
        userId: paymentRequest.userId,
        orderId: paymentRequest.orderId,
        courseId: paymentRequest.courseId,
        amount: paymentRequest.amount,
        status: "pending",
        transactionId,
      });

      // Ensure no duplicate user-course entry
      const existingUserCourse = await UserCourse.findOne({
        userId: paymentRequest.userId,
        courseId: paymentRequest.courseId,
      });

      if (!existingUserCourse) {
        // Create user course record
        await UserCourse.create({
          userId: paymentRequest.userId,
          courseId: paymentRequest.courseId,
          paymentStatus: "pending",
        });
      }

      return response.data; // Return response data, such as QR code URL
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(`VietQR API Error: ${error.response?.data?.message || error.message}`);
      }
      throw new Error("Error creating VietQR payment");
    }
  }

  async updatePaymentStatus(
    transactionId: string,
    status: "pending" | "completed" | "failed",
  ): Promise<PaymentDocument | null> {
    try {
      const payment = await Payment.findOneAndUpdate(
        { transactionId },
        {
          status,
          paymentDate: status === "completed" ? new Date() : undefined,
        },
        { new: true },
      );

      if (!payment) {
        throw new Error("Payment not found");
      }

      if (status === "completed") {
        await UserCourse.findOneAndUpdate(
          {
            userId: payment.userId,
            courseId: payment.courseId,
          },
          { paymentStatus: "completed" },
        );
      }
      return {
        ...payment.toObject(),
        userId: payment.userId.toString(),
        status: payment.status as "pending" | "completed" | "failed",
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error updating payment status: ${error.message}`);
      }
      throw new Error("Error updating payment status");
    }
  }
}

export default new PaymentService();
