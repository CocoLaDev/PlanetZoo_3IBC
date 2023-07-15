import { Space } from "../../../dto/spaces";
import { Spaces } from "../../../services";
import Enclos from "../../visit/enclos";

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
        <div className="m-8 h-[calc(100%-64px)]">
            <div className="flex justify-between pb-2">
                <h1 className="text-2xl font-bold">Edit Space</h1>
                <button onClick={() => setSpace(null)} className="flex gap-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 8l-4 4 4 4M16 12H9" /></svg>
                    Back
                </button>
            </div>
            <div className="flex gap-4">
                <div className="w-1/2 rounded-bl-3xl rounded-tr-3xl overflow-hidden">
                    {/* <img src={"data:image/jpeg;base64,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"} alt={space.name} className="w-full h-full object-cover" />
                     */}
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
        </div>
    );
};

export default EditSpace;