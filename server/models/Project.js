// Portfolio project schema

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        techStack: [String],
        liveUrl: { type: String, default: '' },
        githubUrl: { type: String, default: '' },
        coverImage: { type: String, default: '' },
        featured: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);