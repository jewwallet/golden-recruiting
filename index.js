const mongoose = require('mongoose')
const bot = require('./src/bot');


const databaseURL = 'mongodb+srv://wineberg:wineberg@cluster0.xicqitn.mongodb.net/?retryWrites=true&w=majority'

const connectDatabase = async () => mongoose.connect(databaseURL);

const startBot = () => {
   try {
       bot.launch();
       console.log('connected')
   } catch  {
       console.log('restarted')
       startBot();
   }
};


connectDatabase();
startBot()



process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));