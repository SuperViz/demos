import { g as getFirstMatch, a as getSecondMatch } from "./utils.js";
const BROWSER_ALIASES_MAP = {
  "Amazon Silk": "amazon_silk",
  "Android Browser": "android",
  Bada: "bada",
  BlackBerry: "blackberry",
  Chrome: "chrome",
  Chromium: "chromium",
  Electron: "electron",
  Epiphany: "epiphany",
  Firefox: "firefox",
  Focus: "focus",
  Generic: "generic",
  "Google Search": "google_search",
  Googlebot: "googlebot",
  "Internet Explorer": "ie",
  "K-Meleon": "k_meleon",
  Maxthon: "maxthon",
  Miui: "miui",
  "Microsoft Edge": "edge",
  "MZ Browser": "mz",
  "NAVER Whale Browser": "naver",
  Opera: "opera",
  "Opera Coast": "opera_coast",
  "Opera Touch": "opera_touch",
  PhantomJS: "phantomjs",
  "PlayStation 4": "ps4",
  Puffin: "puffin",
  QupZilla: "qupzilla",
  QQ: "qq",
  QQLite: "qqlite",
  Safari: "safari",
  Sailfish: "sailfish",
  "Samsung Internet for Android": "samsung_internet",
  SeaMonkey: "seamonkey",
  Sleipnir: "sleipnir",
  SlimerJS: "slimerjs",
  Swing: "swing",
  Tizen: "tizen",
  "UC Browser": "uc",
  Vivaldi: "vivaldi",
  "WebOS Browser": "webos",
  WeChat: "wechat",
  "Yandex Browser": "yandex",
  Roku: "roku"
};
const BROWSER_MAP = {
  amazon_silk: "Amazon Silk",
  android: "Android Browser",
  bada: "Bada",
  blackberry: "BlackBerry",
  chrome: "Chrome",
  chromium: "Chromium",
  electron: "Electron",
  epiphany: "Epiphany",
  firefox: "Firefox",
  focus: "Focus",
  generic: "Generic",
  googlebot: "Googlebot",
  google_search: "Google Search",
  ie: "Internet Explorer",
  k_meleon: "K-Meleon",
  maxthon: "Maxthon",
  miui: "Miui",
  edge: "Microsoft Edge",
  mz: "MZ Browser",
  naver: "NAVER Whale Browser",
  opera: "Opera",
  opera_coast: "Opera Coast",
  opera_touch: "Opera Touch",
  phantomjs: "PhantomJS",
  ps4: "PlayStation 4",
  puffin: "Puffin",
  qupzilla: "QupZilla",
  qq: "QQ Browser",
  qqlite: "QQ Browser Lite",
  safari: "Safari",
  sailfish: "Sailfish",
  samsung_internet: "Samsung Internet for Android",
  seamonkey: "SeaMonkey",
  sleipnir: "Sleipnir",
  slimerjs: "SlimerJS",
  swing: "Swing",
  tizen: "Tizen",
  uc: "UC Browser",
  vivaldi: "Vivaldi",
  webos: "WebOS Browser",
  wechat: "WeChat",
  yandex: "Yandex Browser"
};
const commonVersionIdentifier = /version\/(\d+(\.?_?\d+)+)/i;
const browsersList = [
  {
    test: [/googlebot/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.googlebot
      };
      const version = getFirstMatch(/googlebot\/(\d+(\.\d+))/i, ua) || getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/opera/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.opera
      };
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/opr\/|opios/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.opera
      };
      const version = getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, ua) || getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/SamsungBrowser/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.samsung_internet
      };
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/Whale/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.naver
      };
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/MZBrowser/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.mz
      };
      const version = getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, ua) || getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/focus/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.focus
      };
      const version = getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, ua) || getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/swing/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.swing
      };
      const version = getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, ua) || getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/coast/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.opera_coast
      };
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/opt\/\d+(?:.?_?\d+)+/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.opera_touch
      };
      const version = getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, ua) || getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/yabrowser/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.yandex
      };
      const version = getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, ua) || getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/ucbrowser/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.uc
      };
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/Maxthon|mxios/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.maxthon
      };
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/epiphany/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.epiphany
      };
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/puffin/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.puffin
      };
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/sleipnir/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.sleipnir
      };
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/k-meleon/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.k_meleon
      };
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/micromessenger/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.wechat
      };
      const version = getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, ua) || getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/qqbrowser/i],
    describe(ua) {
      const browser = {
        name: /qqbrowserlite/i.test(ua) ? BROWSER_MAP.qqlite : BROWSER_MAP.qq
      };
      const version = getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, ua) || getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/msie|trident/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.ie
      };
      const version = getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/\sedg\//i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.edge
      };
      const version = getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/edg([ea]|ios)/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.edge
      };
      const version = getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/vivaldi/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.vivaldi
      };
      const version = getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/seamonkey/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.seamonkey
      };
      const version = getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/sailfish/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.sailfish
      };
      const version = getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/silk/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.amazon_silk
      };
      const version = getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/phantom/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.phantomjs
      };
      const version = getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/slimerjs/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.slimerjs
      };
      const version = getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.blackberry
      };
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/(web|hpw)[o0]s/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.webos
      };
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/bada/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.bada
      };
      const version = getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/tizen/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.tizen
      };
      const version = getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, ua) || getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/qupzilla/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.qupzilla
      };
      const version = getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, ua) || getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/firefox|iceweasel|fxios/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.firefox
      };
      const version = getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/electron/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.electron
      };
      const version = getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/MiuiBrowser/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.miui
      };
      const version = getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/chromium/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.chromium
      };
      const version = getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, ua) || getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/chrome|crios|crmo/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.chrome
      };
      const version = getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/GSA/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.google_search
      };
      const version = getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test(parser) {
      const notLikeAndroid = !parser.test(/like android/i);
      const butAndroid = parser.test(/android/i);
      return notLikeAndroid && butAndroid;
    },
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.android
      };
      const version = getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/playstation 4/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.ps4
      };
      const version = getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/safari|applewebkit/i],
    describe(ua) {
      const browser = {
        name: BROWSER_MAP.safari
      };
      const version = getFirstMatch(commonVersionIdentifier, ua);
      if (version) {
        browser.version = version;
      }
      return browser;
    }
  },
  {
    test: [/.*/i],
    describe(ua) {
      const regexpWithoutDeviceSpec = /^(.*)\/(.*) /;
      const regexpWithDeviceSpec = /^(.*)\/(.*)[ \t]\((.*)/;
      const hasDeviceSpec = ua.search("\\(") !== -1;
      const regexp = hasDeviceSpec ? regexpWithDeviceSpec : regexpWithoutDeviceSpec;
      return {
        name: getFirstMatch(regexp, ua),
        version: getSecondMatch(regexp, ua)
      };
    }
  }
];
function getVersionPrecision(version) {
  return version.split(".").length;
}
function compareVersions(versionA, versionB, isLoose = false) {
  const versionAPrecision = getVersionPrecision(versionA);
  const versionBPrecision = getVersionPrecision(versionB);
  let precision = Math.max(versionAPrecision, versionBPrecision);
  let lastPrecision = 0;
  const chunks = [versionA, versionB].map((version) => {
    const delta = precision - getVersionPrecision(version);
    const _version = version + new Array(delta + 1).join(".0");
    return _version.split(".").map((chunk) => new Array(20 - chunk.length).join("0") + chunk).reverse();
  });
  if (isLoose) {
    lastPrecision = precision - Math.min(versionAPrecision, versionBPrecision);
  }
  precision -= 1;
  while (precision >= lastPrecision) {
    if (chunks[0][precision] > chunks[1][precision]) {
      return 1;
    }
    if (chunks[0][precision] === chunks[1][precision]) {
      if (precision === lastPrecision) {
        return 0;
      }
      precision -= 1;
    } else if (chunks[0][precision] < chunks[1][precision]) {
      return -1;
    }
  }
  return void 0;
}
function getBrowserTypeByAlias(browserAlias) {
  if (browserAlias in BROWSER_MAP) {
    return BROWSER_MAP[browserAlias];
  }
  return "";
}
function browserParser(parser) {
  let result = {};
  const browserDescriptor = browsersList.find((candidate) => {
    if (typeof candidate.test === "function") {
      return candidate.test(parser);
    }
    if (candidate.test instanceof Array) {
      return candidate.test.some((condition) => parser.test(condition));
    }
    throw new Error("Browser's test function is not valid");
  });
  if (browserDescriptor) {
    result = browserDescriptor.describe(parser.getUA());
  }
  return { browser: result };
}
function getBrowser(parser) {
  try {
    return parser.getResult().browser;
  } catch (e) {
    return browserParser(parser).browser;
  }
}
function getBrowserName(parser, toLowerCase = false) {
  var _a, _b;
  if (toLowerCase) {
    return ((_a = getBrowser(parser).name) != null ? _a : "").toLowerCase();
  }
  return (_b = getBrowser(parser).name) != null ? _b : "";
}
function getBrowserVersion(parser) {
  var _a;
  return (_a = getBrowser(parser).version) != null ? _a : "";
}
function isBrowser(parser, browserName, includingAlias = false) {
  const defaultBrowserName = getBrowserName(parser, true);
  let browserNameLower = browserName.toLowerCase();
  const alias = getBrowserTypeByAlias(browserNameLower);
  if (includingAlias && alias) {
    browserNameLower = alias.toLowerCase();
  }
  return browserNameLower === defaultBrowserName;
}
function compareVersion(parser, version) {
  var _a;
  let expectedResults = [0];
  let comparableVersion = version;
  let isLoose = false;
  const currentBrowserVersion = getBrowserVersion(parser);
  if (typeof currentBrowserVersion !== "string") {
    return false;
  }
  if (version[0] === ">" || version[0] === "<") {
    comparableVersion = version.substr(1);
    if (version[1] === "=") {
      isLoose = true;
      comparableVersion = version.substr(2);
    } else {
      expectedResults = [];
    }
    if (version[0] === ">") {
      expectedResults.push(1);
    } else {
      expectedResults.push(-1);
    }
  } else if (version[0] === "=") {
    comparableVersion = version.substr(1);
  } else if (version[0] === "~") {
    isLoose = true;
    comparableVersion = version.substr(1);
  }
  return expectedResults.indexOf((_a = compareVersions(currentBrowserVersion, comparableVersion, isLoose)) != null ? _a : Infinity) > -1;
}
export { BROWSER_MAP as B, getBrowserName as a, browserParser as b, getBrowserVersion as c, compareVersion as d, BROWSER_ALIASES_MAP as e, getBrowser as g, isBrowser as i };
