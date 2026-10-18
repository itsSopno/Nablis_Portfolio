import mongoose from "mongoose";

const allProjectSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: [true, "Project type is required"],
            trim: true,
        },
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        detail: {
            type: String,
            required: [true, "Detail is required"],
        },
        tech: {
            type: [String],
            required: [true, "Tech stack is required"],
            default: [],
        },
        speciality: {
            type: String,
            required: [true, "Speciality is required"],
        },
        errorFaced: {
            type: String,
            required: [true, "Error faced is required"],
        },
        solutionYouFound: {
            type: String,
            required: [true, "Solution is required"],
        },
        image: {
            type: String,
            default: "",
        },
        liveUrl: {
            type: String,
            default: "",
        },
        githubUrl: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

const AllProject = mongoose.model("AllProject", allProjectSchema);

export default AllProject;