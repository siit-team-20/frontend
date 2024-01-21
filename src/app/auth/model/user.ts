export enum UserType {
    Admin = "Admin",
    Owner = "Owner",
    Guest = "Guest",
}

export class User {

    public email: string;
    public password: string;
    public name: string;
    public surname: string;
    public address: string;
    public phone: string;
    public type: UserType;
    public isBlocked: boolean

    constructor(
        email: string,
        password: string,
        name: string,
        surname: string,
        address: string,
        phone: string,
        type: UserType,
        isBlocked: boolean
    ) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.phone = phone;
        this.type = type;
        this.isBlocked = isBlocked;
    }

}

export const UserTypeMapping: Record<UserType, string> = {
    [UserType.Admin]: "Admin",
    [UserType.Owner]: "Owner",
    [UserType.Guest]: "Guest",
}