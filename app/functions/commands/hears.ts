/**
 * Grammy Telegram API Framework Hears
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import bot from "@app/core/token";
import translate from "@translations/translate";
import db from "@routes/api/database";
import telegram from "@routes/api/telegram";
import logger from "@app/functions/utils/logger";

/**
 * hears: any taxt from bot chat
 * =====================
 * Listen any text user write
 *
 */
const hears = async (): Promise<void> => {
	bot.on("message:text", async (ctx) => {
		logger.info("hears: text", "hears.ts:on(text)");

		const lang = await db.settings.get({
			group_id: telegram.api.message.getChatID(ctx),
		});

		if (telegram.api.message.getChatID(ctx) > 0) {
			const about = await db.about.get({
				id: telegram.api.message.getUserID(ctx),
			});
			if (about.step !== "done" && about.step !== "privacy") {
				let text = telegram.api.message.getText(ctx).trim().toLowerCase();

				switch (about.step) {
					case "facebook":
					case "set_facebook":
						if (
							!text.startsWith("https://") &&
							!text.startsWith("http://") &&
							translate(lang.language, "set_command_skip") !== text
						) {
							text = `https://facebook.com/${text}`;
						}

						about.facebook = text === translate(lang.language, "set_command_skip") ? "" : text;

						if (about.step.toString() === "set_facebook") {
							about.step = "done";

							await db.about.update({ id: about.id }, about);
							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_done", {
									username: telegram.api.message.getUsername(ctx),
								}),
							);
						} else {
							about.step = "instagram";

							await db.about.update({ id: about.id }, about);

							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_instagram"),
							);
						}

						break;

					case "instagram":
					case "set_instagram":
						if (
							!text.startsWith("https://") &&
							!text.startsWith("http://") &&
							translate(lang.language, "set_command_skip") !== text
						) {
							text = `https://instagram.com/${text}`;
						}

						about.instagram = text === translate(lang.language, "set_command_skip") ? "" : text;

						if (about.step.toString() === "set_instagram") {
							about.step = "done";

							await db.about.update({ id: about.id }, about);
							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_done", {
									username: telegram.api.message.getUsername(ctx),
								}),
							);
						} else {
							about.step = "x";

							await db.about.update({ id: about.id }, about);

							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_x"),
							);
						}

						break;

					case "x":
					case "set_x":
						if (
							!text.startsWith("https://") &&
							!text.startsWith("http://") &&
							translate(lang.language, "set_command_skip") !== text
						) {
							text = `https://x.com/${text}`;
						}

						about.x = text === translate(lang.language, "set_command_skip") ? "" : text;

						if (about.step.toString() === "set_x") {
							about.step = "done";

							await db.about.update({ id: about.id }, about);
							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_done", {
									username: telegram.api.message.getUsername(ctx),
								}),
							);
						} else {
							about.step = "linkedin";

							await db.about.update({ id: about.id }, about);

							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_linkedin"),
							);
						}

						break;

					case "linkedin":
					case "set_linkedin":
						if (
							!text.startsWith("https://") &&
							!text.startsWith("http://") &&
							translate(lang.language, "set_command_skip") !== text
						) {
							text = `https://www.linkedin.com/in/${text}`;
						}

						about.linkedin = text === translate(lang.language, "set_command_skip") ? "" : text;

						if (about.step.toString() === "set_linkedin") {
							about.step = "done";

							await db.about.update({ id: about.id }, about);
							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_done", {
									username: telegram.api.message.getUsername(ctx),
								}),
							);
						} else {
							about.step = "youtube";

							await db.about.update({ id: about.id }, about);

							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_youtube"),
							);
						}

						break;

					case "youtube":
					case "set_youtube":
						if (
							!text.startsWith("https://") &&
							!text.startsWith("http://") &&
							translate(lang.language, "set_command_skip") !== text
						) {
							text = `https://youtube.com/c/${text}`;
						}

						about.youtube = text === translate(lang.language, "set_command_skip") ? "" : text;

						if (about.step.toString() === "set_youtube") {
							about.step = "done";

							await db.about.update({ id: about.id }, about);
							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_done", {
									username: telegram.api.message.getUsername(ctx),
								}),
							);
						} else {
							about.step = "spotify";

							await db.about.update({ id: about.id }, about);

							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_spotify"),
							);
						}

						break;

					case "spotify":
					case "set_spotify":
						text = telegram.api.message.getText(ctx).trim(); // without lower case because spotify have id CASE SENSITIVE
						if (
							!text.toLowerCase().startsWith("https://") &&
							!text.toLowerCase().startsWith("http://") &&
							translate(lang.language, "set_command_skip") !== text.toLowerCase()
						) {
							text = `https://open.spotify.com/playlist/${text}`;
						}

						about.spotify = text === translate(lang.language, "set_command_skip") ? "" : text;

						if (about.step.toString() === "set_spotify") {
							about.step = "done";

							await db.about.update({ id: about.id }, about);
							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_done", {
									username: telegram.api.message.getUsername(ctx),
								}),
							);
						} else {
							about.step = "discord";

							await db.about.update({ id: about.id }, about);

							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_discord"),
							);
						}

						break;

					case "discord":
					case "set_discord":
						text = telegram.api.message.getText(ctx).trim(); // without lower case because discord have id CASE SENSITIVE

						if (
							!text.toLowerCase().startsWith("https://") &&
							!text.toLowerCase().startsWith("http://") &&
							translate(lang.language, "set_command_skip") !== text.toLowerCase()
						) {
							text = `https://discord.com/invite/${text}`;
						}

						about.discord = text === translate(lang.language, "set_command_skip") ? "" : text;

						if (about.step.toString() === "set_discord") {
							about.step = "done";

							await db.about.update({ id: about.id }, about);
							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_done", {
									username: telegram.api.message.getUsername(ctx),
								}),
							);
						} else {
							about.step = "tiktok";

							await db.about.update({ id: about.id }, about);

							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_tiktok"),
							);
						}

						break;

					case "tiktok":
					case "set_tiktok":
						if (
							!text.startsWith("https://") &&
							!text.startsWith("http://") &&
							translate(lang.language, "set_command_skip") !== text
						) {
							text = `https://www.tiktok.com/@${text}`;
						}

						about.tiktok = text === translate(lang.language, "set_command_skip") ? "" : text;

						if (about.step.toString() === "set_tiktok") {
							about.step = "done";

							await db.about.update({ id: about.id }, about);
							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_done", {
									username: telegram.api.message.getUsername(ctx),
								}),
							);
						} else {
							about.step = "github";

							await db.about.update({ id: about.id }, about);

							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_github"),
							);
						}

						break;

					case "github":
					case "set_github":
						if (
							!text.startsWith("https://") &&
							!text.startsWith("http://") &&
							translate(lang.language, "set_command_skip") !== text
						) {
							text = `https://github.com/${text}`;
						}

						about.github = text === translate(lang.language, "set_command_skip") ? "" : text;

						if (about.step.toString() === "set_github") {
							about.step = "done";

							await db.about.update({ id: about.id }, about);
							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_done", {
									username: telegram.api.message.getUsername(ctx),
								}),
							);
						} else {
							about.step = "gitlab";

							await db.about.update({ id: about.id }, about);

							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_gitlab"),
							);
						}

						break;

					case "gitlab":
					case "set_gitlab":
						if (
							!text.startsWith("https://") &&
							!text.startsWith("http://") &&
							translate(lang.language, "set_command_skip") !== text
						) {
							text = `https://gitlab.com/${text}`;
						}

						about.gitlab = text === translate(lang.language, "set_command_skip") ? "" : text;

						if (about.step.toString() === "set_gitlab") {
							about.step = "done";

							await db.about.update({ id: about.id }, about);
							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_done", {
									username: telegram.api.message.getUsername(ctx),
								}),
							);
						} else {
							about.step = "steam";

							await db.about.update({ id: about.id }, about);

							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_steam"),
							);
						}

						break;

					case "steam":
					case "set_steam":
						if (
							!text.startsWith("https://") &&
							!text.startsWith("http://") &&
							translate(lang.language, "set_command_skip") !== text
						) {
							text = `https://steamcommunity.com/id/${text}`;
						}

						about.steam = text === translate(lang.language, "set_command_skip") ? "" : text;

						if (about.step.toString() === "set_steam") {
							about.step = "done";

							await db.about.update({ id: about.id }, about);
							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_done", {
									username: telegram.api.message.getUsername(ctx),
								}),
							);
						} else {
							about.step = "onlyfans";

							await db.about.update({ id: about.id }, about);

							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_onlyfans"),
							);
						}

						break;

					case "onlyfans":
					case "set_onlyfans":
						if (
							!text.startsWith("https://") &&
							!text.startsWith("http://") &&
							translate(lang.language, "set_command_skip") !== text
						) {
							text = `https://onlyfans.com/${text}`;
						}

						about.onlyfans = text === translate(lang.language, "set_command_skip") ? "" : text;

						if (about.step.toString() === "set_onlyfans") {
							about.step = "done";

							await db.about.update({ id: about.id }, about);
							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_done", {
									username: telegram.api.message.getUsername(ctx),
								}),
							);
						} else {
							about.step = "amazon";

							await db.about.update({ id: about.id }, about);

							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_amazon"),
							);
						}

						break;

					case "amazon":
					case "set_amazon":
						if (
							!text.startsWith("https://") &&
							!text.startsWith("http://") &&
							translate(lang.language, "set_command_skip") !== text
						) {
							text = `https://www.amazon.it/hz/wishlist/ls/${text}`;
						}

						about.amazon = text === translate(lang.language, "set_command_skip") ? "" : text;

						if (about.step.toString() === "set_amazon") {
							about.step = "done";

							await db.about.update({ id: about.id }, about);
							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_done", {
									username: telegram.api.message.getUsername(ctx),
								}),
							);
						} else {
							about.step = "website";

							await db.about.update({ id: about.id }, about);

							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_website"),
							);
						}

						break;

					case "website":
					case "set_website":
						if (
							!text.startsWith("https://") &&
							!text.startsWith("http://") &&
							translate(lang.language, "set_command_skip") !== text
						) {
							text = "";
							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "hears_command_bad_url"),
							);
						}

						about.website = text === translate(lang.language, "set_command_skip") ? "" : text;

						if (about.step.toString() === "set_website") {
							about.step = "done";

							await db.about.update({ id: about.id }, about);
							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_done", {
									username: telegram.api.message.getUsername(ctx),
								}),
							);
						} else {
							about.step = "mastodon";

							await db.about.update({ id: about.id }, about);

							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_mastodon"),
							);
						}
						break;

					case "mastodon":
					case "set_mastodon":
						if (
							!text.startsWith("https://") &&
							!text.startsWith("http://") &&
							translate(lang.language, "set_command_skip") !== text
						) {
							text = "";
							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "hears_command_bad_url"),
							);
						}

						about.mastodon = text === translate(lang.language, "set_command_skip") ? "" : text;

						if (about.step.toString() === "set_mastodon") {
							about.step = "done";

							await db.about.update({ id: about.id }, about);
							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_done", {
									username: telegram.api.message.getUsername(ctx),
								}),
							);
						} else {
							about.step = "psn";

							await db.about.update({ id: about.id }, about);

							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_psn"),
							);
						}
						break;

					case "psn":
					case "set_psn":
						if (
							!text.startsWith("https://") &&
							!text.startsWith("http://") &&
							translate(lang.language, "set_command_skip") !== text
						) {
							text = `https://psnprofiles.com/${text}`;
						}

						about.psn = text === translate(lang.language, "set_command_skip") ? "" : text;

						if (about.step.toString() === "set_psn") {
							about.step = "done";

							await db.about.update({ id: about.id }, about);
							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_done", {
									username: telegram.api.message.getUsername(ctx),
								}),
							);
						} else {
							about.step = "twitch";

							await db.about.update({ id: about.id }, about);

							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_twitch"),
							);
						}
						break;

					case "twitch":
					case "set_twitch":
						if (
							!text.startsWith("https://") &&
							!text.startsWith("http://") &&
							translate(lang.language, "set_command_skip") !== text
						) {
							text = `https://twitch.tv/${text}`;
						}

						about.twitch = text === translate(lang.language, "set_command_skip") ? "" : text;

						if (about.step.toString() === "set_twitch") {
							about.step = "done";

							await db.about.update({ id: about.id }, about);
							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_done", {
									username: telegram.api.message.getUsername(ctx),
								}),
							);
						} else {
							about.step = "done";

							await db.about.update({ id: about.id }, about);

							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_done", {
									username: telegram.api.message.getUsername(ctx),
								}),
							);
						}
						break;

					default:
						break;
				}
			} else if (about.step === "privacy") {
				about.privacy =
					telegram.api.message.getText(ctx).trim().toLowerCase() ===
					translate(lang.language, "set_command_privacy_skip")
						? ""
						: telegram.api.message.getText(ctx).trim().toLowerCase();
				about.step = "done";

				await db.about.update({ id: about.id }, about);

				await telegram.api.message.send(
					ctx,
					telegram.api.message.getChatID(ctx),
					translate(lang.language, "set_command_privacy_done", {
						username: telegram.api.message.getUsername(ctx),
					}),
				);
			}
		}
	});
};

export { hears };
export default hears;
