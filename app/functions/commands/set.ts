/**
 * Set
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import { Markup } from "telegraf";
import bot from "@app/core/telegraf";
import translate from "@translations/translate";
import db from "@routes/api/database";
import telegram from "@routes/api/telegram";
import logger from "@app/functions/utils/logger";

/**
 * command: /set
 * =====================
 * Change buttons value
 *
 */
const set = async (): Promise<void> => {
	bot.command("set", async (ctx) => {
		logger.info("command: /set", "set.ts:set()");
		const lang = await db.settings.get({
			group_id: telegram.api.message.getChatID(ctx),
		});
		// is group
		if (telegram.api.message.getChatID(ctx) < 0) {
			await telegram.api.message.send(
				ctx,
				telegram.api.message.getChatID(ctx),
				translate(lang.language, "start_command_intro_group", {
					bot_nickname: telegram.api.bot.getUsername(ctx),
				}),
			);
		} else {
			await ctx.reply(
				translate(lang.language, "set_select_button"),
				Markup.inlineKeyboard([
					[
						Markup.button.callback(
							translate(lang.language, "about_command_button_facebook"),
							"set_facebook",
						),
						Markup.button.callback(
							translate(lang.language, "about_command_button_instagram"),
							"set_instagram",
						),
						Markup.button.callback(translate(lang.language, "about_command_button_twitter"), "set_twitter"),
					],

					[
						Markup.button.callback(translate(lang.language, "about_command_button_tiktok"), "set_tiktok"),
						Markup.button.callback(translate(lang.language, "about_command_button_steam"), "set_steam"),
					],
					[
						Markup.button.callback(
							translate(lang.language, "about_command_button_onlyfans"),
							"set_onlyfans",
						),
						Markup.button.callback(translate(lang.language, "about_command_button_amazon"), "set_amazon"),
					],
					[
						Markup.button.callback(translate(lang.language, "about_command_button_github"), "set_github"),
						Markup.button.callback(
							translate(lang.language, "about_command_button_linkedin"),
							"set_linkedin",
						),
						Markup.button.callback(translate(lang.language, "about_command_button_website"), "set_website"),
					],
				]),
			);
		}
	});

	bot.action(/^(set_\w*)$/, async (ctx) => {
		const lang = await db.settings.get({
			group_id: telegram.api.message.getChatID(ctx),
		});

		const about = await db.about.get({
			id: telegram.api.message.getUserID(ctx),
		});

		about.step = ctx.match[0];

		await db.about.update({ id: about.id }, about);

		await telegram.api.message.send(
			ctx,
			telegram.api.message.getChatID(ctx),
			translate(lang.language, `set_command_${about.step.replace("set_", "")}`),
		);
	});
};

export { set };
export default set;
