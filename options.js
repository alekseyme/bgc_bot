export const eventsOptions = {
	reply_markup: JSON.stringify({
		inline_keyboard: [
			// [{ text: 'Мои игры', callback_data: 'myGames' }],
			[{ text: 'Собираю на игру', callback_data: 'newGameRoom' }],
			// [{ text: 'Записаться на игру', callback_data: 'subscribeOnGame' }],
		],
	}),
};

export const disableWebPagePreview = {
	disable_web_page_preview: true,
};

export const createNewEventOptions = {
	reply_markup: JSON.stringify({
		inline_keyboard: [[{ text: 'Опубликовать', callback_data: 'createNewEvent' }]],
	}),
};

export const forceReply = {
	reply_markup: {
		force_reply: true,
	},
};
