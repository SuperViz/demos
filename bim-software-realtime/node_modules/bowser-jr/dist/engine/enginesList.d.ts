import type { DescriptorList } from "../types";
export interface Engine {
    name?: string;
    version?: string;
}
export declare const enginesList: DescriptorList<Engine>;
