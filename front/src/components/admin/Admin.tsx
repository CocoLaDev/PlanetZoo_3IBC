import React, { useEffect, useState } from "react";
import { Spaces } from "../../services";
import { Space } from "../../dto/"
import { Link } from "react-router-dom";


const Admin = () => {
    // To create a space
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [images, setImages] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [capacity, setCapacity] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [openingHours, setOpeningHours] = useState<string>("");
    const [disabledAccess, setDisabledAccess] = useState<boolean>(false);

    // Store all spaces
    const [allSpaces, setAllSpaces] = useState<Space[] | null>(null);
    // User search query
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Changed to true when a new space is created
    const [newSpacesCreated, setNewSpacesCreated] = useState<boolean>(false);

    const filteredSpaces = allSpaces?.filter((space) =>
        space.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const [isModalOpen, setIsModalOpen] = useState<Space | null>(null);

    // To update a space
    const [updatedName, setUpdatedName] = useState<string>("");
    const [updatedDescription, setUpdatedDescription] = useState<string>("");
    const [updatedImages, setUpdatedImages] = useState<string>("");
    const [updatedType, setUpdatedType] = useState<string>("");
    const [updatedCapacity, setUpdatedCapacity] = useState<number>(0);
    const [updatedDuration, setUpdatedDuration] = useState<number>(0);
    const [updatedOpeningHours, setUpdatedOpeningHours] = useState<string>("");
    const [updatedDisabledAccess, setUpdatedDisabledAccess] = useState<boolean>(false);




    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = await Spaces.createSpace(
                name,
                description,
                images,
                type,
                capacity,
                duration,
                openingHours,
                disabledAccess
            );
            setNewSpacesCreated(true);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteSpace = async (id: string) => {
        try {
            const data = await Spaces.deleteSpace(id);
            console.log(data);
            setNewSpacesCreated(true);
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdateSpace = async () => {
        if (!isModalOpen) return;
        try {
            const data = await Spaces.updateSpace(
                isModalOpen
            );
            console.log(data);
            setIsModalOpen(null);
            setNewSpacesCreated(true);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSetMaintenanceSpace = async (id: string) => {
        try {
            const data = await Spaces.setMaintenanceSpace(id);
            console.log(data);
            setNewSpacesCreated(true);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSetMaintenanceSpaceOff = async (id: string) => {
        try {
            const data = await Spaces.setMaintenanceSpaceOff(id);
            console.log(data);
            setNewSpacesCreated(true);
        } catch (err) {
            console.log(err);
        }
    };





    useEffect(() => {
        // A peut etre mettre dans un useEffect ???
        const getAllSpacesAtMount = async () => {
            try {
                const data = await Spaces.getAllSpaces();
                console.log(data);
                setAllSpaces(data);
            } catch (err) {
                console.log(err);
            }
        };
        getAllSpacesAtMount();
        setNewSpacesCreated(false);
    }, [newSpacesCreated]);


    return (
        <div>
            {/* Create A Space */}
            <div className="flex flex-col min-h-screen">

                <section className="relative flex flex-wrap ">
                    <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
                        <div className="mx-auto max-w-lg text-center">
                            <h1 className="text-2xl font-bold sm:text-3xl">
                                Get started today!
                            </h1>

                            <p className="mt-4 text-gray-500">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                                libero nulla eaque error neque ipsa culpa autem, at itaque
                                nostrum!
                            </p>
                        </div>

                        <form
                            action=""
                            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label htmlFor="name" className="sr-only">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="sr-only">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="image" className="sr-only">
                                    Image
                                </label>
                                <input
                                    type="text"
                                    id="image"
                                    name="image"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter image URL"
                                    value={images}
                                    onChange={(e) => setImages(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="type" className="sr-only">
                                    Type
                                </label>
                                <input
                                    type="text"
                                    id="type"
                                    name="type"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter type"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="capacity" className="sr-only">
                                    Capacity
                                </label>
                                <input
                                    type="number"
                                    id="capacity"
                                    name="capacity"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter capacity"
                                    onChange={(e) => setCapacity(Number(e.target.value))}
                                />
                            </div>

                            <div>
                                <label htmlFor="duration" className="sr-only">
                                    Duration
                                </label>
                                <input
                                    type="number"
                                    id="duration"
                                    name="duration"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter duration (in hours)"
                                    onChange={(e) => setDuration(Number(e.target.value))}
                                />
                            </div>

                            <div>
                                <label htmlFor="openingHours" className="sr-only">
                                    Opening Hours
                                </label>
                                <input
                                    type="time"
                                    id="openingHours"
                                    name="openingHours"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter opening hours"
                                    onChange={(e) => {
                                        setOpeningHours(e.target.value);
                                    }}
                                />

                            </div>

                            <div>
                                <label htmlFor="disabledAccess" className="sr-only">
                                    Disabled Access
                                </label>
                                <input
                                    type="checkbox"
                                    id="disabledAccess"
                                    name="disabledAccess"
                                    className="rounded text-blue-500"
                                    checked={disabledAccess}
                                    onChange={(e) => setDisabledAccess(e.target.checked)}
                                />
                                <span className="ml-2 text-gray-500">Disabled Access</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white">
                                    Create Spaces
                                </button>
                            </div>
                        </form>
                    </div>



                    {/* View Filtered Spaces */}
                    <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
                        {/* Search Bar */}
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name"
                            className="p-2 border border-gray-300 rounded"
                        />

                        {searchQuery !== "" && (

                            <div className="flex flex-col min-h-screen mt-14 p-4">
                                {filteredSpaces?.length === 0 ? (
                                    <p>No results found.</p>
                                ) : (
                                    filteredSpaces?.map((space) => (
                                        <div key={space._id} className="bg-white rounded shadow p-4 mb-4">
                                            <Link to={`/Space/${space._id}`}>
                                                <h2 className="text-xl font-bold mb-2">{space.name}</h2>
                                                <img src={space.images} alt={space.name} className="w-full h-auto mb-2" />
                                                <p className="text-gray-600 mb-2">{space.description}</p>
                                                <div className="flex items-center mb-2">
                                                    <span className="font-bold mr-2">Type:</span>
                                                    <span>{space.type}</span>
                                                </div>
                                                <div className="flex items-center mb-2">
                                                    <span className="font-bold mr-2">Capacity:</span>
                                                    <span>{space.capacity}</span>
                                                </div>
                                                <div className="flex items-center mb-2">
                                                    <span className="font-bold mr-2">Duration:</span>
                                                    <span>{space.duration} hours</span>
                                                </div>
                                                <div className="flex items-center mb-2">
                                                    <span className="font-bold mr-2">Opening Hours:</span>
                                                    <span>{space.openingHours}</span>
                                                </div>
                                                <div className="flex items-center mb-2">
                                                    <span className="font-bold mr-2">Disabled Access:</span>
                                                    <span>{space.disabledAccess ? "Yes" : "No"}</span>
                                                </div>
                                            </Link>

                                            <button className="font-bold text-red-500 hover:text-red-600 cursor-pointer" onClick={() => deleteSpace(space._id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 hover:scale-110  transition duration-200 ease-in-out">
                                                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                                </svg>
                                            </button>

                                            <button className="font-bold text-blue-500 hover:text-blue-600 cursor-pointer" onClick={() => setIsModalOpen(space)} >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 hover:scale-110  transition duration-200 ease-in-out"> <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" /> <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" /> </svg>
                                            </button>

                                            <button className="font-bold text-gray-500 hover:text-gray-600 cursor-pointer" onClick={() => handleSetMaintenanceSpace(space._id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                    <path fill-rule="evenodd" d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.25 6a.75.75 0 00-1.5 0v4.94l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V9.75z" clip-rule="evenodd" />
                                                </svg>
                                            </button>

                                            <button className="font-bold text-green-500 hover:text-green-600 cursor-pointer" onClick={() => handleSetMaintenanceSpaceOff(space._id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                    <path fill-rule="evenodd" d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.25 6a.75.75 0 00-1.5 0v4.94l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V9.75z" clip-rule="evenodd" />
                                                </svg>
                                            </button>

                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                    </div>
                    {isModalOpen && (
                        <div className="fixed inset-0 flex items-center  justify-center z-50 bg-black bg-opacity-50">
                            <div className="bg-white p-4 w-1/3 rounded shadow">
                                <h2 className="text-xl font-bold mb-4">Update Space</h2>

                                <div>
                                    <label htmlFor="name" className="sr-only">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        value={isModalOpen.name}
                                        onChange={(e) => setIsModalOpen({ ...isModalOpen, name: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="description" className="sr-only">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        id="description"
                                        name="description"
                                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        value={isModalOpen.description}
                                        onChange={(e) => setIsModalOpen({ ...isModalOpen, description: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="image" className="sr-only">
                                        Image
                                    </label>
                                    <input
                                        type="text"
                                        id="image"
                                        name="image"
                                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        value={isModalOpen.images}
                                        onChange={(e) => setIsModalOpen({ ...isModalOpen, images: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="type" className="sr-only">
                                        Type
                                    </label>
                                    <input
                                        type="text"
                                        id="type"
                                        name="type"
                                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        value={isModalOpen.type}
                                        onChange={(e) => setIsModalOpen({ ...isModalOpen, type: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="capacity" className="sr-only">
                                        Capacity
                                    </label>
                                    <input
                                        type="number"
                                        id="capacity"
                                        name="capacity"
                                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        value={(isModalOpen.capacity).toString()}
                                        onChange={(e) => setIsModalOpen({ ...isModalOpen, capacity: parseInt(e.target.value) })}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="duration" className="sr-only">
                                        Duration
                                    </label>
                                    <input
                                        type="number"
                                        id="duration"
                                        name="duration"
                                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        value={(isModalOpen.duration).toString()}
                                        onChange={(e) => setIsModalOpen({ ...isModalOpen, duration: parseInt(e.target.value) })}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="openingHours" className="sr-only">
                                        Opening Hours
                                    </label>
                                    <input
                                        type="time"
                                        id="openingHours"
                                        name="openingHours"
                                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        value={isModalOpen.openingHours}
                                        onChange={(e) => setIsModalOpen({ ...isModalOpen, openingHours: e.target.value })}
                                    />

                                </div>

                                <div className="p-2">
                                    <label htmlFor="disabledAccess" className="sr-only">
                                        Disabled Access
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="disabledAccess"
                                        name="disabledAccess"
                                        className="rounded text-blue-500"
                                        checked={isModalOpen.disabledAccess}
                                        onChange={(e) => setIsModalOpen({ ...isModalOpen, disabledAccess: e.target.checked })}
                                    />
                                    <span className="ml-2 text-gray-500">Disabled Access</span>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                    <button
                                        className="inline-block rounded-lg bg-green-500 px-5 py-3 text-sm font-medium text-white"
                                        onClick={() => handleUpdateSpace()}  >
                                        Update Spaces
                                    </button>

                                    <button
                                        onClick={() => setIsModalOpen(null)}
                                        className="inline-block rounded-lg bg-red-500 px-5 py-3 text-sm font-medium text-white "
                                    >
                                        Close
                                    </button>
                                </div>

                            </div>

                        </div>
                    )
                    }
                </section >
            </div >
        </div >
    );
};

export default Admin;
