import type { IParser } from "../types";
import { Browser } from "./browsersList";
export declare function browserParser(parser: IParser): {
    browser: Browser;
};
export default browserParser;
/**
 * Get parsed browser object
 *
 * @param   {IParser} parser The parser instance
 * @returns {Browser}
 *
 * @public
 * @example
 * const parser = getParser(userAgent, { use: [browserParser] });
 * getBrowser(parser);
 * {
 *  name: 'Firefox',
 *  version: '26.0'
 * }
 */
export declare function getBrowser<T extends IParser<{
    browser: Browser;
}>>(parser: T): Browser;
/**
 * Get browser's name
 *
 * @param {IParser}   parser The parser instance
 * @param {boolean}   toLowerCase Flag to transform name to lower case
 * @returns {String}  Browser's name or an empty string
 *
 * @public
 */
export declare function getBrowserName<T extends IParser<{
    browser: Browser;
}>>(parser: T, toLowerCase?: boolean): string;
/**
 * Get browser's version
 *
 * @param   {IParser} parser Parser instance
 * @returns {String} Browser's version or an empty string
 *
 * @public
 */
export declare function getBrowserVersion<T extends IParser<{
    browser: Browser;
}>>(parser: T): string;
/**
 * Check if the browser name equals the passed string
 *
 * @param   {IParser} parser The parser instance
 * @param   {string} browserName The string to compare with the browser name
 * @param   {boolean} [includingAlias=false] The flag showing whether alias will be included into comparison
 * @returns {boolean}
 *
 * @public
 */
export declare function isBrowser<T extends IParser<{
    browser: Browser;
}>>(parser: T, browserName: string, includingAlias?: boolean): boolean;
/**
 * Check if the browser version equals the passed version
 *
 * @param   {IParser} parser The parser instance
 * @param   {string} version The version to compare with the browser version
 * @returns {boolean}
 *
 * @public
 */
export declare function compareVersion<T extends IParser<{
    browser: Browser;
}>>(parser: T, version: string): boolean;
