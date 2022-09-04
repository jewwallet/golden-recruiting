
const Manager = require('../models/Manager')


module.exports = {
  async addManager({userId, online = 0, lastOnline = new Date()}) {
      return await Manager.create({userId, online, lastOnline});
  },
  async existsManager({userId}) {
       return !!(await Manager.find({userId}))[0];
  },
  async getManager({userId}) {
      return (await Manager.find({userId}))[0];
  },
  async changeOnline({userId, online}) {
     return (await Manager.updateOne({userId}, {$set: {online, lastOnline: new Date()}}));
  },
  async getAvailableManagers() {
      return (await Manager.find({online: 1}));
  }
};