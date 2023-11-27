const { Schema } = require("mongoose");

const Project = new Schema(
    {
        organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        zoneCount: { type: String, required: false },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        userParticipants: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
    },
    { timestamps: true }
)

module.exports = Project