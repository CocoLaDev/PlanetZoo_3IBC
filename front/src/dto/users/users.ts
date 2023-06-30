export enum UserRole {
    ADMIN = "admin",
    VETERINARIAN = "veterinarian",
    EMPLOYEE = "employee",
    ENTRETIENAGENT = "entretienAgent",
    SELLET = "seller",
    VISITOR = "visitor"
}

export interface User{
    username: string,
    password: string,
    token: string,
    role: UserRole
}

export interface UserLogin{
    token: string,
    user: User
}