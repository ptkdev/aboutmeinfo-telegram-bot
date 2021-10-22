/**
 * Wrapper telegram api (botInfo)
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */

const getUsername = (ctx: any): string => {
	return ctx?.botInfo?.username || "";
};

const getInfo = (ctx: any): any => {
	return ctx?.botInfo || {};
};

export { getUsername, getInfo };
export default { getUsername, getInfo };
