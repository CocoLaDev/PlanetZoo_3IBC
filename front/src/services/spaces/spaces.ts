import axios, { CancelToken } from "axios";
import { Space } from "../../dto/spaces/spaces";

export class Spaces {
    static async getAllSpaces(token?: CancelToken): Promise<Space[] | null> {
        try {
            const response = await axios.get('http://localhost:3000/api/spaces/getallspaces', {
                cancelToken: token
            });
            if (response.data) {
                return response.data;
            }
        } catch (err: unknown) {
            return null;
        }
        return null;
    }

    static async getSpaceById(id: string, token?: CancelToken): Promise<Space | null> {
        try {
            const response = await axios.get(`http://localhost:3000/api/spaces/getspacebyid/${id}`, {
                cancelToken: token
            });
            if (response.data) {
                return response.data;
            }
        } catch (err: unknown) {
            return null;
        }
        return null;
    }

    static async updateSpace(updatedSpace: Space, token?: CancelToken): Promise<string | null> {
        try {
            const userToken = localStorage.getItem("token");
            if (userToken === null) {
                throw new Error("No token found");
            }
            const headers = {
                Authorization: `Bearer ${userToken}`
            };
            const response = await axios.put(`http://localhost:3000/api/spaces/update/${updatedSpace._id}`, updatedSpace, {
                cancelToken: token,
                headers: headers
            });

            if (response.data) {
                return response.data;
            }
        } catch (err: unknown) {
            return null;
        }
        return null;
    }


    static async deleteSpace(id: string, token?: CancelToken): Promise<string | null> {
        try {
            const userToken = localStorage.getItem("token");
            if (userToken === null) {
                throw new Error("No token found");
            }
            const headers = {
                Authorization: `Bearer ${userToken}`
            };

            const response = await axios.delete(`http://localhost:3000/api/spaces/delete/${id}`, {
                cancelToken: token,
                headers: headers
            });

            if (response.data) {
                return response.data;
            }
        } catch (err) {
            return null;
        }
        return null;
    }



    // use this /api/spaces/maintenance/{id}
    static async setMaintenanceSpace(id: string, token?: CancelToken): Promise<string | null> {
        try {
            const userToken = localStorage.getItem("token");
            if (userToken === null) {
                throw new Error("No token found");
            }
            const headers = {
                Authorization: `Bearer ${userToken}`
            };
            const response = await axios.put(`http://localhost:3000/api/spaces/maintenance/${id}`, {
                cancelToken: token,
                headers: headers
            });
            if (response.data) {
                return response.data;
            }
        } catch (err: unknown) {
            return null;
        }
        return null;
    }



    // now this PUT /api/spaces/maintenanceoff/{id}
    static async setMaintenanceSpaceOff(id: string, token?: CancelToken): Promise<string | null> {
        try {
            const userToken = localStorage.getItem("token");
            if (userToken === null) {
                throw new Error("No token found");
            }
            const headers = {
                Authorization: `Bearer ${userToken}`
            };

            const response = await axios.put(`http://localhost:3000/api/spaces/maintenanceoff/${id}`, {
                cancelToken: token,
                headers: headers
            });
            if (response.data) {
                return response.data;
            }
        } catch (err: unknown) {
            return null;
        }
        return null;
    }


    static async createSpace(name: string, description: string, images: string, type: string, capacity: number, duration: number, openingHours: string, disabledAccess: boolean, token?: CancelToken): Promise<string | null> {
        try {
            const body = {
                name,
                description,
                images,
                type,
                capacity,
                duration,
                openingHours,
                disabledAccess
            };
            const response = await axios.post('http://localhost:3000/api/spaces/createspace', body, {
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
}