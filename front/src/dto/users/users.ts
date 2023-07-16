export enum UserRole {
    ADMIN = "admin",
    VETERINARIAN = "veterinarian",
    EMPLOYEE = "employee",
    ENTRETIENAGENT = "entretienAgent",
    SELLER = "seller",
    VISITOR = "visitor"
}

export interface User{
    _id: string,
    username: string,
    password: string,
    token: string,
    role: UserRole,
    assignedDays?: string[]
}

export interface UserLogin{
    token: string,
    user: User
}