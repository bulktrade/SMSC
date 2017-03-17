interface Column {
    [id: number]: boolean;
}

export class ControlCellErrors {
    companyName: Column;
    street: Column;
    street2: Column;
    postcode: Column;
    country: Column;
    city: Column;
    vatid: Column;

    constructor() {
        this.companyName = {};
        this.street = {};
        this.street2 = {};
        this.postcode = {};
        this.country = {};
        this.city = {};
        this.vatid = {};
    }
}
