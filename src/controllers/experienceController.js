import Experience from '../models/Experience.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

// @desc    Get all experiences/education
// @route   GET /api/experiences
// @access  Public
export const getExperiences = async (req, res, next) => {
  try {
    const { type } = req.query;
    const query = type ? { type } : {};

    const items = await Experience.find(query).sort({ order: 1, createdAt: -1 });

    const work = items.filter((item) => item.type === 'work');
    const education = items.filter((item) => item.type === 'education');

    return sendSuccess(res, 'Experiences retrieved', {
      total: items.length,
      all: items,
      work,
      education,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new experience
// @route   POST /api/experiences
// @access  Private (Admin)
export const createExperience = async (req, res, next) => {
  try {
    const {
      type,
      title,
      organization,
      location,
      startDate,
      endDate,
      isCurrent,
      description,
      technologies,
      order,
    } = req.body;

    if (!title || !organization || !startDate) {
      return sendError(res, 'Title, organization, and start date are required', 400);
    }

    const item = await Experience.create({
      type: type || 'work',
      title,
      organization,
      location: location || '',
      startDate,
      endDate: endDate || '',
      isCurrent: Boolean(isCurrent),
      description: description || '',
      technologies: Array.isArray(technologies) ? technologies : [],
      order: Number(order) || 0,
    });

    return sendSuccess(res, 'Experience created successfully', item, 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Update experience
// @route   PUT /api/experiences/:id
// @access  Private (Admin)
export const updateExperience = async (req, res, next) => {
  try {
    const item = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return sendError(res, 'Experience not found', 404);
    }

    return sendSuccess(res, 'Experience updated successfully', item);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete experience
// @route   DELETE /api/experiences/:id
// @access  Private (Admin)
export const deleteExperience = async (req, res, next) => {
  try {
    const item = await Experience.findByIdAndDelete(req.params.id);

    if (!item) {
      return sendError(res, 'Experience not found', 404);
    }

    return sendSuccess(res, 'Experience deleted successfully');
  } catch (error) {
    next(error);
  }
};
