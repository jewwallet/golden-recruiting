
const {existsClient, getClient} = require('../db_controllers/client_controller')
const {existsManager, getManager} = require('../db_controllers/manager_controller')
const Keyboard = require("../keyboard/Keyboard");
const InlineKeyboard = require("../keyboard/InlineKeyboard");

module.exports = async function(ctx) {
    const userId = ctx.update.message.from.id;
    const userName = ctx.update.message.from.first_name;

    const clientKeyboard = new Keyboard();
    const managerKeyboard = new Keyboard();


    managerKeyboard.addBtn('Личный кабинет')
        .addBtn('Справочная информация');

    clientKeyboard.addBtn('Личный кабинет')
        .addBtn('Услуги')
        .addBtn('Информация');


    if (await existsClient({userId})) {
        const currentClient = await getClient({userId});
        const keyboard = new InlineKeyboard();
        keyboard.addCallbackBtn(['🚀 Запросить консультацию 🚀', 'show_consults']);
        return await ctx.replyWithHTML(`👋🏻 <b>Привет, <a href="tg://user?id=${userId}">${userName}</a>!</b> 👋🏻\n\n🆔 <code>${userId}</code>\n\n🎁 <b>Персональная скидка: ${currentClient.personal_sale}%</b>\n\n❓ <b>Основная и дополнительная информация:</b> @grecruiting`, keyboard.keyboard);
    }

    if (await existsManager({userId})) {
        const inlineManagerKeyboard = new InlineKeyboard();

        const currentManager = await getManager({userId});

        if (!currentManager.online) {
            inlineManagerKeyboard.addCallbackBtn(['Начать работу', 'start_work']);
        } else {
            inlineManagerKeyboard.addCallbackBtn(['Закончить работу', 'stop_work']);
        }

        return await ctx.replyWithHTML(`👋🏻 <b>Привет, <a href="tg://user?id=${userId}">${userName}</a>!</b> 👋🏻\n\n🆔 <code>${userId}</code>\n\n<b>${currentManager.online ? '🟢 online' : '🔴 offline'}</b>\n\n❓ <b>Основная и дополнительная информация:</b> @grecruiting`, inlineManagerKeyboard.keyboard);
    }

};