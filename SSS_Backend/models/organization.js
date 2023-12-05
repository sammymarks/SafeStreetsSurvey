const { Schema } = require("mongoose");

const OrganizationSchema = new Schema(
    {
        orgAdmins: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
        orgName: { type: String, required: true },
        orgDescription: { type: String, required: false },
        orgEmail: { type: String, required: false },
        orgPhone: { type: String, required: false },
        orgAddress: { type: String, required: false },
        orgWebsite: { type: String, required: false },
        orgUserFollowers: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
    },
    { timestamps: true }
)

module.exports = OrganizationSchema 