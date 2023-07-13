import axios, { CancelToken } from "axios";
import { User } from "../../dto/users/users";

export class Users {
    static async getById(id: string, token?: CancelToken): Promise<User | null> {
        try {
            const response = await axios.get(`http://localhost:3000/api/users/getUserById/${id}`, {
                cancelToken: token,
            });
            if (response.data) {
                return response.data;
            }
        } catch (err: unknown) {
            return null;
        }
        return null;
    }

    static async getAll(token?: CancelToken): Promise<User[] | null> {
        try {
            const response = await axios.get(`http://localhost:3000/api/users/getAllUsers`, {
                cancelToken: token,
            });
            if (response.data) {
                return response.data;
            }
        } catch (err: unknown) {
            return null;
        }
        return null;
    }

    static async update(user: User, token?: CancelToken): Promise<User | null> {
        try {
            const response = await axios.put(`http://localhost:3000/api/users/updateUser/${user._id}`, {
                cancelToken: token,
                username: user.username,
                password: user.password,
                role: user.role,
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