import { useEffect, useState } from "react";
import { Space } from "../../../dto/spaces";
import { Spaces } from "../../../services";
import ListSpace from "./ListSpace";
import EditSpace from "./EditSpace";
import axios from "axios";

const GestionSpaces = () => {
    const [spaces, setSpaces] = useState<Space[]>([]);
    const [space, setSpace] = useState<Space | null>(null);

    useEffect(() => {
        const fetchSpaces = async () => {
            const data = await Spaces.getAllSpaces(cancelTokenSource.token);
            if (data) setSpaces(data);
        };
        const cancelTokenSource = axios.CancelToken.source();
        if (space === null) {
            fetchSpaces();
        }
        return () => cancelTokenSource.cancel();
    }, [space]);

    return (
        <div className="w-full m-16 h-[71vh] bg-white rounded-xl">
            {space === null ?
                <ListSpace spaces={spaces} setSpace={setSpace} />
                :
                <EditSpace space={space} setSpace={setSpace} />
            }
        </div>
    );
}

export default GestionSpaces;