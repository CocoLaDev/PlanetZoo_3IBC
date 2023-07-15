import { useEffect, useState } from "react";
import { Animal } from "../../../dto/animals";
import { Animals, Spaces } from "../../../services";
import ListAnimal from "./ListAnimals";
import EditAnimal from "./EditAnimal";
import axios, { CancelToken } from "axios";
import { Space } from "../../../dto";

const GestionAnimals = () => {
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [animal, setAnimal] = useState<Animal | null>(null);
    const [spaces, setSpaces] = useState<Space[]>([]);

    const fetchAnimals = async (cancelToken?: CancelToken) => {
        const data = await Animals.getAnimals(cancelToken);
        console.log(data);
        if (data) setAnimals(data);
    };
    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source();
        if (animal === null) {
            fetchAnimals(cancelTokenSource.token);
        }
        return () => cancelTokenSource.cancel();
    }, [animal]);

    useEffect(() => {
        const fetchSpaces = async () => {
            const data = await Spaces.getAllSpaces(cancelTokenSource.token);
            if (data) setSpaces(data);
        };
        const cancelTokenSource = axios.CancelToken.source();
        fetchSpaces();
        return () => cancelTokenSource.cancel();
    }, []);

    return (
        <div className="w-full m-16 h-[71vh] bg-white rounded-xl">
            {animal === null ?
                <ListAnimal animals={animals} setAnimal={setAnimal} fetchAnimals={fetchAnimals} spaces={spaces} />
                :
                <EditAnimal animal={animal} setAnimal={setAnimal} spaces={spaces} />
            }
        </div>
    );
}

export default GestionAnimals;