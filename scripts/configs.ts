/**
 * Check configs.js
 * =====================
 * Check if configs/config.json exist, if don't exist rename .tpl
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import * as fs from "fs";
import * as shell from "shelljs";

declare const __dirname: string;

const path = `${__dirname}/../app/configs/config.json`;

if (!fs.existsSync(path)) {
	shell.cp("-Rf", `${__dirname}/../app/configs/config.json.tpl`, `${path}`);
}
