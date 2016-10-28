import { BatchType } from './batch-type';

export class Operation {
    public type: string|BatchType;
    public record: Object;
}
