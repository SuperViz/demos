import type { IParser } from "../types";
import { Platform } from "./platformsList";
export declare function platformParser(parser: IParser): {
    platform: Platform;
};
export declare function getPlatform<T extends IParser<{
    platform: Platform;
}>>(parser: T): Platform;
export declare function getPlatformType<T extends IParser<{
    platform: Platform;
}>>(parser: T): string;
export declare function getPlatformVendor<T extends IParser<{
    platform: Platform;
}>>(parser: T, toLowerCase?: boolean): string;
export declare function getPlatformModel<T extends IParser<{
    platform: Platform;
}>>(parser: T, toLowerCase?: boolean): string;
/**
 * Check if the platform type equals the passed string
 *
 * @param   {IParser} parser The parser instance
 * @param   {string} engineName The string to compare with the platform type
 * @returns {boolean}
 */
export declare function isPlatform<T extends IParser<{
    platform: Platform;
}>>(parser: T, platformType: string): boolean;
