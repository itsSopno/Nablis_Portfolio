import Message from '../models/Message.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import { sendContactEmail } from '../services/emailService.js';

// @desc    Submit new contact inquiry
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return sendError(res, 'Name, email, and message are required fields', 400);
    }

    const newMessage = await Message.create({
      name,
      email,
      subject: subject || 'Portfolio Inquiry',
      message,
    });

    // Send email notification in background (non-blocking)
    sendContactEmail({ name, email, subject, message }).catch((err) => {
      console.warn('Email dispatch warning:', err.message);
    });

    return sendSuccess(
      res,
      'Thank you! Your message has been sent successfully.',
      {
        id: newMessage._id,
        createdAt: newMessage.createdAt,
      },
      201
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private
export const getMessages = async (req, res, next) => {
  try {
    const { isRead, sort = '-createdAt' } = req.query;
    const filter = {};

    if (isRead !== undefined) {
      filter.isRead = isRead === 'true';
    }

    const messages = await Message.find(filter).sort(sort);
    const unreadCount = await Message.countDocuments({ isRead: false });

    return sendSuccess(res, 'Messages retrieved', {
      total: messages.length,
      unreadCount,
      messages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single contact message by ID
// @route   GET /api/contact/:id
// @access  Private
export const getMessageById = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return sendError(res, 'Message not found', 404);
    }

    // Auto mark as read on view
    if (!message.isRead) {
      message.isRead = true;
      await message.save();
    }

    return sendSuccess(res, 'Message retrieved', message);
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle mark message as read / unread
// @route   PATCH /api/contact/:id/read
// @access  Private
export const toggleReadStatus = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return sendError(res, 'Message not found', 404);
    }

    message.isRead = req.body.isRead !== undefined ? req.body.isRead : !message.isRead;
    await message.save();

    return sendSuccess(res, 'Message status updated', message);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private
export const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return sendError(res, 'Message not found', 404);
    }

    return sendSuccess(res, 'Message deleted successfully');
  } catch (error) {
    next(error);
  }
};
