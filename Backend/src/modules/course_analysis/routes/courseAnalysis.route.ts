import { Router } from "express";
import { analyzeCourses } from "../controllers/courseAnalysis.controller";

const router = Router();

router.post("/analyze", analyzeCourses);

export default router;
