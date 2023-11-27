const { Schema } = require("mongoose");

const TicketImage = new Schema(
    {
        ticket: { type: Schema.Types.ObjectId, ref: 'Ticket', required: true },
        imageDataBase64: { type: String, required: true },
    },
    { timestamps: true }
)

module.exports = TicketImage