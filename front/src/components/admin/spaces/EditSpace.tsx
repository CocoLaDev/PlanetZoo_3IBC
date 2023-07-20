import { Space } from "../../../dto/spaces";
import { Spaces } from "../../../services";
import Enclos from "../../visit/enclos";
import Book from "./book";

interface SpaceProps {
    space: Space;
    setSpace: React.Dispatch<React.SetStateAction<Space | null>>;
}

const EditSpace = ({ space, setSpace }: SpaceProps) => {

    const deleteSpace = async () => {
        const data = await Spaces.deleteSpace(space._id);
        if (data)
            setSpace(null);
    };

    const updateSpace = async (newSpace : Space) => {
        const data = await Spaces.updateSpace(newSpace);
        if (data)
            setSpace(null);
    };

    return (
        <div className="m-8 h-[calc(100%-32px)] overflow-y-scroll">
            <div className="flex justify-between pb-2">
                <h1 className="text-2xl font-bold">Edit Space</h1>
                <button onClick={() => setSpace(null)} className="flex gap-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 8l-4 4 4 4M16 12H9" /></svg>
                    Back
                </button>
            </div>
            <div className="flex gap-4 h-[84%]">
                <div className="w-1/2 rounded-bl-3xl rounded-tr-3xl overflow-hidden">
                    <Enclos objectSource={"/"+space.images} />
                </div>
                <form className="space-y-3 w-1/2"
                    onSubmit={async() => {
                        const newSpace : Space = {
                        _id: space._id,
                        name : (document.getElementById("name") as HTMLInputElement).value || space.name,
                        images : (document.getElementById("image") as HTMLInputElement).value || space.images,
                        type : (document.getElementById("type") as HTMLInputElement).value || space.type,
                        capacity : parseInt((document.getElementById("capacity") as HTMLInputElement).value) || space.capacity,
                        openingHours : (document.getElementById("openHour") as HTMLInputElement).value || space.openingHours,
                        duration : parseInt((document.getElementById("duration") as HTMLInputElement).value) || space.duration,
                        disabledAccess : (document.getElementById("option1") as HTMLInputElement).checked || space.disabledAccess,
                        description : (document.getElementById("description") as HTMLInputElement).value || space.description,
                        };
                        await updateSpace(newSpace);
                    }}
                >

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                            <label htmlFor="name" className="text-sm text-gray-600">Name</label>
                            <input
                                className="w-full rounded-lg border-gray-200 border p-2 text-sm placeholder:text-black"
                                placeholder={space.name}
                                type="text"
                                id="name"
                            />
                        </div>
                        <div>
                            <label htmlFor="image" className="text-sm text-gray-600">3D model</label>
                            <input
                                className="w-full rounded-lg border-gray-200 border p-2 text-sm placeholder:text-black"
                                placeholder={space.images}
                                type="text"
                                id="image"
                            />
                        </div>
                        <div>
                            <label htmlFor="type" className="text-sm text-gray-600">Type</label>
                            <input
                                className="w-full rounded-lg border-gray-200 border p-2 text-sm placeholder:text-black"
                                placeholder={space.type}
                                type="text"
                                id="type"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                            <label htmlFor="openHour" className="text-sm text-gray-600">Open hours</label>
                            <input
                                className="w-full rounded-lg border-gray-200 border p-2 text-sm placeholder:text-black"
                                placeholder={space.openingHours}
                                type="text"
                                id="openHour"
                            />
                        </div>
                        <div>
                            <label htmlFor="duration" className="text-sm text-gray-600">Duration</label>
                            <input
                                className="w-full rounded-lg border-gray-200 border p-2 text-sm placeholder:text-black"
                                placeholder={space.duration.toString()}
                                type="text"
                                id="duration"
                            />
                        </div>
                        <div>
                            <label htmlFor="capacity" className="text-sm text-gray-600">Capacity</label>
                            <input
                                className="w-full rounded-lg border-gray-200 border p-2 text-sm placeholder:text-black"
                                placeholder={space.capacity.toString()}
                                type="text"
                                id="capacity"
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 text-center sm:grid-cols-3 items-end">
                        <div>
                            <p className="text-sm text-left text-gray-600">Disabled Access :</p>
                            <input className="peer sr-only" id="option1" type="radio" tabIndex={-1} name="option" defaultChecked={space.disabledAccess} />
                            <label htmlFor="option1" className="block w-full rounded-lg border border-gray-200 p-2 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white" tabIndex={0}>
                                <span className="text-sm">Yess</span>
                            </label>
                        </div>
                        <div>
                            <input className="peer sr-only" id="option3" type="radio" tabIndex={-1} name="option" defaultChecked={space.disabledAccess === false} />
                            <label htmlFor="option3" className="block w-full rounded-lg border border-gray-200 p-2 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white" tabIndex={0}>
                                <span className="text-sm">No</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="text-sm text-gray-600">Description</label>
                        <textarea
                            className="w-full rounded-lg border-gray-200 border p-2 text-sm placeholder:text-black"
                            placeholder={space.description}
                            rows={2}
                            id="description"
                        ></textarea>
                    </div>

                    <div className="w-full flex justify-center gap-4">
                        <button type="submit" className="inline-block w-full rounded-lg bg-teal-500 px-5 py-3 font-medium text-white sm:w-auto">
                            Edit Space
                        </button>
                        <button type="button" onClick={deleteSpace} className="inline-block w-full rounded-lg bg-rose-500 px-5 py-3 font-medium text-white sm:w-auto">
                            Delete Space
                        </button>
                    </div>
                </form>
            </div>
            <Book space={space} />
        </div>
    );
};

export default EditSpace;