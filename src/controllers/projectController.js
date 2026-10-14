import Project from '../models/Project.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

// @desc    Get all projects (with optional filters)
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res, next) => {
  try {
    const { category, featured, search } = req.query;
    const query = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (featured !== undefined) {
      query.featured = featured === 'true';
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });

    return sendSuccess(res, 'Projects retrieved', {
      count: projects.length,
      projects,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project by ID or Slug
// @route   GET /api/projects/:idOrSlug
// @access  Public
export const getProjectByIdOrSlug = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;

    let project = null;
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      project = await Project.findById(idOrSlug);
    } else {
      project = await Project.findOne({ slug: idOrSlug });
    }

    if (!project) {
      return sendError(res, 'Project not found', 404);
    }

    return sendSuccess(res, 'Project retrieved', project);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private (Admin)
export const createProject = async (req, res, next) => {
  try {
    const {
      title,
      description,
      problems,
      solutions,
      challenges,
      category,
      image,
      tags,
      liveUrl,
      githubClient,
      githubServer,
      featured,
      tech,
      date,
    } = req.body;

    if (!title || !description) {
      return sendError(res, 'Title and description are required', 400);
    }

    const project = await Project.create({
      title,
      description,
      problems,
      solutions,
      challenges,
      category: category || 'fullstack',
      image,
      tags: Array.isArray(tags) ? tags : [],
      liveUrl,
      githubClient,
      githubServer,
      featured: Boolean(featured),
      tech: Array.isArray(tech) ? tech : [],
      date: String(date) || '',
    });

    return sendSuccess(res, 'Project created successfully', project, 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return sendError(res, 'Project not found', 404);
    }

    return sendSuccess(res, 'Project updated successfully', project);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return sendError(res, 'Project not found', 404);
    }

    return sendSuccess(res, 'Project deleted successfully');
  } catch (error) {
    next(error);
  }
};
