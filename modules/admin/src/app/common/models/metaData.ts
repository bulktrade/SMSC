export class MetaData {
    className: string;
    rid: string;
    version: string;


    constructor(className: string, rid: string, version: string) {
        this.className = className;
        this.rid = rid;
        this.version = version;
    }
}
