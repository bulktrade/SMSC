import { BatchType } from './batchType';

export class Operation {
    public type: string|BatchType;
    public record: Object;
}
