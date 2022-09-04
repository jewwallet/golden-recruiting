const {getClient} = require("../db_controllers/client_controller");
const InlineKeyboard = require("../keyboard/InlineKeyboard");

module.exports = async function(ctx) {
    await ctx.answerCbQuery();
    await ctx.deleteMessage();

    const userId = ctx.update.callback_query.from.id;
    const userName = ctx.update.callback_query.from.first_name;

    const currentClient = await getClient({userId});
    const keyboard = new InlineKeyboard();
    keyboard.addCallbackBtn(['🚀 Запросить консультацию 🚀', 'show_consults']);
    return await ctx.replyWithHTML(`👋🏻 <b>Привет, <a href="tg://user?id=${userId}">${userName}</a>!</b> 👋🏻\n\n🆔 <code>${userId}</code>\n\n🎁 <b>Персональная скидка: ${currentClient.personal_sale}%</b>\n\n❓ <b>Основная и дополнительная информация:</b> @grecruiting`, keyboard.keyboard);
}