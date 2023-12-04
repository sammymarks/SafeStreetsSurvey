const { Schema } = require("mongoose");

const OrganizationImage = new Schema(
    {
        organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
        imageDataBase64: { type: String, required: true },
    },
    { timestamps: true }
)

module.exports = OrganizationImage