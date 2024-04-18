import type { DescriptorList } from "../types";
export interface Platform {
    type?: string;
    vendor?: string;
    model?: string;
}
export declare const platformsList: DescriptorList<Platform>;
