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
							about.step = "twitter";

							await db.about.update({ id: about.id }, about);

							await telegram.api.message.send(
								ctx,
								telegram.api.message.getChatID(ctx),
								translate(lang.language, "set_command_twitter"),
							);
						}

						break;

					case "twitter":
					case "set_twitter":
						if (
							!text.startsWith("https://") &&
							!text.startsWith("http://") &&
							translate(lang.language, "set_command_skip") !== text
						) {
							text = `https://twitter.com/${text}`;
						}

						about.twitter = text === translate(lang.language, "set_command_skip") ? "" : text;

						if (about.step.toString() === "set_twitter") {
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
						if (
							!text.startsWith("https://") &&
							!text.startsWith("http://") &&
							translate(lang.language, "set_command_skip") !== text
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
