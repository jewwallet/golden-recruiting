
const {getProducts} = require('../db_controllers/product_controller')
const {getClient} = require('../db_controllers/client_controller')
const InlineKeyboard = require('../keyboard/InlineKeyboard')

module.exports = async function(ctx) {

    const userId = ctx.update.message.from.id;

    const currentClient = await getClient({userId})
    const products = await getProducts();

    for (const product of products) {

        const keyboard = new InlineKeyboard();
        keyboard.addCallbackBtn(['🚀 Запросить консультацию 🚀', `getconsult_${product._id}_${userId}`])
        if (currentClient.personal_sale > 0) {
            await ctx.replyWithHTML(`💼 <b>${product.name}</b>\n\n✅ <b>${product.description}</b>\n\n💳 Цена: <b>${product.price * (100 - currentClient.personal_sale) / 100}₽</b> <s>${product.price}₽</s>`, keyboard.keyboard);
        } else {
            await ctx.replyWithHTML(`💼 <b>${product.name}</b>\n\n✅ <b>${product.description}</b>\n\n💳 Цена: <b>${product.price}₽`, keyboard.keyboard);
        }

    }
};