/**
 * About
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import bot from "@app/core/telegraf";
import { Markup } from "telegraf";
import translate from "@translations/translate";
import db from "@routes/api/database";
import telegram from "@routes/api/telegram";
import logger from "@app/functions/utils/logger";

/**
 * command: /about
 * =====================
 * Send welcome message
 *
 */
const about = async (): Promise<void> => {
	bot.command("about", async (ctx) => {
		logger.info("command: /about", "about.ts:about()");
		const lang = await db.settings.get({
			group_id: telegram.api.message.getChatID(ctx),
		});

		if (
			telegram.api.message.getText(ctx).trim() === "/about" ||
			telegram.api.message.getText(ctx).trim() === `/about@${telegram.api.bot.getUsername(ctx)}`
		) {
			await telegram.api.message.send(
				ctx,
				telegram.api.message.getChatID(ctx),
				translate(lang.language, "about_command_error"),
			);
		} else {
			const username = telegram.api.message.getText(ctx).replace("/about ", "").replace("@", "").trim();
			const account = await db.about.get({ username: username });
			if (
				account.username === "" ||
				(account.facebook === "" &&
					account.instagram === "" &&
					account.twitter === "" &&
					account.linkedin === "" &&
					account.tiktok === "" &&
					account.github === "" &&
					account.website === "")
			) {
				await telegram.api.message.send(
					ctx,
					telegram.api.message.getChatID(ctx),
					translate(lang.language, "about_command_user_not_found", {
						username: username,
						bot_nickname: telegram.api.bot.getUsername(ctx),
					}),
				);
			} else {
				try {
					await ctx.reply(
						translate(lang.language, "about_command_show_links", {
							username: username,
						}),
						Markup.inlineKeyboard([
							account.facebook !== ""
								? [
										Markup.button.url(
											translate(lang.language, "about_command_button_facebook"),
											account.facebook,
										),
								  ]
								: [],
							account.instagram !== ""
								? [
										Markup.button.url(
											translate(lang.language, "about_command_button_instagram"),
											account.instagram,
										),
								  ]
								: [],
							account.twitter !== ""
								? [
										Markup.button.url(
											translate(lang.language, "about_command_button_twitter"),
											account.twitter,
										),
								  ]
								: [],
							account.github !== ""
								? [
										Markup.button.url(
											translate(lang.language, "about_command_button_github"),
											account.github,
										),
								  ]
								: [],
							account.tiktok !== ""
								? [
										Markup.button.url(
											translate(lang.language, "about_command_button_tiktok"),
											account.tiktok,
										),
								  ]
								: [],
							account.linkedin !== ""
								? [
										Markup.button.url(
											translate(lang.language, "about_command_button_linkedin"),
											account.linkedin,
										),
								  ]
								: [],
							account.website !== ""
								? [
										Markup.button.url(
											translate(lang.language, "about_command_button_website"),
											account.website,
										),
								  ]
								: [],
						]),
					);
				} catch (err) {
					console.log(err);
				}
			}
		}
	});
};

export { about };
export default about;
