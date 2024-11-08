const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    adminID: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
});

// Apply the auto-incrementing plugin to the admin schema
adminSchema.plugin(AutoIncrement, { inc_field: 'adminID' });

const AdminModel = mongoose.model('admins', adminSchema);
module.exports = AdminModel;
