export enum UserRole {
    "admin",
    "veterinarian",
    "employee",
    "entretienAgent",
    "seller",
    "visitor"
}

export interface User{
    username: string,
    password: string,
    token: string,
    role: UserRole
}