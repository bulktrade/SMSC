import { ColumnDef } from "./column-definition";

export interface GridOptions {
    columnDefs: ColumnDef[];
    rowData;
    totalElements?: number
}
