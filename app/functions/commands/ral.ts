import bot from "@app/core/token";
import telegram from "@routes/api/telegram";
import logger from "@app/functions/utils/logger";
import translate from "@translations/translate";
import db from "@routes/api/database";

/**
 * command: /ral
 * =====================
 * Meme command for https://t.me/ptkdev_support_italian
 *
 */
const ral = async (): Promise<void> => {
	bot.command("ral", async (ctx) => {
		logger.info("command: /ral", "ral.ts:ral()");
		const lang = await db.settings.get({
			group_id: telegram.api.message.getChatID(ctx),
		});

		if (
			telegram.api.message.getText(ctx).trim() === "/ral" ||
			telegram.api.message.getText(ctx).trim() === `/ral@${telegram.api.bot.getUsername(ctx)}`
		) {
			await telegram.api.message.send(
				ctx,
				telegram.api.message.getChatID(ctx),
				translate(lang.language, "ral_command_error"),
			);
		} else {
			let ral = Math.floor(Math.random() * (181 - 18) + 18);

			if (Math.floor(Math.random() * 100) === 50 && Math.floor(Math.random() * 100) === 50) {
				ral = 250;
			}

			await telegram.api.message.send(
				ctx,
				telegram.api.message.getChatID(ctx),
				translate(lang.language, "ral_command", {
					username: telegram.api.message.getText(ctx).replace("/ral ", "").replace(/_/g, "\\_").trim(),
					ral: ral,
				}),
				{ parse_mode: "MarkdownV2" },
			);
		}
	});
};

export { ral };
export default ral;
