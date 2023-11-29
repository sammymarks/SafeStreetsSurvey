const { Schema } = require("mongoose");

//Extract information from Auth0 token, push it to the databse UserSchema
//Includes sub, given_name, nickname, etc.""

const UserSchema = new Schema(
    {
        auth0Sub: {type: String, required: true },
        username: {type: String, required: true },
        address: { type: String, required: false },
        phone: { type: String, required: false },
        email: { type: String, required: false },
        isSiteAdmin: { type: Boolean, required: true },
        isOrgAdmin: { type: Boolean, required: true },
    },
    { timestamps: true }
)

module.exports = UserSchema