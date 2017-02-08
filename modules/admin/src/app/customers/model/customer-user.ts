export interface CustomerUser {
    username: string,
    password: string,
    salt: string,
    firstname: string,
    surname: string,
    email: string,
    active: boolean,
    created: string,
    blocked: boolean
}
