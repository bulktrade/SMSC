export abstract class PropertyModel {
    public name: string;
    public type: string;
    public mandatory: boolean;
    public readonly: boolean;
    public notNull: boolean;
    public min: string;
    public max: string;
    public regexp: string;
    public collate: string;
    public defaultValue: string;
    public crudClassMetaData: string;
    public decorator: string;
    public editable: boolean;
    public order: number;
    public property: string;
    public visible: boolean;
}