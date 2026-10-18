import AllProject from '../models/allProject.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

// @desc    Get all AllProjects
// @route   GET /api/allprojects
// @access  Public
export const getAllProjects = async (req, res, next) => {
    try {
        const { type, search } = req.query;
        const query = {};

        if (type && type !== 'all') {
            query.type = type;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { detail: { $regex: search, $options: 'i' } },
                { tech: { $in: [new RegExp(search, 'i')] } },
            ];
        }

        const projects = await AllProject.find(query).sort({ createdAt: -1 });

        return sendSuccess(res, 'All projects retrieved', {
            count: projects.length,
            projects,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single AllProject by ID
// @route   GET /api/allprojects/:id
// @access  Public
export const getAllProjectById = async (req, res, next) => {
    try {
        const project = await AllProject.findById(req.params.id);

        if (!project) {
            return sendError(res, 'Project not found', 404);
        }

        return sendSuccess(res, 'Project retrieved', project);
    } catch (error) {
        next(error);
    }
};

// @desc    Create a new AllProject
// @route   POST /api/allprojects
// @access  Private (Admin)
export const createAllProject = async (req, res, next) => {
    try {
        const {
            type,
            title,
            detail,
            tech,
            speciality,
            errorFaced,
            solutionYouFound,
            image,
            liveUrl,
            githubUrl,
        } = req.body;

        if (!type || !title || !detail) {
            return sendError(res, 'Type, title and detail are required', 400);
        }

        const project = await AllProject.create({
            type,
            title,
            detail,
            tech: Array.isArray(tech) ? tech : (tech ? tech.split(',').map(t => t.trim()).filter(Boolean) : []),
            speciality: speciality || '',
            errorFaced: errorFaced || '',
            solutionYouFound: solutionYouFound || '',
            image: image || '',
            liveUrl: liveUrl || '',
            githubUrl: githubUrl || '',
        });

        return sendSuccess(res, 'Project created successfully', project, 201);
    } catch (error) {
        next(error);
    }
};

// @desc    Update an AllProject
// @route   PUT /api/allprojects/:id
// @access  Private (Admin)
export const updateAllProject = async (req, res, next) => {
    try {
        const updateData = { ...req.body };

        // Ensure tech is always an array
        if (updateData.tech && !Array.isArray(updateData.tech)) {
            updateData.tech = updateData.tech.split(',').map(t => t.trim()).filter(Boolean);
        }

        const project = await AllProject.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!project) {
            return sendError(res, 'Project not found', 404);
        }

        return sendSuccess(res, 'Project updated successfully', project);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete an AllProject
// @route   DELETE /api/allprojects/:id
// @access  Private (Admin)
export const deleteAllProject = async (req, res, next) => {
    try {
        const project = await AllProject.findByIdAndDelete(req.params.id);

        if (!project) {
            return sendError(res, 'Project not found', 404);
        }

        return sendSuccess(res, 'Project deleted successfully');
    } catch (error) {
        next(error);
    }
};
