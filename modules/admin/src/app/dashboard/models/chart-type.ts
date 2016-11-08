import { MetaData } from '../../common/models/meta-data';

export class ChartType {
    public metaData: MetaData;
    public name: string;

    constructor(metaData: MetaData, name: string) {
        this.metaData = metaData;
        this.name = name;
    }
}
