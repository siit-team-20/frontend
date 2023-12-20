export enum UserType {
    Admin = "Admin",
    Owner = "Owner",
    Guest = "Guest",
}

export class User {

    public email: string | null;
    public password: string;
    public name: string;
    public surname: string;
    public address: string;
    public phone: string;
    public type: UserType;

    constructor(
        email: string | null,
        password: string,
        name: string,
        surname: string,
        address: string,
        phone: string,
        type: UserType
    ) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.phone = phone;
        this.type = type;
    }

}

export const UserTypeMapping: Record<UserType, string> = {
    [UserType.Admin]: "Admin",
    [UserType.Owner]: "Owner",
    [UserType.Guest]: "Guest",
}