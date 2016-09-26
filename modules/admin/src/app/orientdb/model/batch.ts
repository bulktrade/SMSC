import { Operation } from './operation';

export class Batch {
    public transaction: boolean;
    public operations: Array<Operation>;
}
