import axios, { CancelToken } from "axios";
import { User } from "../../dto/users/users";

export class Users {
    static async getById(id: string, token?: CancelToken): Promise<User | null> {
        try {
            const userToken = localStorage.getItem("token");
            if (userToken === null) throw new Error("No token found");
            const response = await axios.get(`http://localhost:3000/api/users/getUserById/${id}`, {
                cancelToken: token,
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
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
            const userToken = localStorage.getItem("token");
            if (userToken === null) throw new Error("No token found");
            const response = await axios.get(`http://localhost:3000/api/users/getAllUsers`, {
                cancelToken: token,
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
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
            const userToken = localStorage.getItem("token");
            if (userToken === null) throw new Error("No token found");
            const response = await axios.put(`http://localhost:3000/api/users/updateUser/${user._id}`, {
                username: user.username,
                password: user.password,
                role: user.role,
            }, {
                cancelToken: token,
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            if (response.data) {
                return response.data;
            }
        } catch (err: unknown) {
            return null;
        }
        return null;
    }

    static async delete(id: string, token?: CancelToken): Promise<string | null> {
        try {
            const userToken = localStorage.getItem("token");
            if (userToken === null) throw new Error("No token found");
            const response = await axios.delete(`http://localhost:3000/api/users/deleteUser/${id}`, {
                cancelToken: token,
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
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