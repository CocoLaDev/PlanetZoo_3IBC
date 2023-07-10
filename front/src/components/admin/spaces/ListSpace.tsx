import React from "react";
import { Space } from "../../../dto/spaces";

interface SpacesProps {
    spaces: Space[];
    setSpace: React.Dispatch<React.SetStateAction<Space | null>>;
}

const ListSpace = ({ spaces, setSpace }: SpacesProps) => {

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
                                Opening Hours
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Closed Hours
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Duration
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Edit
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {spaces.map((space) => (
                            <tr className="odd:bg-gray-50">
                                <td className="text-center px-4 py-2 text-gray-900">{space.name}</td>
                                <td className="text-center px-4 py-2 text-gray-700">{space.description}</td>
                                <td className="text-center px-4 py-2 text-gray-700">{space.images}</td>
                                <td className="text-center px-4 py-2 text-gray-700">{space.type}</td>
                                <td className="text-center px-4 py-2 text-gray-700">{space.capacity}</td>
                                <td className="text-center px-4 py-2 text-gray-700">{space.openingHours}</td>
                                <td className="text-center px-4 py-2 text-gray-700">{space.duration}h</td>
                                <td className="text-center px-4 py-2 text-gray-700">{space.disabledAccess ? "Yes" : "No"}</td>
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