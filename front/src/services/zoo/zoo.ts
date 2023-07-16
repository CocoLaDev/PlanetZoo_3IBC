import axios, { CancelToken } from "axios";

export class Zoo {
    static async zooCanOpen(token?: CancelToken): Promise<boolean | null> {
        try {
            const userToken = localStorage.getItem("token");
            if (userToken === null) throw new Error("No token found");
            const response = await axios.get('http://localhost:3000/api/zoo/canZooOpen', {
                cancelToken: token,
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            if (response.data) {
                return response.data.canOpen;
            }
        } catch (err: unknown) {
            return null;
        }
        return null;
    }
}