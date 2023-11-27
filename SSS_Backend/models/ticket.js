const { Schema } = require("mongoose");

const Ticket = new Schema(
    {
        project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
        submittedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        addressLat: { type: String, required: true },
        addressLong: { type: String, required: true },
        issue: [{ type: String, required: true }],
        location: [{ type: String, required: true }],
        comments: { type: String, required: false },
        zone: { type: String, required: false },
    },
    { timestamps: true }
)

module.exports = Ticket