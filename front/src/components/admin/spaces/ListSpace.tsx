import React, { useEffect } from "react";
import { Space } from "../../../dto/spaces";
import { Spaces } from "../../../services";

interface SpacesProps {
    spaces: Space[];
    setSpace: React.Dispatch<React.SetStateAction<Space | null>>;
}

const ListSpace = ({ spaces, setSpace }: SpacesProps) => {

    const [spaceUpdated, setSpaceUpdated] = React.useState<boolean>(false);

    useEffect(() => {
        if (spaceUpdated) {
            const x = setTimeout(() => {
                setSpaceUpdated(false);
            }, 2000);
            return () => clearTimeout(x);
        }
    }, [spaceUpdated]);

    async function createSpace() {
        const name = (document.getElementById("name") as HTMLInputElement).value;
        const description = (document.getElementById("description") as HTMLInputElement).value;;
        const images = (document.getElementById("images") as HTMLInputElement).value;
        const type = (document.getElementById("type") as HTMLInputElement).value;
        const capacity = (document.getElementById("capacity") as HTMLInputElement).value;
        const openingHours = (document.getElementById("openingHours") as HTMLInputElement).value;
        const duration = (document.getElementById("duration") as HTMLInputElement).value;
        const disabledAccess = (document.getElementById("disabledAccess") as HTMLInputElement).checked;


        const response = await Spaces.createSpace(name, description, images, type, parseInt(capacity), parseInt(duration), openingHours, disabledAccess);
        if (response)
            setSpaceUpdated(true);
    }

    return (
        <div className="m-8 h-[calc(100%-64px)]">
            <h1 className="text-2xl font-bold">Spaces</h1>
            <div className="overflow-x-auto h-[calc(100%-32px)]">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Name
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Description
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                3D Model
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Type
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Capacity
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Open at
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Duration
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Disabled Access
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Maintenance
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Edit
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        <tr className="odd:bg-gray-50">
                            <td className="text-center px-4 py-2 text-gray-900">
                                <input type="text" id="name" className="w-full rounded-xl border p-2 mr-2 text-sm focus:outline-none focus:border-teal-500 transition" />
                            </td>
                            <td className="text-center px-4 py-2 text-gray-700">
                                <input type="text" id="description" className="w-full rounded-xl border p-2 mr-2 text-sm focus:outline-none focus:border-teal-500 transition" />
                            </td>
                            <td className="text-center px-4 py-2 text-gray-700">
                                <input type="text" id="images" className="w-full rounded-xl border p-2 mr-2 text-sm focus:outline-none focus:border-teal-500 transition" />
                            </td>
                            <td className="text-center px-4 py-2 text-gray-700">
                                <input type="text" id="type" className="w-full rounded-xl border p-2 mr-2 text-sm focus:outline-none focus:border-teal-500 transition" />
                            </td>
                            <td className="text-center px-4 py-2 text-gray-700">
                                <input type="number" id="capacity" className="w-full rounded-xl border p-2 mr-2 text-sm focus:outline-none focus:border-teal-500 transition" />
                            </td>
                            <td className="text-center px-4 py-2 text-gray-700">
                                <input type="time" id="openingHours" className="w-full rounded-xl border p-2 mr-2 text-sm focus:outline-none focus:border-teal-500 transition" />
                            </td>
                            <td className="text-center px-4 py-2 text-gray-700">
                                <input type="number" id="duration" className="w-full rounded-xl border p-2 mr-2 text-sm focus:outline-none focus:border-teal-500 transition" />
                            </td>
                            <td className="text-center px-4 py-2 text-gray-700">
                                <input type="checkbox" id="disabledAccess" className="w-full rounded-xl border p-2 mr-2 text-sm focus:outline-none focus:border-teal-500 transition" />
                            </td>
                            <td></td>
                            <td className="text-center px-4 py-2 text-teal-700">
                                <button onClick={createSpace}>
                                    {spaceUpdated ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" /><path d="M14 3v5h5M12 18v-6M9 15h6" /></svg>
                                    }
                                </button>
                            </td>
                        </tr>
                        {spaces.map((space) => (
                            <tr className="odd:bg-gray-50" key={space._id}>
                                <td className="text-center px-4 py-2 text-gray-900">{space.name}</td>
                                <td className="text-center px-4 py-2 text-gray-700">{space.description}</td>
                                <td className="text-center px-4 py-2 text-gray-700">{space.images}</td>
                                <td className="text-center px-4 py-2 text-gray-700">{space.type}</td>
                                <td className="text-center px-4 py-2 text-gray-700">{space.capacity}</td>
                                <td className="text-center px-4 py-2 text-gray-700">{space.openingHours}</td>
                                <td className="text-center px-4 py-2 text-gray-700">{space.duration}h</td>
                                <td className="text-center px-4 py-2 text-gray-700">{space.disabledAccess ? "Yes" : "No"}</td>
                                <td className="text-center px-4 py-2 text-gray-700">
                                    <p className="flex items-center justify-center gap-1">
                                        {space.maintenance ? "Yes" : "No"}
                                    </p>
                                </td>
                                <td className="text-center px-4 py-2 text-teal-700">
                                    <button onClick={() => setSpace(space)}>
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

export default ListSpace;