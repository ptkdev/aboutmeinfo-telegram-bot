/**
 * Start
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
import { TelegramUserInterface, AboutInterface } from "@app/types/databases.type";
import logger from "@app/functions/utils/logger";

/**
 * command: /start
 * =====================
 * Send welcome message
 *
 */
const start = async (): Promise<void> => {
	bot.start(async (ctx) => {
		logger.info("command: /start", "start.ts:start()");
		const lang = await db.settings.get({
			group_id: telegram.api.message.getChatID(ctx),
		});

		const users: TelegramUserInterface = await db.users.get({
			id: telegram.api.message.getUserID(ctx),
		});

		if (users.id.toString() !== "0") {
			await db.users.update({ id: users.id }, telegram.api.message.getFullUser(ctx));
		} else {
			await db.users.add(telegram.api.message.getFullUser(ctx));
		}

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
			if (telegram.api.message.getUsername(ctx) !== "") {
				const about: AboutInterface = await db.about.get({
					id: telegram.api.message.getUserID(ctx),
				});

				if (about.id.toString() !== "0") {
					about.step = "facebook";
					await db.about.update({ id: about.id }, about);
				} else {
					about.id = telegram.api.message.getUserID(ctx);
					about.username = telegram.api.message.getUsername(ctx);
					about.step = "facebook";
					await db.about.add(about);
				}

				await telegram.api.message.send(
					ctx,
					telegram.api.message.getChatID(ctx),
					translate(lang.language, "set_command_facebook"),
				);
			} else {
				await telegram.api.message.send(
					ctx,
					telegram.api.message.getChatID(ctx),
					translate(lang.language, "start_command_nickname_empty"),
				);
			}
		}
	});
};

export { start };
export default start;
