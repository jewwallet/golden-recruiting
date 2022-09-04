const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
    userId: String,
    registered: Date,
    traffic_source: String,
    personal_sale: Number,
});

module.exports = mongoose.model('Client', ClientSchema);
