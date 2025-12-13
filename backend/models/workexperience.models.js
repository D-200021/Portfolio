import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            required: true,
            trim: true,
        },

        company: {
            type: String,
            required: true,
            trim: true,
        },

        // duration: {
        //     type: String,
        //     required: true,
        // },

        location: {
            type: String,
            required: true,
        },

        highlights: {
            type: [String],      // Array of strings
            required: true,
            validate: (v) => Array.isArray(v) && v.length > 0,
        },

        tech: {
            type: [String],      // Array of skills/tech
            required: true,
            validate: (v) => Array.isArray(v) && v.length > 0,
        },

        // (Optional) Add start/end dates for better filtering if needed  
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },

        // (Optional) Add display order for portfolio sorting
        order: {
            type: Number,
            default: 0,
        },
    },

    { timestamps: true }
);

const Experience = mongoose.model("Experience", ExperienceSchema);

export default Experience;
