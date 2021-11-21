import start from "@app/functions/commands/start";
import launch from "@app/functions/commands/launch";
import settings from "@app/functions/commands/settings";
import set from "@app/functions/commands/set";
import about from "@app/functions/commands/about";
import hears from "@app/functions/commands/hears";
import privacy from "@app/functions/commands/privacy";

const commands = {
	start,
	launch,
	settings,
	set,
	hears,
	about,
	privacy,
};

export { start, launch, hears, settings, set, about, privacy };
export default commands;
