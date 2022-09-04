const {getClient} = require('../db_controllers/client_controller')
const {getProducts} = require('../db_controllers/product_controller')
const InlineKeyboard = require('../keyboard/InlineKeyboard');

module.exports = async function (ctx) {
       await ctx.answerCbQuery();
       await ctx.deleteMessage();

       const userId = ctx.update.callback_query.from.id;

       const keyboard = new InlineKeyboard();

       const products = await getProducts();

       for (const product of products) {
            keyboard.addCallbackBtn([product.name, `getconsult_${product._id}_${userId}`]);
       }

       keyboard.addCallbackBtn(['⬅️ Назад в ЛК', 'back']);

      await ctx.replyWithHTML(`<b>Выберите услугу, по которой хотите проконсультироваться</b>`, keyboard.keyboard);
};