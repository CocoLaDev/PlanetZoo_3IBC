import { ticketsArray } from "../../dto"
import TiketCard from "./card"

const Tickets = () => {

    return (
        <div className="w-full flex justify-center">
            <div className="w-5/6 h-[88vh] flex justify-center items-center flex-wrap gap-3">
                {ticketsArray.map((ticket, index) => (
                    <TiketCard key={index} ticket={ticket} />
                ))}
            </div>
        </div>
    )
}

export default Tickets