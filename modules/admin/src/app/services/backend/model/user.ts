export interface User {
    username: string;
    password: string;
    firstname: string;
    surname: string;
    email: string;
    active?: boolean;
    blocked?: boolean;
}
