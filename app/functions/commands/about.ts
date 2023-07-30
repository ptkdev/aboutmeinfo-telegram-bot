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
					account.x === "" &&
					account.linkedin === "" &&
					account.youtube === "" &&
					account.spotify === "" &&
					account.discord === "" &&
					account.tiktok === "" &&
					account.gitlab === "" &&
					account.twitch === "" &&
					account.mastodon === "" &&
					account.psn === "" &&
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
						(account.facebook.startsWith("https://") || account.facebook.startsWith("http://")) &&
						buttons.url(translate(lang.language, "about_command_button_facebook"), account.facebook).row();

					account.instagram !== "" &&
						(account.instagram.startsWith("https://") || account.instagram.startsWith("http://")) &&
						buttons
							.url(translate(lang.language, "about_command_button_instagram"), account.instagram)
							.row();

					account.x !== "" &&
						(account.x.startsWith("https://") || account.x.startsWith("http://")) &&
						buttons.url(translate(lang.language, "about_command_button_x"), account.x).row();

					account.github !== "" &&
						(account.github.startsWith("https://") || account.github.startsWith("http://")) &&
						buttons.url(translate(lang.language, "about_command_button_github"), account.github).row();

					account.tiktok !== "" &&
						(account.tiktok.startsWith("https://") || account.tiktok.startsWith("http://")) &&
						buttons.url(translate(lang.language, "about_command_button_tiktok"), account.tiktok).row();

					account.twitch !== "" &&
						(account.twitch.startsWith("https://") || account.twitch.startsWith("http://")) &&
						buttons.url(translate(lang.language, "about_command_button_twitch"), account.twitch).row();

					account.mastodon !== "" &&
						(account.mastodon.startsWith("https://") || account.mastodon.startsWith("http://")) &&
						buttons.url(translate(lang.language, "about_command_button_mastodon"), account.mastodon).row();

					account.psn !== "" &&
						(account.psn.startsWith("https://") || account.psn.startsWith("http://")) &&
						buttons.url(translate(lang.language, "about_command_button_psn"), account.psn).row();

					account.gitlab !== "" &&
						(account.gitlab.startsWith("https://") || account.gitlab.startsWith("http://")) &&
						buttons.url(translate(lang.language, "about_command_button_gitlab"), account.gitlab).row();

					account.linkedin !== "" &&
						(account.linkedin.startsWith("https://") || account.linkedin.startsWith("http://")) &&
						buttons.url(translate(lang.language, "about_command_button_linkedin"), account.linkedin).row();

					account.youtube !== "" &&
						(account.youtube.startsWith("https://") || account.youtube.startsWith("http://")) &&
						buttons.url(translate(lang.language, "about_command_button_youtube"), account.youtube).row();

					account.spotify !== "" &&
						(account.spotify.startsWith("https://") || account.spotify.startsWith("http://")) &&
						buttons.url(translate(lang.language, "about_command_button_spotify"), account.spotify).row();

					account.discord !== "" &&
						(account.discord.startsWith("https://") || account.discord.startsWith("http://")) &&
						buttons.url(translate(lang.language, "about_command_button_discord"), account.discord).row();

					account.steam !== "" &&
						(account.steam.startsWith("https://") || account.steam.startsWith("http://")) &&
						buttons.url(translate(lang.language, "about_command_button_steam"), account.steam).row();

					account.onlyfans !== "" &&
						(account.onlyfans.startsWith("https://") || account.onlyfans.startsWith("http://")) &&
						buttons.url(translate(lang.language, "about_command_button_onlyfans"), account.onlyfans).row();

					account.amazon !== "" &&
						(account.amazon.startsWith("https://") || account.amazon.startsWith("http://")) &&
						buttons.url(translate(lang.language, "about_command_button_amazon"), account.amazon).row();

					account.website !== "" &&
						(account.website.startsWith("https://") || account.website.startsWith("http://")) &&
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
