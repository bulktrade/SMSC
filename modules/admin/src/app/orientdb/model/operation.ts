import { BatchType } from "./batchType";

export interface Operation {
    type: string|BatchType,
    record: Object
}