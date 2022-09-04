const {changeOnline, getManager} = require("../db_controllers/manager_controller");
const InlineKeyboard = require("../keyboard/InlineKeyboard");

module.exports = async function(ctx) {
    await ctx.answerCbQuery();
    await ctx.deleteMessage();

    const userId = ctx.update.callback_query.from.id;
    const userName = ctx.update.callback_query.from.first_name;

    await changeOnline({userId, online: 0});

    const inlineManagerKeyboard = new InlineKeyboard();

    inlineManagerKeyboard.addCallbackBtn(['Начать работу', 'start_work']);
    await ctx.telegram.sendMessage('-1001633114738', `🔔 <b>Менеджер <a href="tg://user?id=${userId}">${userName}</a> ушёл со смены</b>`, {
        parse_mode: 'HTML'
    });

    const findIndex = global.listManagers.find(manager => manager.userId == userId);

    global.listManagers.splice(findIndex, 1);

    return await ctx.replyWithHTML(`👋🏻 <b>Привет, <a href="tg://user?id=${userId}">${userName}</a>!</b> 👋🏻\n\n🆔 <code>${userId}</code>\n\n<b>🔴 offline</b>\n\n❓ <b>Основная и дополнительная информация:</b> @grecruiting`, inlineManagerKeyboard.keyboard);
};