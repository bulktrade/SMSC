export interface ColumnDef {
    property: string;
    headerName: string;
    editable: boolean;
    visible: boolean;
    decorator: string;
    order: number,
    columnWidth?: string,
    fieldLayoutGridPosition?: string
}
