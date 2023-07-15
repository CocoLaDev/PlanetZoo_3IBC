import axios, { CancelToken } from "axios";
import { Treatmen } from "../../dto/";

export class Treatmens {

    static async getAllTreatmens(token?: CancelToken): Promise <Treatmen[] | null> {
        try {
            const response = await axios.get('http://localhost:3000/api/treatments/getalltreatments', {
                cancelToken: token
            });
            if (response.data) {
                return response.data;
            }
        }
        catch (err: unknown) {
            return null;
        }
        return null;
    }

    static async getTreatmenById(id: string, token?: CancelToken): Promise <Treatmen | null> {
        try {
            const response = await axios.get(`http://localhost:3000/api/treatmens/gettreatmenbyid/${id}`, {
                cancelToken: token
            });
            if (response.data) {
                return response.data;
            }
        }
        catch (err: unknown) {
            return null;
        }
        return null;
    }

    static async updateTreatmen(id: string, animalId: string, veterinarianId: string, date: string, treatmentDescription: string, token?: CancelToken): Promise <boolean> {
        try {
            const response = await axios.put(`http://localhost:3000/api/treatmens/updateTreatment/${id}`, {
                animalId: animalId,
                veterinarianId: veterinarianId,
                date: date,
                treatmentDescription: treatmentDescription
            }, {
                cancelToken: token
            });
            if (response.data) {
                return true;
            }
        }
        catch (err: unknown) {
            return false;
        }
        return false;
    }

    static async deleteTreatmen(id: string, token?: CancelToken): Promise <boolean> {
        try {
            const response = await axios.delete(`http://localhost:3000/api/treatmens/deletetreatment/${id}`, {
                cancelToken: token
            });
            if (response.data) {
                return true;
            }
        }
        catch (err: unknown) {
            return false;
        }
        return false;
    }

    static async createTreatmen(animalId: string, veterinarianId: string, date: string, treatmentDescription: string, token?: CancelToken): Promise <boolean> {
        try {
            
            const userToken = localStorage.getItem("token");
            if (userToken === null) {
                throw new Error("No token found");
            }
            const headers = {
                Authorization: `Bearer ${userToken}`
            };

            console.log(userToken);

            const body = {
                animalId: animalId,
                veterinarianId: veterinarianId,
                date: date,
                treatmentDescription: treatmentDescription
            };

            const response = await axios.post('http://localhost:3000/api/treatmens/createtreatment',body, {
                cancelToken: token,
                headers: headers
            });
            if (response.data) {
                return true;
            }
        }
        catch (err: unknown) {
            return false;
        }
        return false;
    }
}

export default Treatmens;




        
