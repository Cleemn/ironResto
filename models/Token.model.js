const { Schema, model } = require('mongoose');
require("./User.model");

const tokenSchema = new Schema({
    _userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    expireAt: { type: Date, default: Date.now, index: { expires: 86400000 } }
});

module.exports = model('Token', tokenSchema);