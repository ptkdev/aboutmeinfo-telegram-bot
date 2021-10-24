import db from "@routes/api/database";
import commands from "@app/routes/commands";

/**
 * Start bot
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import logger from "@app/functions/utils/logger";

(async () => {
	logger.info("Bot is starting...", "bot.ts:main()");

	await db.connection.connectDB();

	await commands.quit();
	await commands.start();
	await commands.about();
	await commands.settings();
	await commands.privacy();
	await commands.hears();

	await commands.launch();
})();

process.on("SIGINT", async function () {
	// on CTRL-C
	await db.connection.disconnectDB();
});

process.once("SIGUSR2", async function () {
	// On nodemon refresh
	await db.connection.disconnectDB();
});
