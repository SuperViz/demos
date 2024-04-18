var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
class Parser {
  constructor(ua, options) {
    this.ua = ua;
    this.features = options.use;
    if (options.skipParsing !== true) {
      this.parse();
    }
  }
  getUA() {
    return this.ua;
  }
  test(regexp) {
    return regexp.test(this.ua);
  }
  parse() {
    if (this.result) {
      return this.result;
    }
    let result = {};
    this.features.forEach((feature) => {
      result = __spreadValues(__spreadValues({}, result), feature(this));
    });
    this.result = result;
    return this.result;
  }
  getResult() {
    if (!this.result) {
      throw new Error("You need to parse before calling `getResult`");
    }
    return this.result;
  }
  get(key) {
    if (!this.result || !(key in this.result)) {
      throw new Error(`\`${String(key)}\` not found in result`);
    }
    return this.result[key];
  }
}
function getParser(UA, options) {
  return new Parser(UA, options);
}
function parse(UA, options) {
  return getParser(UA, options).getResult();
}
function isAnything(parser, anything, ...args) {
  for (const comparator of args) {
    if (comparator(parser, anything)) {
      return true;
    }
  }
  return false;
}
function isSome(parser, anythings, ...args) {
  return anythings.some((anything) => isAnything(parser, anything, ...args));
}
export { isSome as a, getParser as g, isAnything as i, parse as p };
