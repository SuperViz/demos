/**
 * Get Windows version name
 *
 * @example
 *   getWindowsVersionName("NT 10.0") // "10"
 *
 * @param   {string} version
 * @returns {string} versionName
 */
export declare function getWindowsVersionName(version: string): "NT" | "XP" | "2000" | "2003" | "Vista" | "7" | "8" | "8.1" | "10" | undefined;
/**
 * Get macOS version name
 *    10.5 - Leopard
 *    10.6 - Snow Leopard
 *    10.7 - Lion
 *    10.8 - Mountain Lion
 *    10.9 - Mavericks
 *    10.10 - Yosemite
 *    10.11 - El Capitan
 *    10.12 - Sierra
 *    10.13 - High Sierra
 *    10.14 - Mojave
 *    10.15 - Catalina
 *
 * @example
 *   getMacOSVersionName("10.14") // 'Mojave'
 *
 * @param  {string} version
 * @return {string} versionName
 */
export declare function getMacOSVersionName(version: string): "Leopard" | "Snow Leopard" | "Lion" | "Mountain Lion" | "Mavericks" | "Yosemite" | "El Capitan" | "Sierra" | "High Sierra" | "Mojave" | "Catalina" | undefined;
/**
 * Get Android version name
 *    1.5 - Cupcake
 *    1.6 - Donut
 *    2.0 - Eclair
 *    2.1 - Eclair
 *    2.2 - Froyo
 *    2.x - Gingerbread
 *    3.x - Honeycomb
 *    4.0 - Ice Cream Sandwich
 *    4.1 - Jelly Bean
 *    4.4 - KitKat
 *    5.x - Lollipop
 *    6.x - Marshmallow
 *    7.x - Nougat
 *    8.x - Oreo
 *    9.x - Pie
 *
 * @example
 *   getAndroidVersionName("7.0") // 'Nougat'
 *
 * @param  {string} version
 * @return {string} versionName
 */
export declare function getAndroidVersionName(version: string): "Cupcake" | "Donut" | "Eclair" | "Froyo" | "Gingerbread" | "Honeycomb" | "Ice Cream Sandwich" | "Jelly Bean" | "KitKat" | "Lollipop" | "Marshmallow" | "Nougat" | "Oreo" | "Pie" | undefined;
