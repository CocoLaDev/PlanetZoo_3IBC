import { useEffect, useState } from "react";
import { Animal, Treatmen, User, UserRole } from "../../../dto";
import { Treatmens, Users } from "../../../services";

interface TreatmentsProps {
    animal: Animal;
}

const Treatments = ({ animal }: TreatmentsProps) => {
    const [treatments, setTreatments] = useState<Treatmen[]>([]);
    const [veterinarian, setVeterinarian] = useState<User[]>([]);

    const fetchTreatments = async () => {
        const response = await Treatmens.getAllTreatmens();
        if (response)
            setTreatments(response);
    };
    useEffect(() => {
        async function fetchVeterinarians() {
            const response = await Users.getAll();
            if (response)
                setVeterinarian(response.filter((user) => user.role === UserRole.VETERINARIAN));
        }
        fetchVeterinarians();
        fetchTreatments();
    }, []);

    return (
        <div className="py-6">
            <h1 className="text-xl font-bold">Treatments</h1>
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
                            Date
                        </th>
                        <th className="whitetreatment-nowrap px-4 py-2 font-medium text-gray-900">
                            Veterinarian
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    <td className="text-center px-4 py-2 text-gray-900">
                        #
                    </td>
                    <td className="text-center px-4 py-2 text-gray-900">
                        <input type="text" id="descriptionTreatment" className="w-full rounded-xl border p-2 mr-2 text-sm focus:outline-none focus:border-teal-500 transition" placeholder="Description" />
                    </td>
                    <td className="text-center px-4 py-2 text-gray-900">
                        {new Date().toISOString().split('T')[0]}
                    </td>
                    <td className="text-center px-4 py-2 text-gray-900">
                        <select id="veterinarian" defaultValue={veterinarian[0]?._id} className="w-full rounded-xl border p-2 mr-2 text-sm focus:outline-none focus:border-teal-500 transition">
                            {veterinarian.map((user) => (
                                <option key={user._id} value={user._id}>{user.username}</option>
                            ))}
                        </select>
                    </td>
                    <td className="text-center px-4 py-2 text-teal-700">
                        <button onClick={async () => {
                            const description = (document.getElementById("descriptionTreatment") as HTMLInputElement).value;
                            const veterinarian = (document.getElementById("veterinarian") as HTMLSelectElement).value;
                            await Treatmens.createTreatment(
                                animal._id,
                                veterinarian,
                                description
                            );
                            fetchTreatments();
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" /><path d="M14 3v5h5M12 18v-6M9 15h6" /></svg>
                        </button>
                    </td>
                    {treatments.filter((treatment) => treatment.animalId === animal._id).map((treatment) => (
                        <tr className="odd:bg-gray-50" key={treatment._id}>
                            <td className="text-center px-4 py-2 text-gray-900">{treatment._id}</td>
                            <td className="text-center px-4 py-2 text-gray-700">{treatment.treatmentDescription}</td>
                            <td className="text-center px-4 py-2 text-gray-700">{treatment.date.split('T')[0]}</td>
                            <td className="text-center px-4 py-2 text-gray-700">{veterinarian.find((user) => user._id === treatment.veterinarianId)?.username}</td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Treatments;