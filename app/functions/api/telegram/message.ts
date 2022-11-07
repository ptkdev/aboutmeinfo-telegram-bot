/**
 * Wrapper telegram api (message)
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import logger from "@app/functions/utils/logger";

const getUsername = (ctx: any): string => {
	const username = ctx?.update?.message?.from?.username;

	return username?.trim() || "";
};

const getUserID = (ctx: any): string => {
	const id = ctx?.update?.message?.from?.id || ctx?.update?.callback_query?.from?.id;

	return `${id}` || "0";
};

const getUserFirstName = (ctx: any): string => {
	const first_name = ctx?.update?.message?.from?.first_name;

	return first_name?.trim() || "";
};

const getFullUser = (ctx: any): any => {
	const from = ctx?.update?.message?.from || {};

	from.username = getUsername(ctx);
	from.question = "";
	from.description = "";
	from.score = 0;

	return from;
};

const getChatID = (ctx: any): number => {
	return (
		ctx?.update.message?.chat?.id || ctx?.message?.chat?.id || ctx?.update?.callback_query?.message?.chat?.id || 0
	);
};

const getThreadID = (ctx: any): number => {
	return (
		ctx?.update.message?.message_thread_id ||
		ctx?.message?.message_thread_id ||
		ctx?.update?.callback_query?.message?.message_thread_id ||
		null
	);
};

const getActionType = (ctx: any): string => {
	return ctx?.update?.callback_query?.data || "";
};

const getPhotoFileID = (ctx: any, position = 0): string => {
	return ctx?.update?.message?.photo[position]?.file_id || "";
};

const getPhotoCaption = (ctx: any): string => {
	return ctx?.update?.message?.caption || "";
};

const getText = (ctx: any): string => {
	return ctx?.update?.message?.text || ctx?.message?.text || "";
};

const send = async (ctx: any, group_id: number, text: string, options: any = { parse_mode: "HTML" }): Promise<any> => {
	if (group_id && text) {
		let message;

		const thread_id = getThreadID(ctx);
		if (thread_id) {
			options.message_thread_id = thread_id;
		}
		try {
			message = await ctx.api.sendMessage(group_id, text, options);
			return message;
		} catch (err: any) {
			logger.error(JSON.stringify(err), "message.ts:send()");
		}
	}
};

const sendPhoto = async (
	ctx: any,
	group_id: number,
	photo: string,
	options: any = { parse_mode: "HTML" },
): Promise<any> => {
	if (group_id && photo) {
		let message;

		const thread_id = getThreadID(ctx);
		if (thread_id) {
			options.message_thread_id = thread_id;
		}

		try {
			message = await ctx.api.sendPhoto(group_id, photo, options);
			return message;
		} catch (err: any) {
			logger.error(JSON.stringify(err), "message.ts:send()");
		}
	}
};

const pin = async (
	ctx: any,
	group_id: number,
	message_id: number,
	options: any = { disable_notification: true },
): Promise<void> => {
	logger.debug(`group_id: ${group_id}`, "message.ts:pin()");
	logger.debug(`message_id: ${message_id}`, "message.ts:pin()");

	if (group_id && message_id) {
		const thread_id = getThreadID(ctx);
		if (thread_id) {
			options.message_thread_id = thread_id;
		}

		try {
			await ctx.api.pinChatMessage(group_id, message_id, options);
		} catch (err: any) {
			logger.error(JSON.stringify(err), "message.ts:pin()");
		}
	}
};

export {
	getFullUser,
	getUsername,
	getChatID,
	getThreadID,
	getText,
	getUserID,
	getUserFirstName,
	send,
	pin,
	sendPhoto,
	getPhotoFileID,
	getPhotoCaption,
	getActionType,
};
export default {
	getFullUser,
	getUsername,
	getChatID,
	getThreadID,
	getText,
	getUserID,
	getUserFirstName,
	send,
	pin,
	sendPhoto,
	getPhotoFileID,
	getPhotoCaption,
	getActionType,
};
