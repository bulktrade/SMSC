import { MetaData } from '../../shared/components/models/meta-data';
export class DashboardBoxType {
    metaData: MetaData;
    code: string;
    codeLanguage: string;
    type: string;
    kind: string;
    name: string;

    constructor(metaData: MetaData,
                type: string,
                kind: string,
                code: string,
                codeLanguage: string,
                name: string) {
        this.metaData = metaData;
        this.code = code;
        this.type = type;
        this.kind = kind;
        this.codeLanguage = codeLanguage;
        this.name = name;
    }
}
