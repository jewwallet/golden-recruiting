const Client = require('../models/Client')

module.exports = {
    async addClient({userId, traffic_source = 'raw', registered = new Date(), personal_sale = 10}) {
        return await Client.create({userId, traffic_source, registered, personal_sale})
    },
    async existsClient({userId}) {
        return !!(await Client.find({userId}))[0];
    },
    async getClient({userId}) {
            return (await Client.find({userId}))[0];
    }
};