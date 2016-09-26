import { Operation } from "./operation";

export interface Batch {
    transaction: boolean,
    operations: Array<Operation>
}