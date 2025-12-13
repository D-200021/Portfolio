import express from "express";
import { getAllInfo, visitor } from "../controllers/info.controllers.js";

const router = express.Router();

// router.get("/aboutme", aboutMe);

// router.post("/insertworkexperience", insertWorkExperience);

// router.get("/getexperiencedetail", getWorkExperience);

// router.get("/insertproject", insertProject);

// router.get("/getprojectdetail", getProjectDetails);

router.post("/visit", visitor);

// router.get("/visitors/total", totalVisitorCount)

router.get("/", getAllInfo);

export default router;