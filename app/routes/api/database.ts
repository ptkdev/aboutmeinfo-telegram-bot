/**
 * Migration script for the database.
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import connection from "@app/functions/api/database/connection";
import users from "@app/functions/api/database/users";
import settings from "@app/functions/api/database/settings";
import about from "@app/functions/api/database/about";

const db = {
	connection: connection,
	users: users,
	settings: settings,
	about: about,
};

export { db };
export default db;
