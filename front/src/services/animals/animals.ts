import axios, { CancelToken } from "axios";
import { Animal } from "../../dto/animals/animals";

export class Animals {

    static async getAnimals(token?: CancelToken): Promise<Animal[] | null> {
        try {
            const userToken = localStorage.getItem("token");
            if (userToken === null) throw new Error("No token found");
            const response = await axios.get('http://localhost:3000/api/animals/getAnimals', {
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

    static async getAnimalById(id: string, token?: CancelToken): Promise<Animal | null> {
        try {
            const userToken = localStorage.getItem("token");
            if (userToken === null) throw new Error("No token found");
            const response = await axios.get(`http://localhost:3000/api/animals/getAnimalById/${id}`, {
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

    static async updateAnimal(animal: Animal, token?: CancelToken): Promise<string | null> {
        try {
            const userToken = localStorage.getItem("token");
            if (userToken === null) throw new Error("No token found");
            const headers = {
                Authorization: `Bearer ${userToken}`
            };
            const body = {
                name: animal.name,
                species: animal.species,
                age: animal.age,
                description: animal.description,
                healthStatus: animal.healthStatus,
                treatments: animal.treatments,
                spaceId: animal.spaceId
            };

            const response = await axios.put(`http://localhost:3000/api/animals/updateAnimal/${animal._id}`, body, {
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
            if (userToken === null) throw new Error("No token found");
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
            if (userToken === null) throw new Error("No token found");
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

            const response = await axios.post(`http://localhost:3000/api/animals/createAnimal`, body, {
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