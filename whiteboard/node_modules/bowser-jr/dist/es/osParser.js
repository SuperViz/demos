import { g as getFirstMatch, a as getSecondMatch } from "./utils.js";
const OS_MAP = {
  WindowsPhone: "Windows Phone",
  Windows: "Windows",
  MacOS: "macOS",
  iOS: "iOS",
  Android: "Android",
  WebOS: "WebOS",
  BlackBerry: "BlackBerry",
  Bada: "Bada",
  Tizen: "Tizen",
  Linux: "Linux",
  ChromeOS: "Chrome OS",
  PlayStation4: "PlayStation 4",
  Roku: "Roku"
};
function getWindowsVersionName(version) {
  switch (version) {
    case "NT":
      return "NT";
    case "XP":
      return "XP";
    case "NT 5.0":
      return "2000";
    case "NT 5.1":
      return "XP";
    case "NT 5.2":
      return "2003";
    case "NT 6.0":
      return "Vista";
    case "NT 6.1":
      return "7";
    case "NT 6.2":
      return "8";
    case "NT 6.3":
      return "8.1";
    case "NT 10.0":
      return "10";
    default:
      return void 0;
  }
}
function getMacOSVersionName(version) {
  const v = version.split(".").splice(0, 2).map((s) => parseInt(s, 10) || 0);
  v.push(0);
  if (v[0] !== 10)
    return void 0;
  switch (v[1]) {
    case 5:
      return "Leopard";
    case 6:
      return "Snow Leopard";
    case 7:
      return "Lion";
    case 8:
      return "Mountain Lion";
    case 9:
      return "Mavericks";
    case 10:
      return "Yosemite";
    case 11:
      return "El Capitan";
    case 12:
      return "Sierra";
    case 13:
      return "High Sierra";
    case 14:
      return "Mojave";
    case 15:
      return "Catalina";
    default:
      return void 0;
  }
}
function getAndroidVersionName(version) {
  const v = version.split(".").splice(0, 2).map((s) => parseInt(s, 10) || 0);
  v.push(0);
  if (v[0] === 1 && v[1] < 5)
    return void 0;
  if (v[0] === 1 && v[1] < 6)
    return "Cupcake";
  if (v[0] === 1 && v[1] >= 6)
    return "Donut";
  if (v[0] === 2 && v[1] < 2)
    return "Eclair";
  if (v[0] === 2 && v[1] === 2)
    return "Froyo";
  if (v[0] === 2 && v[1] > 2)
    return "Gingerbread";
  if (v[0] === 3)
    return "Honeycomb";
  if (v[0] === 4 && v[1] < 1)
    return "Ice Cream Sandwich";
  if (v[0] === 4 && v[1] < 4)
    return "Jelly Bean";
  if (v[0] === 4 && v[1] >= 4)
    return "KitKat";
  if (v[0] === 5)
    return "Lollipop";
  if (v[0] === 6)
    return "Marshmallow";
  if (v[0] === 7)
    return "Nougat";
  if (v[0] === 8)
    return "Oreo";
  if (v[0] === 9)
    return "Pie";
  return void 0;
}
const osList = [
  {
    test: [/Roku\/DVP/],
    describe(ua) {
      const version = getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, ua);
      return {
        name: OS_MAP.Roku,
        version
      };
    }
  },
  {
    test: [/windows phone/i],
    describe(ua) {
      const version = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, ua);
      return {
        name: OS_MAP.WindowsPhone,
        version
      };
    }
  },
  {
    test: [/windows /i],
    describe(ua) {
      const version = getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, ua);
      const versionName = getWindowsVersionName(version);
      return {
        name: OS_MAP.Windows,
        version,
        versionName
      };
    }
  },
  {
    test: [/Macintosh(.*?) FxiOS(.*?)\//],
    describe(ua) {
      const result = {
        name: OS_MAP.iOS
      };
      const version = getSecondMatch(/(Version\/)(\d[\d.]+)/, ua);
      if (version) {
        result.version = version;
      }
      return result;
    }
  },
  {
    test: [/macintosh/i],
    describe(ua) {
      const version = getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, ua).replace(/[_\s]/g, ".");
      const versionName = getMacOSVersionName(version);
      const os = {
        name: OS_MAP.MacOS,
        version
      };
      if (versionName) {
        os.versionName = versionName;
      }
      return os;
    }
  },
  {
    test: [/(ipod|iphone|ipad)/i],
    describe(ua) {
      const version = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, ua).replace(/[_\s]/g, ".");
      return {
        name: OS_MAP.iOS,
        version
      };
    }
  },
  {
    test(parser) {
      const notLikeAndroid = !parser.test(/like android/i);
      const butAndroid = parser.test(/android/i);
      return notLikeAndroid && butAndroid;
    },
    describe(ua) {
      const version = getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, ua);
      const versionName = getAndroidVersionName(version);
      const os = {
        name: OS_MAP.Android,
        version
      };
      if (versionName) {
        os.versionName = versionName;
      }
      return os;
    }
  },
  {
    test: [/(web|hpw)[o0]s/i],
    describe(ua) {
      const version = getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, ua);
      const os = {
        name: OS_MAP.WebOS
      };
      if (version && version.length) {
        os.version = version;
      }
      return os;
    }
  },
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(ua) {
      const version = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, ua) || getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, ua) || getFirstMatch(/\bbb(\d+)/i, ua);
      return {
        name: OS_MAP.BlackBerry,
        version
      };
    }
  },
  {
    test: [/bada/i],
    describe(ua) {
      const version = getFirstMatch(/bada\/(\d+(\.\d+)*)/i, ua);
      return {
        name: OS_MAP.Bada,
        version
      };
    }
  },
  {
    test: [/tizen/i],
    describe(ua) {
      const version = getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, ua);
      return {
        name: OS_MAP.Tizen,
        version
      };
    }
  },
  {
    test: [/linux/i],
    describe() {
      return {
        name: OS_MAP.Linux
      };
    }
  },
  {
    test: [/CrOS/],
    describe() {
      return {
        name: OS_MAP.ChromeOS
      };
    }
  },
  {
    test: [/PlayStation 4/],
    describe(ua) {
      const version = getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, ua);
      return {
        name: OS_MAP.PlayStation4,
        version
      };
    }
  }
];
function osParser(parser) {
  let result = {};
  const osDescriptor = osList.find((candidate) => {
    if (typeof candidate.test === "function") {
      return candidate.test(parser);
    }
    if (candidate.test instanceof Array) {
      return candidate.test.some((condition) => parser.test(condition));
    }
    throw new Error("Browser's test function is not valid");
  });
  if (osDescriptor) {
    result = osDescriptor.describe(parser.getUA());
  }
  return { os: result };
}
function getOS(parser) {
  try {
    return parser.getResult().os;
  } catch (e) {
    return osParser(parser).os;
  }
}
function getOSName(parser, toLowerCase = false) {
  var _a, _b;
  if (toLowerCase) {
    return ((_a = getOS(parser).name) != null ? _a : "").toLowerCase();
  }
  return (_b = getOS(parser).name) != null ? _b : "";
}
function getOSVersion(parser) {
  var _a;
  return (_a = getOS(parser).version) != null ? _a : "";
}
function getOSVersionName(parser, toLowerCase = false) {
  var _a, _b;
  if (toLowerCase) {
    return ((_a = getOS(parser).versionName) != null ? _a : "").toLowerCase();
  }
  return (_b = getOS(parser).versionName) != null ? _b : "";
}
function isOS(parser, osName) {
  return getOSName(parser, true) === osName.toLowerCase();
}
export { OS_MAP as O, getOSName as a, getOSVersion as b, getOSVersionName as c, getOS as g, isOS as i, osParser as o };
