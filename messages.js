export const EVENT_MESSAGES = {
	cancel: 'Что ж, значит соберёмся поиграть с тобой в следующий раз..',
	whatGame:
		'Окей. Приступим.\nЕсли захочешь всё сбросить, напиши - /cancel\n\nНа какую игру собираем?',
	whatDay: 'Укажи дату события в формате дд.мм.гг',
	whatStartTime: 'В какое время планируется старт мероприятия?',
	whatEndTime: 'До какого времени планируется мероприятие?',
	whatPerson: 'Укажи количество человек, необходимое для партии. (можно диапазон, например 1-5)',
	whatPlace:
		'Где будем играть? Адрес/Место встречи.\nУкажи полный адрес места проведения (или без квартиры, если считаешь так нужным): улица, дом, подъезд, этаж, квартира. Всё, чтобы место было легче найти',
	whatOther:
		'Если хочешь, напиши здесь уточняющую информацию\n(как тебя проще найти, расскажи об игре, стоит ли планировать, что вы задержитесь, какие-либо нюансы). Если ничего не хочешь писать, поставь прочерк «-»',
	whatImg: 'Отправь картинку для поста',
	readyToPublish: 'Всё готово к публикации. Публикуем?',
	successPublish:
		'🎲 Пост успешно опубликован в <a href="https://t.me/+VjtidypD88g5NWFi">инфо канале</a>! Можешь наблюдать за записью в комментариях',
};

export const infoMessage = `
🎲 О сборах в Воронеже ты можешь узнать в <a href="https://t.me/+VjtidypD88g5NWFi">группе новостей</a>. Не отключай там звук, чтобы ничего не пропустить!\n
🎲 Так же у нас есть <a href="https://t.me/bni_voronezh">барахолка настольных игр Воронежа</a>. Внимательно читаем закреплённое сообщение с правилами выкладывания постов.
`;

export const startMessage = `
Привет!\nВот чем я могу тебе помочь:\n/help - обзор всех команд\n/info - полезные ссылки\n/new_event - если хочешь собрать людей на игру
`;

export const helpMessage = `
/info - полезные ссылки\n/new_event - если хочешь собрать людей на игру
`;

export const helloNewMemberMessage = (ctx) => {
	const newMember = ctx.update.message.new_chat_participant;
	const correctUserName = newMember.username
		? `@${newMember.username}`
		: `${newMember.first_name}`;
	return `
	Приветствуем тебя, дорогой друг, ${correctUserName}! Ты попал в чат настольщиков всего Воронежа. <a href="https://t.me/c/1417138525/39734">кликни</a>, чтобы прочитать важную информацию или пиши <a href="https://t.me/BGC_Voronezh_bot">мне</a>, чтобы узнать больше
	`;
};

export const getResultEvent = (ctx) => `
<b>Собирает:</b> @${ctx.wizard.state.data.username}\n
<b>Играем в:</b> ${ctx.wizard.state.data.game}
<b>Дата:</b> ${ctx.wizard.state.data.date}
<b>Время:</b> с ${ctx.wizard.state.data.startTime} до ${ctx.wizard.state.data.endTime}
<b>Кол-во людей:</b> ${ctx.wizard.state.data.person}
<b>Место:</b> ${ctx.wizard.state.data.place}\n
<b>Доп. инфо:</b> ${ctx.wizard.state.data.other}`;
