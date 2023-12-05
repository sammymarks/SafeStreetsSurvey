const { Schema } = require("mongoose");

const TicketReview = new Schema(
    {
        ticket: { type: Schema.Types.ObjectId, ref: 'Ticket', required: true },
        reviewer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        status: { type: String, required: false },
        resolution: { type: String, required: false },
        comments: { type: String, required: false },
    },
    { timestamps: true }
)

module.exports = TicketReview