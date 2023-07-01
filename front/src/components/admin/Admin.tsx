import React, { useState } from "react";
import { Spaces } from "../../services";

const Admin = () => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [capacity, setCapacity] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [openingHours, setOpeningHours] = useState<string>("");
    const [disabledAccess, setDisabledAccess] = useState<boolean>(false);

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     const data = await Spaces.createSpace(
    //         name,
    //         description,
    //         image,
    //         type,
    //         capacity,
    //         duration,
    //         openingHours,
    //         disabledAccess
    //     );
    //     console.log(data);

    // };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = await Spaces.getAllSpaces();
        console.log(data);
    }


    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <section className="relative flex flex-wrap lg:h-screen lg:items-center">
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
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
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

                    <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2 ">
                        <img
                            alt="Welcome"
                            src="https://preview.redd.it/g9dfi8f3vke41.jpg?auto=webp&s=8c1ecb838858e46aaa2cf4c8f97f4d2201509e15"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Admin;
