export interface PaymentRequest {
    amount: number
    orderId: string
    userId: string
    courseId: string
  }
  
  export interface VietQRResponse {
    transactionId: string
    // Add other response fields from VietQR API as needed
    [key: string]: any
  }
  
  export interface PaymentDocument {
    userId: string
    orderId: string
    courseId: string
    amount: number
    status: "pending" | "completed" | "failed"
    transactionId: string
    paymentDate?: Date
  }
  
  export interface UserCourseDocument {
    userId: string
    courseId: string
    paymentStatus: "pending" | "completed" | "failed"
  }
  
  