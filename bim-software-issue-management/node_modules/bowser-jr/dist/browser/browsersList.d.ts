import type { DescriptorList } from "../types";
export interface Browser {
    name?: string;
    version?: string;
}
export declare const browsersList: DescriptorList<Browser>;
