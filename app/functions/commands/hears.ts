/**
 * Telegraf Hears
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import bot from "@app/core/telegraf";
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
	bot.on("text", async (ctx) => {
		logger.info("hears: text", "hears.ts:on(text)");

		const lang = await db.settings.get({
			group_id: telegram.api.message.getChatID(ctx),
		});

		if (telegram.api.message.getChatID(ctx) > 0) {
			const about = await db.about.get({
				id: telegram.api.message.getUserID(ctx),
			});
			if (
				about.step !== "done" &&
				about.step !== "privacy" &&
				(telegram.api.message.getText(ctx).trim().toLowerCase().startsWith("https://") ||
					telegram.api.message.getText(ctx).trim().toLowerCase() ===
						translate(lang.language, "set_command_skip"))
			) {
				switch (about.step) {
					case "facebook":
						about.facebook =
							telegram.api.message.getText(ctx).trim().toLowerCase() ===
							translate(lang.language, "set_command_skip")
								? ""
								: telegram.api.message.getText(ctx).trim().toLowerCase();
						about.step = "instagram";

						await db.about.update({ id: about.id }, about);

						await telegram.api.message.send(
							ctx,
							telegram.api.message.getChatID(ctx),
							translate(lang.language, "set_command_instagram"),
						);

						break;

					case "instagram":
						about.instagram =
							telegram.api.message.getText(ctx).trim().toLowerCase() ===
							translate(lang.language, "set_command_skip")
								? ""
								: telegram.api.message.getText(ctx).trim().toLowerCase();
						about.step = "twitter";

						await db.about.update({ id: about.id }, about);

						await telegram.api.message.send(
							ctx,
							telegram.api.message.getChatID(ctx),
							translate(lang.language, "set_command_twitter"),
						);

						break;

					case "twitter":
						about.twitter =
							telegram.api.message.getText(ctx).trim().toLowerCase() ===
							translate(lang.language, "set_command_skip")
								? ""
								: telegram.api.message.getText(ctx).trim().toLowerCase();
						about.step = "linkedin";

						await db.about.update({ id: about.id }, about);

						await telegram.api.message.send(
							ctx,
							telegram.api.message.getChatID(ctx),
							translate(lang.language, "set_command_linkedin"),
						);

						break;

					case "linkedin":
						about.linkedin =
							telegram.api.message.getText(ctx).trim().toLowerCase() ===
							translate(lang.language, "set_command_skip")
								? ""
								: telegram.api.message.getText(ctx).trim().toLowerCase();
						about.step = "tiktok";

						await db.about.update({ id: about.id }, about);

						await telegram.api.message.send(
							ctx,
							telegram.api.message.getChatID(ctx),
							translate(lang.language, "set_command_tiktok"),
						);

						break;

					case "tiktok":
						about.tiktok =
							telegram.api.message.getText(ctx).trim().toLowerCase() ===
							translate(lang.language, "set_command_skip")
								? ""
								: telegram.api.message.getText(ctx).trim().toLowerCase();
						about.step = "github";

						await db.about.update({ id: about.id }, about);

						await telegram.api.message.send(
							ctx,
							telegram.api.message.getChatID(ctx),
							translate(lang.language, "set_command_github"),
						);

						break;

					case "github":
						about.github =
							telegram.api.message.getText(ctx).trim().toLowerCase() ===
							translate(lang.language, "set_command_skip")
								? ""
								: telegram.api.message.getText(ctx).trim().toLowerCase();
						about.step = "website";

						await db.about.update({ id: about.id }, about);

						await telegram.api.message.send(
							ctx,
							telegram.api.message.getChatID(ctx),
							translate(lang.language, "set_command_website"),
						);

						break;

					case "website":
						about.website =
							telegram.api.message.getText(ctx).trim().toLowerCase() ===
							translate(lang.language, "set_command_skip")
								? ""
								: telegram.api.message.getText(ctx).trim().toLowerCase();
						about.step = "done";

						await db.about.update({ id: about.id }, about);

						await telegram.api.message.send(
							ctx,
							telegram.api.message.getChatID(ctx),
							translate(lang.language, "set_command_done", {
								username: telegram.api.message.getUsername(ctx),
							}),
						);
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
			} else if (about.step !== "done") {
				await telegram.api.message.send(
					ctx,
					telegram.api.message.getChatID(ctx),
					translate(lang.language, "hears_command_bad_url"),
				);
			}
		}
	});
};

export { hears };
export default hears;
