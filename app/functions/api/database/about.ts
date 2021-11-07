/**
 * About database
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import { Schema, model } from "mongoose";
import type { AboutInterface } from "@app/types/databases.type.js";
import { logger } from "@app/functions/utils/logger";

const schema = new Schema<AboutInterface>({
	id: { type: String, default: "0" },
	username: { type: String, default: "" },
	step: { type: String, default: "done" },
	instagram: { type: String, default: "" },
	github: { type: String, default: "" },
	linkedin: { type: String, default: "" },
	facebook: { type: String, default: "" },
	twitter: { type: String, default: "" },
	tiktok: { type: String, default: "" },
	steam: { type: String, default: "" },
	onlyfans: { type: String, default: "" },
	website: { type: String, default: "" },
	privacy: { type: String, default: "" },
});

const query = model<AboutInterface>("About", schema, "about");

/**
 * About CRUD
 * =====================
 * Add about to DB
 *
 * @param {AboutInterface} about - about to add
 */
const add = async (about: AboutInterface): Promise<void> => {
	try {
		const doc = new query(about);
		await doc.save();
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "about.ts:add()");
	}
};

/**
 * About CRUD
 * =====================
 * Remove about from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 */
const remove = async (search: Record<string, number | string | boolean>): Promise<void> => {
	try {
		await query.findOneAndDelete(search, function (error: string) {
			if (error) {
				logger.error(error || "");
			}
		});
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "about.ts:remove()");
	}
};

/**
 * About CRUD
 * =====================
 * Update about from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @param {AboutInterface} about - about info to update
 */
const update = async (search: Record<string, number | string | boolean>, about: AboutInterface): Promise<void> => {
	try {
		await query.findOneAndUpdate(search, about, function (error: string) {
			if (error) {
				logger.error(error || "");
			}
		});
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "about.ts:update()");
	}
};

/**
 * About CRUD
 * =====================
 * Get about from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @return {AboutInterface[]} about.

 */
const get = async (search: Record<string, number | string | boolean>): Promise<AboutInterface> => {
	try {
		const about = await query.findOne(search, { _id: 0, __v: 0 }, function (error: string) {
			if (error) {
				logger.error(JSON.stringify(error || ""), "about.ts:get()");
			}
		});

		return (await about) || new query().toJSON();
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "about.ts:get()");
	}
	return new query().toJSON();
};

export { get, update, remove, add };
export default { get, update, remove, add };
