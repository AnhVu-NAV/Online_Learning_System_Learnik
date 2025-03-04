import { Request, Response } from "express";
import axios from "axios";
import Course from "../../course/models/course.model";
import dotenv from "dotenv";

dotenv.config(); // Load biến môi trường từ .env

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

// Hàm lấy danh sách tên khóa học từ MongoDB
const fetchCourseNamesFromDatabase = async (): Promise<string[]> => {
  try {
    const courses = await Course.find({}, "title"); // Chỉ lấy tên khóa học
    return courses.map((course) => course.title);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách khóa học:", error);
    throw new Error("Không thể lấy danh sách khóa học.");
  }
};

// Hàm gọi OpenAI để phân tích khóa học
const queryOpenAI = async (userMessage: string): Promise<string> => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: userMessage }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content || "Không có phản hồi từ AI.";
  } catch (error) {
    console.error("Lỗi khi gọi OpenAI:", error);
    throw new Error("Không thể lấy phản hồi từ AI.");
  }
};

// Xử lý request từ client
export const analyzeCourses = async (req: Request, res: Response) => {
  try {
    const { action, message } = req.body;

    let aiMessage: string;
    if (action === "initial") {
      const courseNames = await fetchCourseNamesFromDatabase();
      aiMessage = `Assuming you are an expert in training and teaching, analyze the courses below and check which ones are about to become outdated and which ones need to be updated with new knowledge: ${courseNames.join(", ")}`;
    } else if (action === "followUp") {
      aiMessage = message;
    } else {
      return res.status(400).json({ success: false, message: "Invalid action" });
    }

    const aiResponse = await queryOpenAI(aiMessage);
    res.json({ success: true, response: aiResponse });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ success: false, message: errorMessage });
  }
};
