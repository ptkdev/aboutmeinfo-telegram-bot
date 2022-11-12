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
import bot from "@app/core/token";
import { InlineKeyboard } from "grammy";
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
			const current_user = telegram.api.message.getUsername(ctx);

			const account = await db.about.get({
				username: {
					$regex: new RegExp(username, "i"),
				},
			});

			if (
				account.username === "" ||
				(account.facebook === "" &&
					account.instagram === "" &&
					account.twitter === "" &&
					account.linkedin === "" &&
					account.youtube === "" &&
					account.discord === "" &&
					account.tiktok === "" &&
					account.steam === "" &&
					account.onlyfans === "" &&
					account.amazon === "" &&
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
			} else if (account.privacy !== "") {
				let privacy = 0;
				account.privacy.split(",").map((item) => {
					if (item.trim().replace("@", "") === current_user) {
						privacy++;
					}
				});

				if (privacy > 0) {
					await telegram.api.message.send(
						ctx,
						telegram.api.message.getChatID(ctx),
						translate(lang.language, "hears_command_privacy_not_auth", {
							username: username,
							bot_nickname: telegram.api.bot.getUsername(ctx),
						}),
					);
				}
			} else {
				try {
					const buttons = new InlineKeyboard();

					account.facebook !== "" &&
						buttons.url(translate(lang.language, "about_command_button_facebook"), account.facebook).row();

					account.instagram !== "" &&
						buttons
							.url(translate(lang.language, "about_command_button_instagram"), account.instagram)
							.row();

					account.twitter !== "" &&
						buttons.url(translate(lang.language, "about_command_button_twitter"), account.twitter).row();

					account.github !== "" &&
						buttons.url(translate(lang.language, "about_command_button_github"), account.github).row();

					account.tiktok !== "" &&
						buttons.url(translate(lang.language, "about_command_button_tiktok"), account.tiktok).row();

					account.linkedin !== "" &&
						buttons.url(translate(lang.language, "about_command_button_linkedin"), account.linkedin).row();

					account.youtube !== "" &&
						buttons.url(translate(lang.language, "about_command_button_youtube"), account.youtube).row();

					account.discord !== "" &&
						buttons.url(translate(lang.language, "about_command_button_discord"), account.discord).row();

					account.steam !== "" &&
						buttons.url(translate(lang.language, "about_command_button_steam"), account.steam).row();

					account.onlyfans !== "" &&
						buttons.url(translate(lang.language, "about_command_button_onlyfans"), account.onlyfans).row();

					account.amazon !== "" &&
						buttons.url(translate(lang.language, "about_command_button_amazon"), account.amazon).row();

					account.website !== "" &&
						buttons.url(translate(lang.language, "about_command_button_website"), account.website).row();

					const options: any = {};
					options.reply_markup = buttons;
					const thread_id = telegram.api.message.getThreadID(ctx);
					if (thread_id) {
						options.message_thread_id = thread_id;
					}

					await ctx.reply(
						translate(lang.language, "about_command_show_links", {
							username: username,
						}),
						options,
					);
				} catch (err) {
					await telegram.api.message.send(
						ctx,
						telegram.api.message.getChatID(ctx),
						translate(lang.language, "about_command_show_links_error"),
					);
				}
			}
		}
	});
};

export { about };
export default about;
