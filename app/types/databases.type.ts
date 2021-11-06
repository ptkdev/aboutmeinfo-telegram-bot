/**
 * Databases Interfaces
 * =====================
 *
 * Share your social media and links on Telegram
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */

/**
 * Telegram User Interface
 * =====================
 *
 * @Context: telegram.api.message.getFullUser(ctx)
 *
 * @interface [TelegramUserInterface](https://github.com/ptkdev/aboutmeinfo-telegram-bot/blob/main/app/webcomponent/types/databases.type.ts)
 *
 * @param { number } id - telegram
 * @param { boolean } is_bot - is user a bot
 * @param { string } first_name - user name from telegram
 * @param { string } username - user username from telegram
 * @param { string } language_code - user code language from OS
 * @param { string } question - user submitted question
 * @param { string } description - user submitted question tip
 * @param { number } score - user current score
 * @param { number } group_id - users group id
 * @param { string } error - error message
 *
 */
export interface TelegramUserInterface {
	/**
	 * Telegram User Interface
	 * =====================
	 *
	 * @interface [TelegramUserInterface](https://github.com/ptkdev/aboutmeinfo-telegram-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { number } id - telegram
	 *
	 */
	id: number;
	/**
	 * User Interface
	 * =====================
	 *
	 * @interface [TelegramUserInterface](https://github.com/ptkdev/aboutmeinfo-telegram-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { boolean } is_bot - is user a bot
	 *
	 */
	is_bot?: boolean;
	/**
	 * User Interface
	 * =====================
	 *
	 * @interface [TelegramUserInterface](https://github.com/ptkdev/aboutmeinfo-telegram-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { string } first_name - user name from telegram
	 *
	 */
	first_name?: string;
	/**
	 * User Interface
	 * =====================
	 *
	 * @interface [TelegramUserInterface](https://github.com/ptkdev/aboutmeinfo-telegram-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { string } username - user username from telegram
	 *
	 */
	username?: string;
	/**
	 * User Interface
	 * =====================
	 *
	 * @interface [TelegramUserInterface](https://github.com/ptkdev/aboutmeinfo-telegram-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { string } language_code - user code language from OS
	 *
	 */
	language_code?: string;
	/**
	 * User Interface
	 * =====================
	 *
	 * @interface [TelegramUserInterface](https://github.com/ptkdev/aboutmeinfo-telegram-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { string } question - user submitted question
	 *
	 */
	question?: string;
	/**
	 * User Interface
	 * =====================
	 *
	 * @interface [TelegramUserInterface](https://github.com/ptkdev/aboutmeinfo-telegram-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { string } description - user submitted question tip
	 *
	 */
	description?: string;
	/**
	 * User Interface
	 * =====================
	 *
	 * @interface [TelegramUserInterface](https://github.com/ptkdev/aboutmeinfo-telegram-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { number } score - user current score
	 *
	 */
	score: number;
	/**
	 * User Interface
	 * =====================
	 *
	 * @interface [TelegramUserInterface](https://github.com/ptkdev/aboutmeinfo-telegram-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { number } group_id - users group id
	 *
	 */
	group_id: number;
	/**
	 * User Interface
	 * =====================
	 *
	 * @interface [TelegramUserInterface](https://github.com/ptkdev/aboutmeinfo-telegram-bot/blob/main/app/webcomponent/types/databases.type.ts)
	 *
	 * @param { string } error - error message
	 *
	 */
	error?: string;
}

/**
 * SettingsInterface
 * =====================
 *
 * @interface [SettingsInterface](https://github.com/ptkdev/aboutmeinfo-telegram-bot/blob/main/app/types/game.type.ts)
 *
 * @param { string } language - language
 * @param { boolean } pin_message - pin message to the chat
 * @param { number } group_id - group id fron user playing
 *
 */
export interface SettingsInterface {
	/**
	 * SettingsInterface
	 * =====================
	 *
	 * @param { string } language - language
	 *
	 */
	language: string;
	/**
	 * SettingsInterface
	 * =====================
	 *
	 * @param { string } pin_message - pin message to the chat
	 *
	 */
	pin_message: boolean;
	/**
	 * SettingsInterface
	 * =====================
	 *
	 * @param { number } group_id - group id fron user playing
	 *
	 */
	group_id: number;
}

/**
 * AboutInterface
 * =====================
 *
 * @interface [SettingsInterface](https://github.com/ptkdev/aboutmeinfo-telegram-bot/blob/main/app/types/game.type.ts)
 *
 * @param { string } language - language
 * @param { boolean } pin_message - pin message to the chat
 * @param { number } group_id - group id fron user playing
 *
 */
export interface AboutInterface {
	id: string;
	username: string;
	step: string;
	instagram: string;
	github: string;
	linkedin: string;
	facebook: string;
	twitter: string;
	tiktok: string;
	steam: string;
	onlyfans: string;
	website: string;
	privacy: string;
}
