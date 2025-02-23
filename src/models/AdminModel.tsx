export enum Role {
    Admin = "ADMIN",
    Administrative = "ADMINISTRATIVE",
}

export class AdminModel {
    username: string;
    email: string;
    password: string;
    phone: string;
    role: Role;

    constructor(username: string, email: string, password: string, phone: string, role: Role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.role = role;
    }
}