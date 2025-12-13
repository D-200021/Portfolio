import mongoose from "mongoose";

const personalSchema = new mongoose.Schema({
    resumeUrl: {
        type: "string",
        default: "",
    },
    profilePic: {
        type: String,
        default: "",
    },
}, {
    timestamps: true
})

const PersonalInfo = mongoose.model("PersonalInfo", personalSchema);

export default PersonalInfo; 