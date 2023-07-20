import { useEffect, useState } from "react";
import { ServiceBook, Space } from "../../../dto";
import { ServiceBooks, Spaces } from "../../../services";

interface ServiceBookProps {
    space: Space;
}

const Book = ({ space }: ServiceBookProps) => {

    const [serviceBook, setServiceBook] = useState<ServiceBook[]>([]);

    async function fetchServiceBook() {
        const response = await ServiceBooks.getServiceBookBySpaceId(space._id);
        if (response) {
            setServiceBook(response);
        }
    }
    useEffect(() => {
        fetchServiceBook();
    }, [])

    return (
        <div className="mt-4 mb-8">
            <h1 className="text-xl font-bold">Maintenances</h1>
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        <th className="whitetreatment-nowrap px-4 py-2 font-medium text-gray-900">
                            Id
                        </th>
                        <th className="whitetreatment-nowrap px-4 py-2 font-medium text-gray-900">
                            Description
                        </th>
                        <th className="whitetreatment-nowrap px-4 py-2 font-medium text-gray-900">
                            Start
                        </th>
                        <th className="whitetreatment-nowrap px-4 py-2 font-medium text-gray-900">
                            End
                        </th>
                        <th className="whitetreatment-nowrap px-4 py-2 font-medium text-gray-900">
                            Create
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    <td className="text-center px-4 py-2 text-gray-900">
                        #
                    </td>
                    <td className="text-center px-4 py-2 text-gray-900">
                        <input type="text" id="descriptionBook" className="w-full rounded-xl border p-2 mr-2 text-sm focus:outline-none focus:border-teal-500 transition" placeholder="Description" />
                    </td>
                    <td className="text-center px-4 py-2 text-gray-900">
                        {new Date().toISOString().split('T')[0]}
                    </td>
                    <td></td>
                    <td className="text-center px-4 py-2 text-teal-700">
                        <button onClick={async () => {
                            const description = (document.getElementById("descriptionBook") as HTMLInputElement).value;

                            await ServiceBooks.createServiceBook({
                                description: description,
                                maintenanceStart: new Date().toString(),
                                spaceId: space._id
                            });
                            await Spaces.setMaintenanceSpace(space._id);
                            fetchServiceBook();
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" /><path d="M14 3v5h5M12 18v-6M9 15h6" /></svg>
                        </button>
                    </td>
                    {serviceBook.map((service) => (
                        <tr className="odd:bg-gray-50" key={service._id}>
                            <td className="text-center px-4 py-2 text-gray-900">{service._id}</td>
                            <td className="text-center px-4 py-2 text-gray-700">{service.description}</td>
                            <td className="text-center px-4 py-2 text-gray-700">{service.maintenanceStart}</td>
                            <td className="text-center px-4 py-2 text-gray-700">{
                                service.maintenanceEnd ? service.maintenanceEnd :
                                    <button onClick={async () => {
                                        await ServiceBooks.updateServiceBook({
                                            _id: service._id,
                                            description: service.description,
                                            maintenanceStart: service.maintenanceStart,
                                            maintenanceEnd: new Date().toString(),
                                            spaceId: service.spaceId
                                        });
                                        await Spaces.setMaintenanceSpaceOff(space._id);
                                        fetchServiceBook();
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                    </button>
                            }</td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Book;