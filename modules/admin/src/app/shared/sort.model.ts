export class SortType {
    public static ASC: string = 'asc';
    public static DESC: string = 'desc';
}

export class Sort {
    constructor(public orderBy: string,
                public sortType: SortType) {
    }
}
