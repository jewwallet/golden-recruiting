const {getProductById} = require('../db_controllers/product_controller')
const {getClient} = require('../db_controllers/client_controller')

module.exports = async function (ctx) {

    await ctx.answerCbQuery();

    const userName = ctx.update.callback_query.from.first_name;

    const [, productId, clientId] = ctx.match.input.split('_');

    const currentClient = await getClient({userId: clientId});
    const currentProduct = await getProductById(productId);

    const availableManagers = global.listManagers;

    const manager = availableManagers.shift();

    if (currentClient.personal_sale > 0) {
        await ctx.telegram.sendMessage(manager.userId,`🔔 <b>НОВАЯ ЗАЯВКА</b>\n\n🙎‍♂️<b>Пользователь: <a href="tg://user?id=${currentClient.userId}">${userName}</a></b>\n\n💼 <b>Услуга:</b> ${currentProduct.name}\n\n💳 <b>Цена:</b> ${currentProduct.price * (100 - currentClient.personal_sale) / 100}`, {
            parse_mode: 'HTML'
        });
    } else {
        await ctx.telegram.sendMessage(manager.userId,`🔔 <b>НОВАЯ ЗАЯВКА</b>\n\n🙎‍♂️<b>Пользователь: <a href="tg://user?id=${currentClient.userId}">${userName}</a></b>\n\n💼 <b>Услуга:</b> ${currentProduct.name}\n\n💳 <b>Цена:</b> ${currentProduct.price}`, {
            parse_mode: 'HTML'
        });
    }
    return await ctx.replyWithHTML(`<b>Спасибо за ваш отклик! 😌</b>\n🕓 <b>Ожидайте ответ менеджера в течении 15 минут</b>`);
};