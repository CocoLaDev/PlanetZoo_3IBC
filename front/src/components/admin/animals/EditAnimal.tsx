import { Space } from "../../../dto";
import { Animal } from "../../../dto/animals";
import { Animals } from "../../../services";

interface AnimalProps {
    animal: Animal;
    setAnimal: React.Dispatch<React.SetStateAction<Animal | null>>;
    spaces: Space[];
}

const EditAnimal = ({ animal, setAnimal, spaces }: AnimalProps) => {

    const deleteAnimal = async () => {
        const data = await Animals.deleteAnimal(animal._id);
        if (data)
            setAnimal(null);
    };

    const updateAnimal = async (newAnimal : Animal) => {
        const data = await Animals.updateAnimal(newAnimal);
        if (data)
            setAnimal(null);
    };

    return (
        <div className="m-8 h-[calc(100%-64px)]">
            <div className="flex justify-between pb-2">
                <h1 className="text-2xl font-bold">Edit Animal</h1>
                <button onClick={() => setAnimal(null)} className="flex gap-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 8l-4 4 4 4M16 12H9" /></svg>
                    Back
                </button>
            </div>
            <div className="flex justify-center pt-12">
                <form className="space-y-3 w-1/2"
                    onSubmit={async() => {
                        const newAnimal : Animal = {
                        _id: animal._id,
                        name : (document.getElementById("name") as HTMLInputElement).value || animal.name,
                        description : (document.getElementById("description") as HTMLInputElement).value || animal.description,
                        species : (document.getElementById("species") as HTMLInputElement).value || animal.species,
                        age : parseInt((document.getElementById("age") as HTMLInputElement).value) || animal.age,
                        healthStatus : (document.getElementById("healthStatus") as HTMLInputElement).value || animal.healthStatus,
                        spaceId : (document.getElementById("spaceId") as HTMLSelectElement).value || animal.spaceId,
                        treatments: []
                        };
                        await updateAnimal(newAnimal);
                    }}
                >

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                            <label htmlFor="name" className="text-sm text-gray-600">Name</label>
                            <input
                                className="w-full rounded-lg border-gray-200 border p-2 text-sm placeholder:text-black"
                                placeholder={animal.name}
                                type="text"
                                id="name"
                            />
                        </div>
                        <div>
                            <label htmlFor="image" className="text-sm text-gray-600">Species</label>
                            <input
                                className="w-full rounded-lg border-gray-200 border p-2 text-sm placeholder:text-black"
                                placeholder={animal.species}
                                type="text"
                                id="species"
                            />
                        </div>
                        <div>
                            <label htmlFor="type" className="text-sm text-gray-600">Age</label>
                            <input
                                className="w-full rounded-lg border-gray-200 border p-2 text-sm placeholder:text-black"
                                placeholder={animal.age.toString()}
                                type="text"
                                id="age"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                            <label htmlFor="openHour" className="text-sm text-gray-600">Health Status</label>
                            <input
                                className="w-full rounded-lg border-gray-200 border p-2 text-sm placeholder:text-black"
                                placeholder={animal.healthStatus}
                                type="text"
                                id="healthStatus"
                            />
                        </div>
                        <div>
                            <label htmlFor="duration" className="text-sm text-gray-600">Space</label>
                            <select className="w-full rounded-lg border-gray-200 border p-2 text-sm placeholder:text-black" id="spaceId" defaultValue={animal.spaceId}>
                                {spaces.map((space) => (
                                    <option value={space._id}>{space.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>


                    <div>
                        <label htmlFor="description" className="text-sm text-gray-600">Description</label>
                        <textarea
                            className="w-full rounded-lg border-gray-200 border p-2 text-sm placeholder:text-black"
                            placeholder={animal.description}
                            rows={2}
                            id="description"
                        ></textarea>
                    </div>

                    <div className="w-full flex justify-center gap-4">
                        <button type="submit" className="inline-block w-full rounded-lg bg-teal-500 px-5 py-3 font-medium text-white sm:w-auto">
                            Edit Animal
                        </button>
                        <button type="button" onClick={deleteAnimal} className="inline-block w-full rounded-lg bg-rose-500 px-5 py-3 font-medium text-white sm:w-auto">
                            Delete Animal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditAnimal;