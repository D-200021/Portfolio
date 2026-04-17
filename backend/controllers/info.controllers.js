import Project from "../models/project.models.js"
import Experience from "../models/workexperience.models.js";
import Visitor from "../models/vistors.models.js";
import PersonalInfo from "../models/personal.models.js";

export const visitor = async (req, res) => {
    try {
        const ip =
            req.headers["x-forwarded-for"] ||
            req.socket.remoteAddress;

        const existingVisitor = await Visitor.findOne({ ip });

        if (!existingVisitor) {
            await Visitor.create({ ip });
        }

        res.status(200).json({ success: true });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

export const getAllInfo = async (req, res) => {
    try {
        const personalInfo = await PersonalInfo.find({});
        const workExperience = await Experience.find({}).sort({ startDate: -1 });
        const projectDetail = await Project.find({}).sort({ startDate: -1, endDate: 1 });
        const totalVisitors = await Visitor.countDocuments();

        const data = {
            personalInfo,
            workExperience,
            projectDetail,
            totalVisitors
        }

        res.status(200).json({ status: true, content: data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}
