import { useEffect, useState } from "react";
import { Animal } from "../../../dto/animals";
import { Animals, Spaces } from "../../../services";
import ListAnimal from "./ListAnimals";
import EditAnimal from "./EditAnimal";
import axios, { CancelToken } from "axios";
import { Space, UserRole } from "../../../dto";
import Treatments from "./Treatments";
import { useUserContext } from "../../../utils/user.context";

const GestionAnimals = () => {
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [animal, setAnimal] = useState<Animal | null>(null);
    const [spaces, setSpaces] = useState<Space[]>([]);

    const { data } = useUserContext().user;

    const fetchAnimals = async (cancelToken?: CancelToken) => {
        const response = await Animals.getAnimals(cancelToken);
        console.log(response);
        if (response) setAnimals(response);
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
            const response = await Spaces.getAllSpaces(cancelTokenSource.token);
            if (response) setSpaces(response);
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
                <div>
                    <EditAnimal animal={animal} setAnimal={setAnimal} spaces={spaces} />
                    {data?.role === UserRole.VETERINARIAN &&
                        <Treatments animal={animal} />
                    }
                </div>
            }
        </div>
    );
}

export default GestionAnimals;