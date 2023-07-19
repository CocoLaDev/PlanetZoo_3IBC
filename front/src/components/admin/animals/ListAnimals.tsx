import React, { useEffect, useState } from "react";
import { Animal } from "../../../dto/animals";
import { Animals, Spaces } from "../../../services";
import { Space } from "../../../dto";
import axios from "axios";

interface AnimalsProps {
    animals: Animal[];
    setAnimal: React.Dispatch<React.SetStateAction<Animal | null>>;
    fetchAnimals: () => void;
    spaces: Space[];
}

const ListAnimal = ({ animals, setAnimal, fetchAnimals, spaces }: AnimalsProps) => {

    const [spaceId, setSpaceId] = useState<string>("");

    useEffect(() => {
        if(spaces.length > 0) {
            setSpaceId(spaces[0]._id);
        }
    }, [spaces]);


    return (
        <div className="m-8 h-[calc(100%-64px)]">
            <h1 className="text-2xl font-bold">Animals</h1>
            <div className="flex justify-end w-full h-10 mb-2">
                <select className="w-1/4 rounded-xl border p-2 mr-2 text-sm focus:outline-none focus:border-teal-500 transition" onChange={(e) => { setSpaceId(e.target.value); console.log(e.target.value) }}>
                    {spaces.map((space) => (
                        <option key={space._id} value={space._id}>{space.name}</option>
                    ))}
                </select>
            </div>
            <div className="overflow-x-auto h-[calc(100%-32px)]">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whiteanimal-nowrap px-4 py-2 font-medium text-gray-900">
                                Name
                            </th>
                            <th className="whiteanimal-nowrap px-4 py-2 font-medium text-gray-900">
                                Description
                            </th>
                            <th className="whiteanimal-nowrap px-4 py-2 font-medium text-gray-900">
                                Species
                            </th>
                            <th className="whiteanimal-nowrap px-4 py-2 font-medium text-gray-900">
                                Age
                            </th>
                            <th className="whiteanimal-nowrap px-4 py-2 font-medium text-gray-900">
                                Health Status
                            </th>
                            <th className="whiteanimal-nowrap px-4 py-2 font-medium text-gray-900">
                                Edit
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        <td className="text-center px-4 py-2 text-gray-900">
                            <input type="text" id="name" className="w-full rounded-xl border p-2 mr-2 text-sm focus:outline-none focus:border-teal-500 transition" placeholder="Name" />
                        </td>
                        <td className="text-center px-4 py-2 text-gray-900">
                            <input type="text" id="description" className="w-full rounded-xl border p-2 mr-2 text-sm focus:outline-none focus:border-teal-500 transition" placeholder="Description" />
                        </td>
                        <td className="text-center px-4 py-2 text-gray-900">
                            <input type="text" id="species" className="w-full rounded-xl border p-2 mr-2 text-sm focus:outline-none focus:border-teal-500 transition" placeholder="Species" />
                        </td>
                        <td className="text-center px-4 py-2 text-gray-900">
                            <input type="text" id="age" className="w-full rounded-xl border p-2 mr-2 text-sm focus:outline-none focus:border-teal-500 transition" placeholder="Age" />
                        </td>
                        <td className="text-center px-4 py-2 text-gray-900">
                            <input type="text" id="healthStatus" className="w-full rounded-xl border p-2 mr-2 text-sm focus:outline-none focus:border-teal-500 transition" placeholder="Health Status" />
                        </td>
                        <td className="text-center px-4 py-2 text-teal-700">
                            <button onClick={async () => {
                                const name = (document.getElementById("name") as HTMLInputElement).value;
                                const description = (document.getElementById("description") as HTMLInputElement).value;
                                const species = (document.getElementById("species") as HTMLInputElement).value;
                                const age = (document.getElementById("age") as HTMLInputElement).value;
                                const healthStatus = (document.getElementById("healthStatus") as HTMLInputElement).value;
                                await Animals.createAnimal(name, species, parseInt(age), description, healthStatus, [], "64aaed3ed20a0d06a1ba4415");
                                fetchAnimals();
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" /><path d="M14 3v5h5M12 18v-6M9 15h6" /></svg>
                            </button>
                        </td>
                        {animals.filter((animal) => animal.spaceId === spaceId).map((animal) => (
                            <tr className="odd:bg-gray-50" key={animal._id}>
                                <td className="text-center px-4 py-2 text-gray-900">{animal.name}</td>
                                <td className="text-center px-4 py-2 text-gray-700">{animal.description}</td>
                                <td className="text-center px-4 py-2 text-gray-700">{animal.species}</td>
                                <td className="text-center px-4 py-2 text-gray-700">{animal.age}</td>
                                <td className="text-center px-4 py-2 text-gray-700">{animal.healthStatus}</td>
                                <td className="text-center px-4 py-2 text-teal-700">
                                    <button onClick={() => setAnimal(animal)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListAnimal;