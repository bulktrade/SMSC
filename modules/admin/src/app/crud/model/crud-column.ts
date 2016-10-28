import { ColumnDefsModel } from './column-definitions';

export class ColumnModel extends ColumnDefsModel {
    public isExistGridColumn?: boolean;
    public isExistFormColumn?: boolean;
    public columnDefs?: ColumnDefsModel;
}
