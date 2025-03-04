// payment.route.ts
import express from 'express';
import paymentController from '../controllers/payment.controller';
import authMiddleware from '../../../middleware/auth.middleware';

const router = express.Router();

// Route tạo QR thanh toán
router.post('/create-payment', authMiddleware, paymentController.createPayment);

// Route cập nhật trạng thái thanh toán sau khi giao dịch hoàn tất
router.post('/update-status', authMiddleware, paymentController.updatePaymentStatus);

export default router;