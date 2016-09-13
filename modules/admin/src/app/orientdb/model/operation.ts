import { BatchType } from "../orientdb.batchType";

export interface Operation {
    type: string|BatchType,
    record: Array<Object>
}