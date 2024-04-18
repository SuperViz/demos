import type { IParser } from "../types";
import { Engine } from "./enginesList";
export declare function engineParser(parser: IParser): {
    engine: Engine;
};
export declare function getEngine<T extends IParser<{
    engine: Engine;
}>>(parser: T): Engine;
export declare function getEngineName<T extends IParser<{
    engine: Engine;
}>>(parser: T, toLowerCase?: boolean): string;
/**
 * Check if the engine name equals the passed string
 *
 * @param   {IParser} parser The parser instance
 * @param   {string} engineName The string to compare with the engine name
 * @returns {boolean}
 */
export declare function isEngine<T extends IParser<{
    engine: Engine;
}>>(parser: T, engineName: string): boolean;
