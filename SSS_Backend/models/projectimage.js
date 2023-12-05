const { Schema } = require("mongoose");

const ProjectImage = new Schema(
    {
        project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
        imageDataBase64: { type: String, required: true },
    },
    { timestamps: true }
)

module.exports = ProjectImage