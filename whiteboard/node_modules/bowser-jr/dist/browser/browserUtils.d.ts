/**
 * Calculate browser version weight
 *
 * @example
 *   compareVersions('1.10.2.1',  '1.8.2.1.90')    // 1
 *   compareVersions('1.010.2.1', '1.09.2.1.90');  // 1
 *   compareVersions('1.10.2.1',  '1.10.2.1');     // 0
 *   compareVersions('1.10.2.1',  '1.0800.2');     // -1
 *   compareVersions('1.10.2.1',  '1.10',  true);  // 0
 *
 * @param {String} versionA versions versions to compare
 * @param {String} versionB versions versions to compare
 * @param {boolean} [isLoose] enable loose comparison
 * @return {Number} comparison result: -1 when versionA is lower,
 * 1 when versionA is bigger, 0 when both equal
 */
export declare function compareVersions(versionA: string, versionB: string, isLoose?: boolean): -1 | 1 | 0 | undefined;
/**
 * Get short version/alias for a browser name
 *
 * @example
 *   getBrowserAlias('Microsoft Edge') // edge
 *
 * @param  {string} browserName
 * @return {string}
 */
export declare function getBrowserAlias(browserName: string): string;
/**
 * Get short version/alias for a browser name
 *
 * @example
 *   getBrowserAlias('edge') // Microsoft Edge
 *
 * @param  {string} browserAlias
 * @return {string}
 */
export declare function getBrowserTypeByAlias(browserAlias: string): string;
