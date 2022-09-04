
const {Markup} = require('telegraf');

module.exports = async function(ctx) {
  return await ctx.replyWithHTML(`🚀 Основатель: <b>Самозанятый "Галиаскаров Артём Альбертович"</b>\n\n💼 <b>Основались в 2022 году</b>\n\n👌 <b>Отзывы:</b> @grecruiting_rates`, Markup.inlineKeyboard([Markup.button.url('📝 Договор-оферта', 'https://cloud.mail.ru/public/fBmH/aCF9ESjQR')]).oneTime().resize());
};