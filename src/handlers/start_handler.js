
const {addClient, existsClient, getClient} = require('../db_controllers/client_controller')
const {addManager, existsManager, getManager} = require('../db_controllers/manager_controller')
const InlineKeyboard = require('../keyboard/InlineKeyboard');
const Keyboard = require('../keyboard/Keyboard');

module.exports = async function (ctx) {
    const userId = ctx.update.message.from.id;
    const userName = ctx.update.message.from.first_name;
    const startPayload = ctx.startPayload;

    const clientKeyboard = new Keyboard();
    const managerKeyboard = new Keyboard();


    managerKeyboard.addBtn('Личный кабинет');

    clientKeyboard
        .addBtn('Личный кабинет')
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

    if (startPayload === 'manager') {

       const inlineManagerKeyboard = new InlineKeyboard();

       inlineManagerKeyboard.addCallbackBtn(['Начать работу', 'start_work']);

        await addManager({userId});
        const currentManager = await getManager({userId});
        await ctx.replyWithHTML(`🎉 <b>Добро пожаловать в нашу дружную команду!</b> 🎉`, managerKeyboard.keyboard);
       return await ctx.replyWithHTML(`👋🏻 <b>Привет, <a href="tg://user?id=${userId}">${userName}</a>!</b> 👋🏻\n\n🆔 <code>${userId}</code>\n\n<b>${currentManager.online ? '🟢 online' : '🔴 offline'}</b>\n\n❓ <b>Основная и дополнительная информация:</b> @grecruiting`, inlineManagerKeyboard.keyboard);

    } else {
        await ctx.replyWithHTML(`<b>ВАШЕ РЕЗЮМЕ НЕ ЧИТАЮТ И ТЫ ПОЛУЧАЕШЬ ОТКАЗЫ❓
ИЛИ МОЖЕТ ВАШЕМУ БИЗНЕСУ НУЖНЫ СОТРУДНИКИ</b>❓

✅ <b>РЕШИМ ВАШУ ПРОБЛЕМУ ЗА КРАТЧАЙШИЕ СРОКИ</b>

<b>ДЛЯ НАЧАЛА ДАВАЙТЕ ПОЗНАКОМИМСЯ</b> 😌

Golden Recruiting - Группа экспертов, цель которых помочь людям найти подходящее место работы.

Устали работать в найме и ушли в соло-проект :)

На рынке мы недавно и это не мешает нам иметь отзывы о нашей работе 😉 (@grecruiting_rates)`, clientKeyboard.keyboard);
        await ctx.replyWithHTML(`<b>КАКИЕ УСЛУГИ МЫ ПРЕДОСТАВЛЯЕМ И ОКАЗЫВАЕМ </b>❓

💼 <b>Аудит вашего резюме (Разбор резюме)</b> 

ЧТО ПОЛУЧАЕТЕ, ПРИОБРЕТАЯ ЭТУ УСЛУГУ❓

✅ <b>Отчёт о конкурентоспособности вашего резюме на рынке труда, персональные рекомендации по исправлению резюме с учетом ваших целей. Объём отчета - 1-3 страницы формата А4.</b>  


💼 <b>Составление резюме под ключ</b>

ЧТО ПОЛУЧАЕТЕ, ПРИОБРЕТАЯ ЭТУ УСЛУГУ❓

✅ <b>Персональные и индивидуальные консультации с опытным мастером, создание подходящего резюме под должность, исходя из ваших навыков, опыта, образования.</b>

❗️Пользуясь ботом, вы соглашаетесь с <a href="https://cloud.mail.ru/public/fBmH/aCF9ESjQR">договором-оферты.</a>\n
🚀 <b>Для приобретения услуги или консультации нажмите на кнопку "Запросить консультацию"</b>`, {
            disable_web_page_preview: true
        });
        await addClient({userId, traffic_source: startPayload || 'raw'});
        const currentClient = await getClient({userId});
        const keyboard = new InlineKeyboard();
        keyboard.addCallbackBtn(['🚀 Запросить консультацию 🚀', 'show_consults']);
        return await ctx.replyWithHTML(`👋🏻 <b>Привет, <a href="tg://user?id=${userId}">${userName}</a>!</b> 👋🏻\n\n🆔 <code>${userId}</code>\n\n🎁 <b>Персональная скидка: ${currentClient.personal_sale}%</b>\n\n❓ <b>Основная и дополнительная информация:</b> @grecruiting`, keyboard.keyboard);
    }
};