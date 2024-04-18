import type { IParser } from "../types";
import { OS } from "./osList";
export declare function osParser(parser: IParser): {
    os: OS;
};
export declare function getOS<T extends IParser<{
    os: OS;
}>>(parser: T): OS;
export declare function getOSName<T extends IParser<{
    os: OS;
}>>(parser: T, toLowerCase?: boolean): string;
export declare function getOSVersion<T extends IParser<{
    os: OS;
}>>(parser: T): string;
export declare function getOSVersionName<T extends IParser<{
    os: OS;
}>>(parser: T, toLowerCase?: boolean): string;
/**
 * Check if the OS name equals the passed string
 *
 * @param   {IParser} parser The parser instance
 * @param   {string} engineName The string to compare with the OS name
 * @returns {boolean}
 */
export declare function isOS<T extends IParser<{
    os: OS;
}>>(parser: T, osName: string): boolean;
