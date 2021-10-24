/**
 * Privacy
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
 * command: /privacy
 * =====================
 * Send welcome message
 *
 */
const privacy = async (): Promise<void> => {
	bot.command("privacy", async (ctx) => {
		logger.info("command: /privacy", "privacy.ts:privacy()");
		if (telegram.api.message.getChatID(ctx) > 0) {
			const lang = await db.settings.get({
				group_id: telegram.api.message.getChatID(ctx),
			});

			const privacy = await db.about.get({
				id: telegram.api.message.getUserID(ctx),
			});

			privacy.step = "privacy";
			await db.about.update({ id: privacy.id }, privacy);

			await telegram.api.message.send(
				ctx,
				telegram.api.message.getChatID(ctx),
				translate(lang.language, "set_command_privacy"),
			);
		}
	});
};

export { privacy };
export default privacy;
