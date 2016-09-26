import { ColumnDefsModel } from './columnDefs.model';

export class ColumnModel extends ColumnDefsModel {
    public isExistGridColumn?: boolean;
    public isExistFormColumn?: boolean;
    public columnDefs?: ColumnDefsModel;
}
