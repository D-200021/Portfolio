import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tech: {
        type: [String],     // array of strings
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        default: null,
    },
    link: {
        type: String,
        default: "",
    },
    uiImagePath: {
        type: String,
        default: "",
    },
    // image: {
    //     type: String,
    //     default: "",
    // },
    company: {
        type: String,
        default: "",
    },
    role: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
},
    { timestamps: true }
);

// Create model (collection name = "projects")
const Project = mongoose.model("Project", ProjectSchema);

export default Project;
