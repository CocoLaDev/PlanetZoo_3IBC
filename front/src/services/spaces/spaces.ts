import axios, { CancelToken } from "axios";
import { Space } from "../../dto/spaces/spaces";

export class Spaces {
    
    static async getAllSpaces( token?: CancelToken): Promise<Space[] | null> {
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
    static async createSpace(name: string, description: string, image: string, type: string, capacity: number, duration: number, openingHours: string, disabledAccess: boolean, token?: CancelToken): Promise<string | null> {
        try {
            const params = {
                name,
                description,
                image,
                type,
                capacity,
                duration,
                openingHours,
                disabledAccess
            };
            const response = await axios.post('http://localhost:3000/api/spaces/createspace', params, {
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
}