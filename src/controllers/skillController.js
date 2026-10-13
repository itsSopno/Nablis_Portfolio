import Skill from '../models/Skill.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

// @desc    Get all skills grouped by category or list
// @route   GET /api/skills
// @access  Public
export const getSkills = async (req, res, next) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};

    const skills = await Skill.find(query).sort({ order: 1, name: 1 });

    // Grouping helper
    const grouped = skills.reduce((acc, skill) => {
      acc[skill.category] = acc[skill.category] || [];
      acc[skill.category].push(skill);
      return acc;
    }, {});

    return sendSuccess(res, 'Skills retrieved', {
      total: skills.length,
      skills,
      grouped,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new skill
// @route   POST /api/skills
// @access  Private (Admin)
export const createSkill = async (req, res, next) => {
  try {
    const { name, category, proficiency, icon, order } = req.body;

    if (!name) {
      return sendError(res, 'Skill name is required', 400);
    }

    const skill = await Skill.create({
      name,
      category: category || 'frontend',
      proficiency: Number(proficiency) || 80,
      icon: icon || '',
      order: Number(order) || 0,
    });

    return sendSuccess(res, 'Skill created successfully', skill, 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private (Admin)
export const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!skill) {
      return sendError(res, 'Skill not found', 404);
    }

    return sendSuccess(res, 'Skill updated successfully', skill);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private (Admin)
export const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return sendError(res, 'Skill not found', 404);
    }

    return sendSuccess(res, 'Skill deleted successfully');
  } catch (error) {
    next(error);
  }
};
