import axios, { CancelToken } from "axios";
import { Animal } from "../../dto/animals/animals";

export class Animals {

    static async getAnimals(token?: CancelToken): Promise<Animal[] | null> {
        try {
            const response = await axios.get('http://localhost:3000/api/animals/getAnimals', {
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

    static async getAnimalById(id: string, token?: CancelToken): Promise<Animal | null> {
        try {
            const response = await axios.get(`http://localhost:3000/api/animals/getAnimalById/${id}`, {
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

    static async updateAnimal(id: string, name: string, species: string, age: number, description: string, healthStatus: string, treatments: string[], spaceId: string, token?: CancelToken): Promise<string | null> {
        try {
            const userToken = localStorage.getItem("token");
            if (userToken === null) {
                throw new Error("No token found");
            }
            const headers = {
                Authorization: `Bearer ${userToken}`
            };
            const body = {
                name,
                species,
                age,
                description,
                healthStatus,
                treatments,
                spaceId
            };

            const response = await axios.put(`http://localhost:3000/api/animals/updateAnimal/${id}`, body, {
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

    static async deleteAnimal(id: string, token?: CancelToken): Promise<string | null> {
        try {
            const userToken = localStorage.getItem("token");
            if (userToken === null) {
                throw new Error("No token found");
            }
            const headers = {
                Authorization: `Bearer ${userToken}`
            };

            const response = await axios.delete(`http://localhost:3000/api/animals/deleteAnimal/${id}`, {
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

    static async createAnimal(name: string, species: string, age: number, description: string, healthStatus: string, treatments: string[], spaceId: string, token?: CancelToken): Promise<string | null> {
        try {
            const userToken = localStorage.getItem("token");
            if (userToken === null) {
                throw new Error("No token found");
            }
            const headers = {
                Authorization: `Bearer ${userToken}`
            };
            const body = {
                name,
                species,
                age,
                description,
                healthStatus,
                treatments,
                spaceId
               
            };

            const response = await axios.post(`http://localhost:3000/api/animals/createAnimal`,body , {
                cancelToken: token,
                headers: headers
            });

            if (response.data) {
                return response.data;
            }
        }
        catch (err) {
            return null;
        }
        return null;
    }


}