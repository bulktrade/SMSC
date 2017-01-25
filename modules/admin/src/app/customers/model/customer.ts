export interface CustomerModel {
    id: string,
    country: string,
    city: string,
    companyName: string,
    street: string,
    street2: string,
    postcode: string,
    vatid: number,
    customerId: string,
    contacts: any[]
    users: any[],
    parentCustomer: any
}
