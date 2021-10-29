import quit from "@app/functions/commands/quit";
import start from "@app/functions/commands/start";
import launch from "@app/functions/commands/launch";
import settings from "@app/functions/commands/settings";
import about from "@app/functions/commands/about";
import hears from "@app/functions/commands/hears";
import privacy from "@app/functions/commands/privacy";

const commands = {
	quit,
	start,
	launch,
	settings,
	hears,
	about,
	privacy,
};

export { quit, start, launch, hears, settings, about, privacy };
export default commands;