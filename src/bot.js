const {Telegraf} = require('telegraf');

const startHandler = require('./handlers/start_handler');
const showConsultsHandler = require('./handlers/show_consults_handler')
const backHandler = require('./handlers/back_handler');
const getConsultHandler = require('./handlers/getconsult_handler')
const startWorkHandler = require('./handlers/start_work_handler');
const stopWorkHandler = require('./handlers/stop_work_handler');
const uslugiHandler = require('./handlers/uslugi_handler');
const lkHandler = require('./handlers/lk_handler');
const infoHandler = require('./handlers/info_handler')

const {getAvailableManagers} = require('./db_controllers/manager_controller');
const token = '5621970733:AAHfU8z_vA397ptzGEBBulOMv5lsVccWEs0';




const listManagers = [];

global.listManagers = listManagers;

setInterval(async function checking () {
    try {
        const availableManagers = [...await getAvailableManagers()];

        if (!availableManagers.length) {
            listManagers.length = 0;
        }

        for (const manager of availableManagers) {
            const findedIndex = listManagers.findIndex(user => user.userId === manager.userId);

            console.log(findedIndex)

            if (findedIndex >= 0 && manager.online == 0) {
                console.log(listManagers.splice(findedIndex, 1));
            } else if (findedIndex === -1 && manager.online) {
                listManagers.push(manager);
            }
        }
        console.log(`Длина массива: ${listManagers.length}`)
    } catch {
        checking();
    }
}, 3000);

const bot = new Telegraf(token);

bot.start(startHandler);

bot.hears('Услуги', uslugiHandler);
bot.hears('Личный кабинет', lkHandler);
bot.hears('Информация', infoHandler);

bot.action('show_consults', showConsultsHandler);
bot.action('back', backHandler);
bot.action(/getconsult_\d/gi, getConsultHandler);
bot.action('start_work', startWorkHandler);
bot.action('stop_work', stopWorkHandler)




module.exports = bot;
