import axios, { CancelToken } from "axios";
import { ServiceBook, Space } from "../../dto";

export class ServiceBooks {
    static async getServiceBookBySpaceId(id: string, token?: CancelToken): Promise<ServiceBook[] | null> {
        try {
            const userToken = localStorage.getItem("token");
            if (userToken === null) throw new Error("No token found");
            const response = await axios.get(`http://localhost:3000/api/servicebook/getservicebookbyspaceid/${id}`, {
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

    static async createServiceBook(servicebook: ServiceBook, token?: CancelToken): Promise<ServiceBook | null> {
        try {
            const userToken = localStorage.getItem("token");
            if (userToken === null) throw new Error("No token found");
            const response = await axios.post(`http://localhost:3000/api/servicebook/createservicebook`, servicebook, {
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

    static async updateServiceBook(servicebook: ServiceBook, token?: CancelToken): Promise<ServiceBook | null> {
        try {
            const userToken = localStorage.getItem("token");
            if (userToken === null) throw new Error("No token found");
            const response = await axios.put(`http://localhost:3000/api/servicebook/update/${servicebook._id}`, servicebook, {
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