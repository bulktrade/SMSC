import { MetaData } from "../../common/models/metaData";

export class ChartType {
    public metaData: MetaData;
    public name: string;

    constructor(metaData: MetaData, name: string) {
        this.metaData = metaData;
        this.name = name;
    }
}
