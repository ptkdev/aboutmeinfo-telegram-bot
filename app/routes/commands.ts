import start from "@app/functions/commands/start";
import launch from "@app/functions/commands/launch";
import settings from "@app/functions/commands/settings";
import set from "@app/functions/commands/set";
import about from "@app/functions/commands/about";
import hears from "@app/functions/commands/hears";
import privacy from "@app/functions/commands/privacy";
import version from "@app/functions/commands/version";

const commands = {
	start,
	launch,
	settings,
	set,
	hears,
	about,
	privacy,
	version,
};

export { start, launch, hears, settings, set, about, privacy, version };
export default commands;
