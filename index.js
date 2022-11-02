import * as dotenv from 'dotenv';
import { Telegraf, Scenes, session } from 'telegraf';
import { newEventScene } from './scenes/newEvent.js';
import { helloNewMemberMessage, helpMessage, infoMessage, startMessage } from './messages.js';
import { disableWebPagePreview } from './options.js';
import { generateRandomPhrase } from './phrases.js';
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const stage = new Scenes.Stage([newEventScene]);
bot.use(session());
bot.use(stage.middleware());

bot.telegram.setMyCommands(
	[
		{ command: '/help', description: 'Помощь' },
		{ command: '/info', description: 'Полезные ссылки' },
		{ command: '/new_event', description: 'Создать объявление о сборе на игру' },
	],
	{
		scope: JSON.stringify({
			type: 'all_private_chats',
		}),
	},
);

bot.hears(
	(text) => {
		return text.toLowerCase() === 'где бот';
	},
	(ctx) => {
		const isPrivate = ctx.message.chat.type === 'private';
		if (isPrivate) {
			return;
		}
		ctx.reply(`Я здесь`);
		// ctx.reply(`Я здесь. ${generateRandomPhrase()}`);
	},
);

bot.start((ctx) => {
	const isPrivate = ctx.message.chat.type === 'private';
	if (!isPrivate) {
		return;
	}
	ctx.reply(startMessage);
});

bot.help(async (ctx) => {
	const isPrivate = ctx.message.chat.type === 'private';
	if (!isPrivate) {
		return;
	}
	ctx.reply(helpMessage);
});

bot.command('new_event', (ctx) => {
	const isPrivate = ctx.message.chat.type === 'private';
	if (!isPrivate) {
		return;
	}
	ctx.scene.enter('newEventWizard');
});

bot.command('info', async (ctx) => {
	const isPrivate = ctx.message.chat.type === 'private';
	if (!isPrivate) {
		return;
	}
	try {
		await ctx.replyWithHTML(infoMessage, disableWebPagePreview);
	} catch (error) {
		console.log(error);
	}
});

// Приветствие нового пользователя в чате
bot.on('new_chat_members', async (ctx) => {
	await ctx.replyWithHTML(helloNewMemberMessage(ctx), disableWebPagePreview);
	return ctx.replyWithSticker(
		'CAACAgIAAxUAAWMZsncx2sW_H8sUIYO_8UERl_7PAALdFwAC7pr5SU4rnuOnZivCKQQ',
	);
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
