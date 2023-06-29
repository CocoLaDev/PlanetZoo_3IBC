import axios, { CancelToken } from "axios";
import { User, UserRole } from "../../dto/users/users";

export class Auth {
    static async login(username: string, password: string, token?: CancelToken): Promise<User | null> {
        try {
            const response = await axios.post('http://localhost:3000/api/users/login', {
                cancelToken: token,
                username: username,
                password: password
            });
            if (response.data) {
                return response.data;
            }
        } catch (err: unknown) {
            return null;
        }
        return null;
    }

    static async register(username: string, password: string, role: UserRole, token?: CancelToken): Promise<User | null> {
        try {
            const response = await axios.post('http://localhost:3000/api/users/createUsers', {
                cancelToken: token,
                username: username,
                password: password,
                role: role
            });
            if (response.data) {
                return response.data;
            }
        } catch (err: unknown) {
            return null;
        }
        return null;
    }
}