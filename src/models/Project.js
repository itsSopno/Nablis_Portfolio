import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a project title'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a project description'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please specify a category'],
      enum: ['fullstack', 'frontend', 'backend', 'mobile', 'ui-ux', 'other'],
      default: 'fullstack',
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    },
    tags: {
      type: [String],
      default: [],
    },
    liveUrl: {
      type: String,
      trim: true,
      default: '',
    },
    githubClient: {
      type: String,
      trim: true,
      default: '',
    },
    githubServer: {
      type: String,
      trim: true,
      default: '',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    tech: {
      type: Array,
      required: [true, 'Please provide tech'],
    },
    date: {
      type: String,
      required: [true, 'Please provide date'],
    },
    problems: {
      type: String,
      required: [true]
    },
    solutions: {
      type: String,
      required: [true]
    },
    challenges: {
      type: String,
      required: [true]
    }
  },
  {
    timestamps: true,
  }
);

// Helper: generate URL-safe slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Auto-generate slug before save (new docs OR title changed)
projectSchema.pre('save', function () {
  if (this.isNew || this.isModified('title')) {
    this.slug = generateSlug(this.title);
  }
});

export { generateSlug };

const Project = mongoose.model('Project', projectSchema);

export default Project;
