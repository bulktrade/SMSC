export class GrowlModel {
    constructor(public severity: string,
                public detail: string,
                public summary?: string) {
    }
}