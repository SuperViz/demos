/**
 * The main class that arranges the whole parsing process.
 */
declare class CompatParser {
    private parser;
    constructor(UA: string, skipParsing?: boolean);
    /**
     * Get UserAgent string of current Parser instance
     * @return {String} User-Agent String of the current <Parser> object
     *
     * @public
     */
    getUA(): string;
    /**
     * Test a UA string for a regexp
     * @param {RegExp} regex
     * @return {Boolean}
     */
    test(regex: RegExp): boolean;
    /**
     * Get parsed browser object
     * @return {Object}
     */
    parseBrowser(): import("../browser/browsersList").Browser;
    /**
     * Get parsed browser object
     * @return {Object}
     *
     * @public
     */
    getBrowser(): import("../browser/browsersList").Browser;
    /**
     * Get browser's name
     * @return {String} Browser's name or an empty string
     *
     * @public
     */
    getBrowserName(toLowerCase?: boolean): string;
    /**
     * Get browser's version
     * @return {String} version of browser
     *
     * @public
     */
    getBrowserVersion(): string;
    /**
     * Get OS
     * @return {Object}
     *
     * @example
     * this.getOS();
     * {
     *   name: 'macOS',
     *   version: '10.11.12'
     * }
     */
    getOS(): import("../os/osList").OS;
    /**
     * Parse OS and save it to this.parsedResult.os
     * @return {*|{}}
     */
    parseOS(): import("../os/osList").OS;
    /**
     * Get OS name
     * @param {Boolean} [toLowerCase] return lower-cased value
     * @return {String} name of the OS — macOS, Windows, Linux, etc.
     */
    getOSName(toLowerCase?: boolean): string;
    /**
     * Get OS version
     * @return {String} full version with dots ('10.11.12', '5.6', etc)
     */
    getOSVersion(): string;
    /**
     * Get parsed platform
     * @return {{}}
     */
    getPlatform(): void;
    /**
     * Get platform name
     * @param {Boolean} [toLowerCase=false]
     * @return {*}
     */
    getPlatformType(_toLowerCase?: boolean): string;
    /**
     * Get parsed platform
     * @return {{}}
     */
    parsePlatform(): import("../platform/platformsList").Platform;
    /**
     * Get parsed engine
     * @return {{}}
     */
    getEngine(): import("../engine/enginesList").Engine;
    /**
     * Get engines's name
     * @return {String} Engines's name or an empty string
     *
     * @public
     */
    getEngineName(toLowerCase?: boolean): string;
    /**
     * Get parsed platform
     * @return {{}}
     */
    parseEngine(): import("../engine/enginesList").Engine;
    /**
     * Parse full information about the browser
     * @returns {CompatParser}
     */
    parse(): this;
    /**
     * Get parsed result
     * @return {ParsedResult}
     */
    getResult(): any;
    /**
     * Check if parsed browser matches certain conditions
     *
     * @param {Object} checkTree It's one or two layered object,
     * which can include a platform or an OS on the first layer
     * and should have browsers specs on the bottom-laying layer
     *
     * @returns {Boolean|undefined} Whether the browser satisfies the set conditions or not.
     * Returns `undefined` when the browser is no described in the checkTree object.
     *
     * @example
     * const browser = Bowser.getParser(window.navigator.userAgent);
     * if (browser.satisfies({chrome: '>118.01.1322' }))
     * // or with os
     * if (browser.satisfies({windows: { chrome: '>118.01.1322' } }))
     * // or with platforms
     * if (browser.satisfies({desktop: { chrome: '>118.01.1322' } }))
     */
    satisfies(checkTree: any): boolean | undefined;
    /**
     * Check if the browser name equals the passed string
     * @param browserName The string to compare with the browser name
     * @param [includingAlias=false] The flag showing whether alias will be included into comparison
     * @returns {boolean}
     */
    isBrowser(browserName: string, includingAlias?: boolean): boolean;
    compareVersion(version: string): boolean;
    isOS(osName: string): boolean;
    isPlatform(platformType: string): boolean;
    isEngine(engineName: string): boolean;
    /**
     * Is anything? Check if the browser is called "anything",
     * the OS called "anything" or the platform called "anything"
     * @param {String} anything
     * @param [includingAlias=false] The flag showing whether alias will be included into comparison
     * @returns {Boolean}
     */
    is(anything: string, includingAlias?: boolean): boolean;
    /**
     * Check if any of the given values satisfies this.is(anything)
     * @param {String[]} anythings
     * @returns {Boolean}
     */
    some(anythings?: string[]): boolean;
}
declare class BowserCompat {
    /**
     * Creates a {@link CompatParser} instance
     *
     * @param {String} UA UserAgent string
     * @param {Boolean} [skipParsing=false] Will make the Parser postpone parsing until you ask it
     * explicitly. Same as `skipParsing` for {@link CompatParser}.
     * @returns {CompatParser}
     * @throws {Error} when UA is not a String
     *
     * @example
     * const parser = Bowser.getParser(window.navigator.userAgent);
     * const result = parser.getResult();
     */
    static getParser(UA: string, skipParsing?: boolean): CompatParser;
    /**
     * Creates a {@link CompatParser} instance and runs {@link CompatParser.getResult} immediately
     *
     * @param UA
     * @return {ParsedResult}
     *
     * @example
     * const result = Bowser.parse(window.navigator.userAgent);
     */
    static parse(UA: string): any;
    static get BROWSER_MAP(): {
        amazon_silk: string;
        android: string;
        bada: string; /**
         * Get parsed browser object
         * @return {Object}
         */
        blackberry: string;
        chrome: string;
        chromium: string;
        electron: string;
        epiphany: string;
        firefox: string;
        focus: string;
        generic: string;
        googlebot: string;
        google_search: string;
        ie: string;
        k_meleon: string;
        maxthon: string;
        miui: string;
        edge: string;
        mz: string;
        naver: string;
        opera: string;
        opera_coast: string;
        opera_touch: string;
        phantomjs: string;
        ps4: string;
        puffin: string;
        qupzilla: string;
        qq: string;
        qqlite: string;
        safari: string;
        sailfish: string;
        samsung_internet: string;
        seamonkey: string;
        sleipnir: string;
        slimerjs: string;
        swing: string;
        tizen: string;
        /**
         * Parse OS and save it to this.parsedResult.os
         * @return {*|{}}
         */
        uc: string;
        vivaldi: string;
        webos: string;
        wechat: string;
        yandex: string;
    };
    static get ENGINE_MAP(): {
        EdgeHTML: string;
        Blink: string;
        Trident: string;
        Presto: string;
        Gecko: string;
        WebKit: string;
    };
    static get OS_MAP(): {
        WindowsPhone: string;
        Windows: string;
        MacOS: string;
        iOS: string;
        Android: string;
        WebOS: string;
        BlackBerry: string;
        Bada: string;
        Tizen: string;
        Linux: string;
        ChromeOS: string;
        PlayStation4: string;
        Roku: string;
    };
    static get PLATFORMS_MAP(): {
        tablet: string;
        mobile: string;
        desktop: string;
        tv: string;
    };
}
export default BowserCompat;
