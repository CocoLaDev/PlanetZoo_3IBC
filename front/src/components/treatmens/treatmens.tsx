import { useEffect, useState } from "react"
import { Treatmen } from "../../dto"
import { Treatmens } from "../../services/"


export const TreatmensComponent = () => {
    const [treatmens, setTreatmens] = useState<Treatmen[] | null>(null)

    useEffect(() => {
        const fetchTreatmens = async () => {
            try {
                const allTreatmens = await Treatmens.getAllTreatmens()
                setTreatmens(allTreatmens)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchTreatmens()

    }, [])


    async function deleteTreatmen(id: string) {
        try {
            await Treatmens.deleteTreatmen(id)
            const allTreatmens = await Treatmens.getAllTreatmens()
            setTreatmens(allTreatmens)
        }
        catch (error) {
            console.log(error)
        }
    }

    async function createTreatmen() {
        try {
            const newTreatmen = await Treatmens.createTreatment(
                "64b2b6ffaa3bc11ab387d3e9",
                "649db96b5f877c7ecc3fac4c",
                "test"
            )
            const allTreatmens = await Treatmens.getAllTreatmens()
            setTreatmens(allTreatmens)
        }
        catch (error) {
            console.log(error)
        }
    }


    async function updateTreatmen(id: string) {
        try {
            const newTreatmen = await Treatmens.updateTreatmen(
                id,
                "64adc35349e324d59aca9863",
                "string2",
                "2021-10-10",
                "test2"
            )
            const allTreatmens = await Treatmens.getAllTreatmens()
            setTreatmens(allTreatmens)
        }
        catch (error) {
            console.log(error)
        }
    }



    return (
        <div className="flex flex-col items-center w-full justify-center">
            <h1 className="text-2xl font-bold mb-4">Treatmens</h1>
            <ul>
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
                    onClick={createTreatmen}
                >
                    Create
                </button>
                {treatmens?.map((treatmen) => (
                    <li
                        key={treatmen._id}
                        className="bg-gray-100 p-4 rounded mb-4 flex flex-col"
                    >
                        <div className="flex justify-between mb-2">
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                                onClick={() => deleteTreatmen(treatmen._id)}
                            >
                                Delete
                            </button>
                            <button
                                className="bg-green-500 text-white py-2 px-4 rounded"
                                onClick={() => updateTreatmen(treatmen._id)}
                            >
                                Update
                            </button>
                        </div>
                        <p className="mb-2">id: {treatmen._id}</p>
                        <p className="mb-2">animal id: {treatmen.animalId}</p>
                        <p className="mb-2">veterinarianId: {treatmen.veterinarianId}</p>
                        <p className="mb-2">date: {treatmen.date}</p>
                        <p>description: {treatmen.treatmentDescription}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TreatmensComponent;




