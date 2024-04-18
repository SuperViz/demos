import type { DescriptorList } from "../types";
export interface OS {
    name?: string;
    version?: string;
    versionName?: string;
}
export declare const osList: DescriptorList<OS>;
