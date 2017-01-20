import { SelectItem } from "primeng/components/common/api";

export interface ColumnDef {
    property: string;
    headerName: string;
    editable: boolean;
    visible: boolean;
    decorator: string;
    type: string;
    order: number,
    linkedClass?: string
    options?: SelectItem[]
    linkedRepository?: string
    columnWidth?: string,
    fieldLayoutGridPosition?: string
}
