import { g as getFirstMatch } from "./utils.js";
const PLATFORMS_MAP = {
  tablet: "tablet",
  mobile: "mobile",
  desktop: "desktop",
  tv: "tv"
};
const platformsList = [
  {
    test: [/googlebot/i],
    describe() {
      return {
        type: "bot",
        vendor: "Google"
      };
    }
  },
  {
    test: [/huawei/i],
    describe(ua) {
      const model = getFirstMatch(/(can-l01)/i, ua) && "Nova";
      const platform = {
        type: PLATFORMS_MAP.mobile,
        vendor: "Huawei"
      };
      if (model) {
        platform.model = model;
      }
      return platform;
    }
  },
  {
    test: [/nexus\s*(?:7|8|9|10).*/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: "Nexus"
      };
    }
  },
  {
    test: [/ipad/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: "Apple",
        model: "iPad"
      };
    }
  },
  {
    test: [/Macintosh(.*?) FxiOS(.*?)\//],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: "Apple",
        model: "iPad"
      };
    }
  },
  {
    test: [/kftt build/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: "Amazon",
        model: "Kindle Fire HD 7"
      };
    }
  },
  {
    test: [/silk/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: "Amazon"
      };
    }
  },
  {
    test: [/tablet(?! pc)/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet
      };
    }
  },
  {
    test(parser) {
      const iDevice = parser.test(/ipod|iphone/i);
      const likeIDevice = parser.test(/like (ipod|iphone)/i);
      return iDevice && !likeIDevice;
    },
    describe(ua) {
      const model = getFirstMatch(/(ipod|iphone)/i, ua);
      return {
        type: PLATFORMS_MAP.mobile,
        vendor: "Apple",
        model
      };
    }
  },
  {
    test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
    describe() {
      return {
        type: PLATFORMS_MAP.mobile,
        vendor: "Nexus"
      };
    }
  },
  {
    test: [/[^-]mobi/i],
    describe() {
      return {
        type: PLATFORMS_MAP.mobile
      };
    }
  },
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe() {
      return {
        type: PLATFORMS_MAP.mobile,
        vendor: "BlackBerry"
      };
    }
  },
  {
    test: [/bada/i],
    describe() {
      return {
        type: PLATFORMS_MAP.mobile
      };
    }
  },
  {
    test: [/windows phone/i],
    describe() {
      return {
        type: PLATFORMS_MAP.mobile,
        vendor: "Microsoft"
      };
    }
  },
  {
    test(parser) {
      const notLikeAndroid = !parser.test(/like android/i);
      const butAndroid = parser.test(/android/i);
      const isAndroid = notLikeAndroid && butAndroid;
      const version = getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, parser.getUA());
      const osMajorVersion = Number(String(version).split(".")[0]);
      return isAndroid && osMajorVersion >= 3;
    },
    describe() {
      return {
        type: PLATFORMS_MAP.tablet
      };
    }
  },
  {
    test(parser) {
      const notLikeAndroid = !parser.test(/like android/i);
      const butAndroid = parser.test(/android/i);
      return notLikeAndroid && butAndroid;
    },
    describe() {
      return {
        type: PLATFORMS_MAP.mobile
      };
    }
  },
  {
    test: [/macintosh/i],
    describe() {
      return {
        type: PLATFORMS_MAP.desktop,
        vendor: "Apple"
      };
    }
  },
  {
    test(parser) {
      const maybeLinux = parser.test(/windows/i);
      const isRoku = parser.test(/Roku\/DVP/);
      const isWebOS = parser.test(/(web|hpw)[o0]s/i);
      return maybeLinux && !isRoku && !isWebOS;
    },
    describe() {
      return {
        type: PLATFORMS_MAP.desktop
      };
    }
  },
  {
    test(parser) {
      const maybeLinux = parser.test(/linux/i);
      const isRoku = parser.test(/Roku\/DVP/);
      const isWebOS = parser.test(/(web|hpw)[o0]s/i);
      return maybeLinux && !isRoku && !isWebOS;
    },
    describe() {
      return {
        type: PLATFORMS_MAP.desktop
      };
    }
  },
  {
    test: [/PlayStation 4/],
    describe() {
      return {
        type: PLATFORMS_MAP.tv
      };
    }
  },
  {
    test: [/Roku\/DVP/],
    describe() {
      return {
        type: PLATFORMS_MAP.tv
      };
    }
  }
];
function platformParser(parser) {
  let result = {};
  const platformDescriptor = platformsList.find((candidate) => {
    if (typeof candidate.test === "function") {
      return candidate.test(parser);
    }
    if (candidate.test instanceof Array) {
      return candidate.test.some((condition) => parser.test(condition));
    }
    throw new Error("Browser's test function is not valid");
  });
  if (platformDescriptor) {
    result = platformDescriptor.describe(parser.getUA());
  }
  return { platform: result };
}
function getPlatform(parser) {
  try {
    return parser.getResult().platform;
  } catch (e) {
    return platformParser(parser).platform;
  }
}
function getPlatformType(parser) {
  var _a;
  return (_a = getPlatform(parser).type) != null ? _a : "";
}
function getPlatformVendor(parser, toLowerCase = false) {
  var _a, _b;
  if (toLowerCase) {
    return ((_a = getPlatform(parser).vendor) != null ? _a : "").toLowerCase();
  }
  return (_b = getPlatform(parser).vendor) != null ? _b : "";
}
function getPlatformModel(parser, toLowerCase = false) {
  var _a, _b;
  if (toLowerCase) {
    return ((_a = getPlatform(parser).model) != null ? _a : "").toLowerCase();
  }
  return (_b = getPlatform(parser).model) != null ? _b : "";
}
function isPlatform(parser, platformType) {
  return getPlatformType(parser) === platformType.toLowerCase();
}
export { PLATFORMS_MAP as P, getPlatformType as a, getPlatformVendor as b, getPlatformModel as c, getPlatform as g, isPlatform as i, platformParser as p };
