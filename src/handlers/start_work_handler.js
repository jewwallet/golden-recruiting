
const {getManager, changeOnline} = require('../db_controllers/manager_controller');
const InlineKeyboard = require("../keyboard/InlineKeyboard");

module.exports = async function(ctx) {
    await ctx.answerCbQuery();
    await ctx.deleteMessage();

    const userId = ctx.update.callback_query.from.id;
    const userName = ctx.update.callback_query.from.first_name;

    await changeOnline({userId, online: 1});
    const inlineManagerKeyboard = new InlineKeyboard();

    const currentManager = await getManager({userId});

    inlineManagerKeyboard.addCallbackBtn(['Закончить работу', 'stop_work']);

    await ctx.telegram.sendMessage('-1001633114738', `🔔 <b>Менеджер <a href="tg://user?id=${userId}">${userName}</a> вышел на работу</b>`, {
        parse_mode: 'HTML'
    });
    return await ctx.replyWithHTML(`👋🏻 <b>Привет, <a href="tg://user?id=${userId}">${userName}</a>!</b> 👋🏻\n\n🆔 <code>${userId}</code>\n\n<b>🟢 online</b>\n\n❓ <b>Основная и дополнительная информация:</b> @grecruiting`, inlineManagerKeyboard.keyboard);
};