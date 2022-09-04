const mongoose = require('mongoose');

const ManagerSchema = new mongoose.Schema({
   userId: String,
   online: Number, // 1 - вышел на работу, 0 - вышел со смены
   lastOnline: Date,
});

module.exports = mongoose.model('Manager', ManagerSchema)
