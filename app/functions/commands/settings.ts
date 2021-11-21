/**
 * Settings
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import { InlineKeyboard } from "grammy";
import bot from "@app/core/token";
import translate from "@translations/translate";
import db from "@routes/api/database";
import telegram from "@routes/api/telegram";
import logger from "@app/functions/utils/logger";

/**
 * command: /settings
 * =====================
 * Set language
 *
 */
const settings = async (): Promise<void> => {
	bot.command("settings", async (ctx) => {
		logger.info("command: /settings", "settings.ts:settings()");
		const lang = await db.settings.get({
			group_id: telegram.api.message.getChatID(ctx),
		});

		const buttons = new InlineKeyboard();

		buttons.text(translate(lang.language, "settings_command_setlanguage"), "settings_languages");
		buttons.row();
		buttons.url(
			translate(lang.language, "settings_command_opensource"),
			"https://github.com/ptkdev/aboutmeinfo-telegram-bot",
		);
		buttons.row();
		buttons.text(translate(lang.language, "settings_command_credits"), "settings_credits");
		buttons.row();
		buttons.url(
			translate(lang.language, "settings_command_email"),
			translate(lang.language, "settings_command_help"),
		);

		await ctx.reply(translate(lang.language, "settings_command_options"), {
			reply_markup: buttons,
		});
	});

	bot.callbackQuery("settings_languages", async (ctx) => {
		const lang = await db.settings.get({
			group_id: telegram.api.message.getChatID(ctx),
		});

		const buttons = new InlineKeyboard();
		buttons.text(translate(lang.language, "settings_command_language_english"), "settings_set_english");
		buttons.text(translate(lang.language, "settings_command_language_italian"), "settings_set_italian");

		await ctx.reply(translate(lang.language, "settings_command_switchlanguage"), {
			reply_markup: buttons,
		});
	});

	bot.callbackQuery("settings_credits", async (ctx) => {
		const lang = await db.settings.get({
			group_id: telegram.api.message.getChatID(ctx),
		});

		const buttons = new InlineKeyboard();

		buttons.url(translate(lang.language, "settings_command_ptkdev"), "https://ptk.dev");
		buttons.row();
		buttons.url(translate(lang.language, "settings_command_ali"), "https://github.com/alishadman95/");

		await ctx.reply(translate(lang.language, "settings_command_credits"), {
			reply_markup: buttons,
		});
	});

	bot.callbackQuery("settings_set_english", async (ctx) => {
		const lang = await db.settings.get({
			group_id: telegram.api.message.getChatID(ctx),
		});

		if (lang.group_id !== 0) {
			await db.settings.update(
				{ group_id: telegram.api.message.getChatID(ctx) },
				{ group_id: telegram.api.message.getChatID(ctx), language: "en", pin_message: lang.pin_message },
			);
		} else {
			await db.settings.add({
				group_id: telegram.api.message.getChatID(ctx),
				language: "en",
				pin_message: lang.pin_message,
			});
		}

		await telegram.api.message.send(
			ctx,
			telegram.api.message.getChatID(ctx),
			translate(lang.language, "settings_command_current_english"),
		);
	});

	bot.callbackQuery("settings_set_italian", async (ctx) => {
		const lang = await db.settings.get({
			group_id: telegram.api.message.getChatID(ctx),
		});

		if (lang.group_id !== 0) {
			await db.settings.update(
				{ group_id: telegram.api.message.getChatID(ctx) },
				{ group_id: telegram.api.message.getChatID(ctx), language: "it", pin_message: lang.pin_message },
			);
		} else {
			await db.settings.add({
				group_id: telegram.api.message.getChatID(ctx),
				language: "it",
				pin_message: lang.pin_message,
			});
		}

		await telegram.api.message.send(
			ctx,
			telegram.api.message.getChatID(ctx),
			translate(lang.language, "settings_command_current_italian"),
		);
	});
};

export { settings };
export default settings;
