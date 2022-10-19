import { Markup, Scenes, Composer } from 'telegraf';
import { EVENT_MESSAGES, getResultEvent } from '../messages.js';
import { disableWebPagePreview } from '../options.js';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import 'dayjs/locale/ru.js';

dayjs.locale('ru');
dayjs.extend(customParseFormat);

const checkRequires = async (ctx) => {
	if (ctx.message.text === '/cancel') {
		await ctx.reply(EVENT_MESSAGES.cancel);
		return ctx.scene.leave();
	}
	if (ctx.message.text[0] === '/') {
		return ctx.deleteMessage();
	}
};

const CHANNEL_ID = '-1001676895168';

const whatGame = new Composer();
whatGame.on(['sticker', 'audio', 'video', 'voice', 'document', 'gif', 'photo'], async (ctx) => {
	return ctx.deleteMessage();
});
whatGame.on('text', async (ctx) => {
	try {
		console.log(ctx.wizard.state);

		ctx.wizard.state.data = {};
		ctx.wizard.state.data.username = ctx.message.from.username;

		await ctx.reply(EVENT_MESSAGES.whatGame);
		return ctx.wizard.next();
	} catch (error) {
		console.log(error);
	}
});

const whatDay = new Composer();
whatDay.on(['sticker', 'audio', 'video', 'voice', 'document', 'gif', 'photo'], async (ctx) => {
	return ctx.deleteMessage();
});
whatDay.on('text', async (ctx) => {
	try {
		if (ctx.message.text === '/cancel') {
			await ctx.reply(EVENT_MESSAGES.cancel);
			return ctx.scene.leave();
		}
		if (ctx.message.text[0] === '/') {
			return ctx.deleteMessage();
		}
		ctx.wizard.state.data.game = ctx.message.text;

		console.log(ctx.wizard.state);

		await ctx.reply(EVENT_MESSAGES.whatDay);
		return ctx.wizard.next();
	} catch (error) {
		console.log(error);
	}
});

const whatStartTime = new Composer();
whatStartTime.on(
	['sticker', 'audio', 'video', 'voice', 'document', 'gif', 'photo'],
	async (ctx) => {
		return ctx.deleteMessage();
	},
);
whatStartTime.on('text', async (ctx) => {
	try {
		if (ctx.message.text === '/cancel') {
			await ctx.reply(EVENT_MESSAGES.cancel);
			return ctx.scene.leave();
		}
		if (ctx.message.text[0] === '/') {
			return ctx.deleteMessage();
		}

		if (!dayjs(ctx.message.text, 'DD.MM.YY', 'ru', true).isValid()) {
			return ctx.deleteMessage();
		}

		const inputDate = ctx.message.text.split('.');
		const date = dayjs(`${inputDate[1]}.${inputDate[0]}.${inputDate[2]}`);
		ctx.wizard.state.data.date = date.format('D.MM (D MMM, dddd)');

		console.log(ctx.wizard.state);

		await ctx.reply(EVENT_MESSAGES.whatStartTime);
		return ctx.wizard.next();
	} catch (error) {
		console.log(error);
	}
});

const whatEndTime = new Composer();
whatEndTime.on(['sticker', 'audio', 'video', 'voice', 'document', 'gif', 'photo'], async (ctx) => {
	return ctx.deleteMessage();
});
whatEndTime.on('text', async (ctx) => {
	try {
		if (ctx.message.text === '/cancel') {
			await ctx.reply(EVENT_MESSAGES.cancel);
			return ctx.scene.leave();
		}
		if (ctx.message.text[0] === '/') {
			return ctx.deleteMessage();
		}

		ctx.wizard.state.data.startTime = ctx.message.text;

		console.log(ctx.wizard.state);

		await ctx.reply(EVENT_MESSAGES.whatEndTime);
		return ctx.wizard.next();
	} catch (error) {
		console.log(error);
	}
});

const whatPerson = new Composer();
whatPerson.on(['sticker', 'audio', 'video', 'voice', 'document', 'gif', 'photo'], async (ctx) => {
	return ctx.deleteMessage();
});
whatPerson.on('text', async (ctx) => {
	try {
		if (ctx.message.text === '/cancel') {
			await ctx.reply(EVENT_MESSAGES.cancel);
			return ctx.scene.leave();
		}
		if (ctx.message.text[0] === '/') {
			return ctx.deleteMessage();
		}

		ctx.wizard.state.data.endTime = ctx.message.text;

		console.log(ctx.wizard.state);

		await ctx.reply(EVENT_MESSAGES.whatPerson);
		return ctx.wizard.next();
	} catch (error) {
		console.log(error);
	}
});

const whatPlace = new Composer();
whatPlace.on(['sticker', 'audio', 'video', 'voice', 'document', 'gif', 'photo'], async (ctx) => {
	return ctx.deleteMessage();
});
whatPlace.on('text', async (ctx) => {
	try {
		if (ctx.message.text === '/cancel') {
			await ctx.reply(EVENT_MESSAGES.cancel);
			return ctx.scene.leave();
		}
		if (ctx.message.text[0] === '/') {
			return ctx.deleteMessage();
		}

		ctx.wizard.state.data.person = ctx.message.text;

		console.log(ctx.wizard.state);

		await ctx.reply(EVENT_MESSAGES.whatPlace);
		return ctx.wizard.next();
	} catch (error) {
		console.log(error);
	}
});

const whatOther = new Composer();
whatOther.on(['sticker', 'audio', 'video', 'voice', 'document', 'gif', 'photo'], async (ctx) => {
	return ctx.deleteMessage();
});
whatOther.on('text', async (ctx) => {
	try {
		if (ctx.message.text === '/cancel') {
			await ctx.reply(EVENT_MESSAGES.cancel);
			return ctx.scene.leave();
		}
		if (ctx.message.text[0] === '/') {
			return ctx.deleteMessage();
		}

		ctx.wizard.state.data.place = ctx.message.text;

		console.log(ctx.wizard.state);

		await ctx.reply(EVENT_MESSAGES.whatOther);
		return ctx.wizard.next();
	} catch (error) {
		console.log(error);
	}
});

const whatImg = new Composer();
whatImg.on(['sticker', 'audio', 'video', 'voice', 'document', 'gif', 'photo'], async (ctx) => {
	return ctx.deleteMessage();
});
whatImg.on('text', async (ctx) => {
	try {
		if (ctx.message.text === '/cancel') {
			await ctx.reply(EVENT_MESSAGES.cancel);
			return ctx.scene.leave();
		}
		if (ctx.message.text[0] === '/') {
			return ctx.deleteMessage();
		}
		ctx.wizard.state.data.other = ctx.wizard.state.data.other
			? ctx.wizard.state.data.other
			: ctx.message.text;

		console.log(ctx.wizard.state);

		await ctx.reply(
			EVENT_MESSAGES.whatImg,
			Markup.inlineKeyboard([[Markup.button.callback('Продолжить без фото', 'wo_photo')]]),
		);
		return ctx.wizard.next();
	} catch (error) {
		console.log(error);
	}
});

const resultStep = new Composer();
resultStep.on(['text', 'sticker', 'audio', 'video', 'voice', 'document', 'gif'], async (ctx) => {
	return ctx.deleteMessage();
});
resultStep.on(['photo'], async (ctx) => {
	try {
		ctx.wizard.state.data.img = ctx.message.photo[0].file_id;
		console.log(ctx.wizard.state);

		await ctx.reply(
			EVENT_MESSAGES.readyToPublish,
			Markup.inlineKeyboard([[Markup.button.callback('Опубликовать', 'store_game')]]),
		);
	} catch (error) {
		console.log(error);
	}
});

resultStep.action('wo_photo', async (ctx) => {
	try {
		await ctx.answerCbQuery();
		if (!ctx.wizard.state.data.img) {
			ctx.wizard.state.data.img = 'none';
			console.log(ctx.wizard.state);

			return ctx.reply(
				EVENT_MESSAGES.readyToPublish,
				Markup.inlineKeyboard([[Markup.button.callback('Опубликовать', 'store_game')]]),
			);
		}
		return;
	} catch (error) {
		console.log(error);
	}
});

resultStep.action('store_game', async (ctx) => {
	try {
		await ctx.answerCbQuery();
		const resultReply = getResultEvent(ctx);
		if (ctx.wizard.state.data.img !== 'none') {
			await ctx.telegram.sendPhoto(CHANNEL_ID, ctx.wizard.state.data.img, {
				caption: resultReply,
				parse_mode: 'HTML',
			});
			await ctx.replyWithHTML(EVENT_MESSAGES.successPublish, disableWebPagePreview);
		} else {
			await ctx.telegram.sendMessage(CHANNEL_ID, resultReply, {
				parse_mode: 'HTML',
			});
			await ctx.replyWithHTML(EVENT_MESSAGES.successPublish, disableWebPagePreview);
		}
		return ctx.scene.leave();
	} catch (error) {
		console.log(error);
	}
});

export const newEventScene = new Scenes.WizardScene(
	'newEventWizard',
	whatGame,
	whatDay,
	whatStartTime,
	whatEndTime,
	whatPerson,
	whatPlace,
	whatOther,
	whatImg,
	resultStep,
);
