// payment.controller.ts
import { Response } from 'express';
import paymentService from '../services/payment.service';
import { RequestCustom } from '../../../types/express.type';
import Payment from '../models/payment.model'; // Import Payment model
import UserCourse from '../../user_courses/models/user_courses.model';
import { PaymentRequest } from '../../../types/payment.types'; // Import interface cho PaymentRequest

// Tạo thanh toán và trả về QR code
const createPayment = async (req: RequestCustom, res: Response): Promise<void> => {
  const { amount, orderId, courseId } = req.body;
  const userId = req.user?._id?.toString() || ''; // Lấy userId từ token hoặc session, tùy vào cách xác thực bạn đang sử dụng

  const paymentRequest: PaymentRequest = {
    amount,
    orderId,
    userId,
    courseId,
  };

  try {
    const paymentData = await paymentService.createVietQRPayment(paymentRequest); // Gọi service để tạo thanh toán

    res.status(200).json({
      message: 'Tạo QR thanh toán thành công',
      data: paymentData, // Dữ liệu QR Code hoặc thông tin thanh toán từ API
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Lỗi thanh toán', error: errorMessage });
  }
};

// Cập nhật trạng thái thanh toán khi giao dịch hoàn tất
const updatePaymentStatus = async (req: RequestCustom, res: Response): Promise<void> => {
  const { transactionId, status } = req.body; // Lấy transactionId và trạng thái thanh toán

  try {
    const payment = await paymentService.updatePaymentStatus(transactionId, status); // Gọi service để cập nhật trạng thái thanh toán

    if (!payment) {
      res.status(404).json({ message: 'Không tìm thấy giao dịch' }); // Nếu không tìm thấy thanh toán
      return; // Add return statement to ensure the function returns void
    }

    res.status(200).json({
      message: 'Cập nhật trạng thái thanh toán thành công',
      data: payment,
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Lỗi cập nhật trạng thái thanh toán', error: errorMessage });
  }
};

export default {
  createPayment,
  updatePaymentStatus,
};
