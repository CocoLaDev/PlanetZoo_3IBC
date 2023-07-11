import { useEffect, useState } from "react";
import { Space } from "../../../dto/spaces";
import { Spaces } from "../../../services";
import ListSpace from "./ListSpace";
import EditSpace from "./EditSpace";

const GestionSpaces = () => {
    const [spaces, setSpaces] = useState<Space[]>([]);
    const [space, setSpace] = useState<Space | null>(null);

    useEffect(() => {
        const fetchSpaces = async () => {
            const data = await Spaces.getAllSpaces();
            if (data) setSpaces(data);
        };
        if (space === null) fetchSpaces();
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