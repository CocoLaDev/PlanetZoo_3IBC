import React, { useEffect, useState } from "react";
import { Animals } from "../../services/animals";
import { Animal } from "../../dto/animals/animals";
import { Link } from "react-router-dom";

// export interface Animal {
//     _id: string;
//     name: string;
//     species: string;
//     age: number;
//     description: string;
//     healthStatus: string;
//     treatments: string[];
//     spaceId: string;
// }

const AnimalsComponent = () => {

    const [animals, setAnimals] = useState<Animal[]>([]);


    useEffect(() => {
        Animals.getAnimals().then((animals) => {
            if (!animals) return console.log("No animals");
            setAnimals(animals);
        });
    }, []);

    async function createAnimal() {

        try {
            const animal = await Animals.createAnimal(
                "name",
                "species",
                1,
                "description",
                "healthStatus",
                ["64adc30899e9b9000ae165f0"],
                "64a1933eff4c367aea4e3ff1"
            );
            console.log(animal);
        } catch (error) {
            console.log(error);
        }
    }

    async function updateAnimal() {
        try {
            const animal = await Animals.updateAnimal(
                "64adc35349e324d59aca9863",
                "name2",
                "species2",
                2,
                "description2",
                "healthStatus2",
                ["64adc43399e9b9000ae165f5", "64adc46699e9b9000ae165f6"],
                "64a1933eff4c367aea4e3ff1"
            );
            console.log(animal);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteAnimal() {
        try {
            const animal = await Animals.deleteAnimal("64adbed429c3947ab2b28138");
            console.log(animal);
        } catch (error) {
            console.log(error);
        }
    }

    async function getAnimalById(id: string) {
        try {
            const animal = await Animals.getAnimalById(id);
            console.log(animal);
        } catch (error) {
            console.log(error);
        }
        setAnimals(animals);
    }


    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Animaux</h1>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => getAnimalById("64adc35349e324d59aca9863")}
            >
                Create animal
            </button>

            <div className="flex flex-wrap justify-center">
                {animals.map((animal) => (
                    <div className="flex flex-col items-center justify-center m-4">
                        <p className="text-xl">{animal._id}</p>

                        <Link to={`/Animal/${animal._id}`}>
                            <p className="text-xl ">{animal.name}</p>
                            <p className="text-xl">{animal.species}</p>
                            <p className="text-xl">{animal.age}</p>
                            <p className="text-xl">{animal.healthStatus}</p>
                            <p className="text-xl">{animal.treatments}</p>
                            <p className="text-xl">{animal.spaceId}</p>
                        </Link>

                    </div>

                ))}
            </div>
        </div>
    );
}

export default AnimalsComponent;


