import { B as BROWSER_MAP, b as browserParser, g as getBrowser, a as getBrowserName, c as getBrowserVersion, i as isBrowser, d as compareVersion } from "./browserParser.js";
import { E as ENGINE_MAP, e as engineParser, g as getEngine, a as getEngineName, i as isEngine } from "./engineParser.js";
import { O as OS_MAP, o as osParser, g as getOS, a as getOSName, b as getOSVersion, i as isOS } from "./osParser.js";
import { g as getParser, i as isAnything, a as isSome } from "./parser.js";
import { P as PLATFORMS_MAP, p as platformParser, g as getPlatform, a as getPlatformType, i as isPlatform } from "./platformParser.js";
import "./utils.js";
class CompatParser {
  constructor(UA, skipParsing = false) {
    this.parser = getParser(UA, {
      use: [browserParser, engineParser, osParser, platformParser],
      skipParsing
    });
  }
  getUA() {
    return this.parser.getUA();
  }
  test(regex) {
    return this.parser.test(regex);
  }
  parseBrowser() {
    return getBrowser(this.parser);
  }
  getBrowser() {
    return getBrowser(this.parser);
  }
  getBrowserName(toLowerCase = false) {
    return getBrowserName(this.parser, toLowerCase);
  }
  getBrowserVersion() {
    return getBrowserVersion(this.parser);
  }
  getOS() {
    return getOS(this.parser);
  }
  parseOS() {
    return getOS(this.parser);
  }
  getOSName(toLowerCase = false) {
    return getOSName(this.parser, toLowerCase);
  }
  getOSVersion() {
    return getOSVersion(this.parser);
  }
  getPlatform() {
    getPlatform(this.parser);
  }
  getPlatformType(_toLowerCase = false) {
    return getPlatformType(this.parser);
  }
  parsePlatform() {
    return getPlatform(this.parser);
  }
  getEngine() {
    return getEngine(this.parser);
  }
  getEngineName(toLowerCase = false) {
    return getEngineName(this.parser, toLowerCase);
  }
  parseEngine() {
    return getEngine(this.parser);
  }
  parse() {
    this.parseBrowser();
    this.parseOS();
    this.parsePlatform();
    this.parseEngine();
    return this;
  }
  getResult() {
    return this.parser.getResult();
  }
  satisfies(checkTree) {
    const platformsAndOSes = {};
    let platformsAndOSCounter = 0;
    const browsers = {};
    let browsersCounter = 0;
    const allDefinitions = Object.keys(checkTree);
    allDefinitions.forEach((key) => {
      const currentDefinition = checkTree[key];
      if (typeof currentDefinition === "string") {
        browsers[key] = currentDefinition;
        browsersCounter += 1;
      } else if (typeof currentDefinition === "object") {
        platformsAndOSes[key] = currentDefinition;
        platformsAndOSCounter += 1;
      }
    });
    if (platformsAndOSCounter > 0) {
      const platformsAndOSNames = Object.keys(platformsAndOSes);
      const OSMatchingDefinition = platformsAndOSNames.find((name) => this.isOS(name));
      if (OSMatchingDefinition) {
        const osResult = this.satisfies(platformsAndOSes[OSMatchingDefinition]);
        if (osResult !== void 0) {
          return osResult;
        }
      }
      const platformMatchingDefinition = platformsAndOSNames.find((name) => this.isPlatform(name));
      if (platformMatchingDefinition) {
        const platformResult = this.satisfies(platformsAndOSes[platformMatchingDefinition]);
        if (platformResult !== void 0) {
          return platformResult;
        }
      }
    }
    if (browsersCounter > 0) {
      const browserNames = Object.keys(browsers);
      const matchingDefinition = browserNames.find((name) => this.isBrowser(name, true));
      if (matchingDefinition !== void 0) {
        return this.compareVersion(browsers[matchingDefinition]);
      }
    }
    return void 0;
  }
  isBrowser(browserName, includingAlias = false) {
    return isBrowser(this.parser, browserName, includingAlias);
  }
  compareVersion(version) {
    return compareVersion(this.parser, version);
  }
  isOS(osName) {
    return isOS(this.parser, osName);
  }
  isPlatform(platformType) {
    return isPlatform(this.parser, platformType);
  }
  isEngine(engineName) {
    return isEngine(this.parser, engineName);
  }
  is(anything, includingAlias = false) {
    return isAnything(this.parser, anything, (parser, name) => isBrowser(parser, name, includingAlias), isPlatform, isOS);
  }
  some(anythings = []) {
    return isSome(this.parser, anythings, isBrowser, isPlatform, isOS);
  }
}
class BowserCompat {
  static getParser(UA, skipParsing = false) {
    if (typeof UA !== "string") {
      throw new Error("UserAgent should be a string");
    }
    return new CompatParser(UA, skipParsing);
  }
  static parse(UA) {
    return new CompatParser(UA).getResult();
  }
  static get BROWSER_MAP() {
    return BROWSER_MAP;
  }
  static get ENGINE_MAP() {
    return ENGINE_MAP;
  }
  static get OS_MAP() {
    return OS_MAP;
  }
  static get PLATFORMS_MAP() {
    return PLATFORMS_MAP;
  }
}
export { BowserCompat as default };
