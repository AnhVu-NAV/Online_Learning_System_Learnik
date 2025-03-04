import mongoose, { Document, Schema } from "mongoose";

export interface ICourse extends Document {
  title: string;
  description: string;
  category: string;
}

const courseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
});

const Course = mongoose.model<ICourse>("Course", courseSchema);
export default Course;
