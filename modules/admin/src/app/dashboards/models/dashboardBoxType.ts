import { MetaData } from "../../common/models/metaData";
export class DashboardBoxType {
    metaData: MetaData;
    code: string;
    codeLanguage: string;
    name: string;

    constructor(metaData: MetaData, code: string, codeLanguage: string, name: string) {
        this.metaData = metaData;
        this.code = code;
        this.codeLanguage = codeLanguage;
        this.name = name;
    }
}
