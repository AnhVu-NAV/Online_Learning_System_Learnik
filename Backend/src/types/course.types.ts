import type { Document, Types } from "mongoose"

export interface ICourse extends Document {
  _id: Types.ObjectId
  title: string
  description?: string
  instructorId?: Types.ObjectId
  lessons?: string[]
  imageUrl?: string
  price?: number
  duration?: string
  category?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface CourseRequestBody {
  title: string
  description?: string
  instructorId?: string
  lessons?: string[]
  imageUrl?: string
  price?: number
  duration?: string
  category?: string
}

export interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
}

