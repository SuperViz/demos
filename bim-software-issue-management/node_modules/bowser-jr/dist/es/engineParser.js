import { g as getFirstMatch } from "./utils.js";
const ENGINE_MAP = {
  EdgeHTML: "EdgeHTML",
  Blink: "Blink",
  Trident: "Trident",
  Presto: "Presto",
  Gecko: "Gecko",
  WebKit: "WebKit"
};
const enginesList = [
  {
    test: [/edg([ea]|ios)/i, /\sedg\//i],
    describe(ua) {
      const isBlinkBased = /\sedg\//i.test(ua);
      if (isBlinkBased) {
        return {
          name: ENGINE_MAP.Blink
        };
      }
      const version = getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, ua);
      return {
        name: ENGINE_MAP.EdgeHTML,
        version
      };
    }
  },
  {
    test: [/trident/i],
    describe(ua) {
      const engine = {
        name: ENGINE_MAP.Trident
      };
      const version = getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        engine.version = version;
      }
      return engine;
    }
  },
  {
    test(parser) {
      return parser.test(/presto/i);
    },
    describe(ua) {
      const engine = {
        name: ENGINE_MAP.Presto
      };
      const version = getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        engine.version = version;
      }
      return engine;
    }
  },
  {
    test(parser) {
      const isGecko = parser.test(/gecko/i);
      const likeGecko = parser.test(/like gecko/i);
      return isGecko && !likeGecko;
    },
    describe(ua) {
      const engine = {
        name: ENGINE_MAP.Gecko
      };
      const version = getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        engine.version = version;
      }
      return engine;
    }
  },
  {
    test: [/(apple)?webkit\/537\.36/i],
    describe() {
      return {
        name: ENGINE_MAP.Blink
      };
    }
  },
  {
    test: [/(apple)?webkit/i],
    describe(ua) {
      const engine = {
        name: ENGINE_MAP.WebKit
      };
      const version = getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        engine.version = version;
      }
      return engine;
    }
  }
];
function engineParser(parser) {
  let result = {};
  const engineDescriptor = enginesList.find((candidate) => {
    if (typeof candidate.test === "function") {
      return candidate.test(parser);
    }
    if (candidate.test instanceof Array) {
      return candidate.test.some((condition) => parser.test(condition));
    }
    throw new Error("Browser's test function is not valid");
  });
  if (engineDescriptor) {
    result = engineDescriptor.describe(parser.getUA());
  }
  return { engine: result };
}
function getEngine(parser) {
  try {
    return parser.getResult().engine;
  } catch (e) {
    return engineParser(parser).engine;
  }
}
function getEngineName(parser, toLowerCase = false) {
  var _a, _b;
  if (toLowerCase) {
    return ((_a = getEngine(parser).name) != null ? _a : "").toLowerCase();
  }
  return (_b = getEngine(parser).name) != null ? _b : "";
}
function isEngine(parser, engineName) {
  return getEngineName(parser, true) === engineName.toLowerCase();
}
export { ENGINE_MAP as E, getEngineName as a, engineParser as e, getEngine as g, isEngine as i };
