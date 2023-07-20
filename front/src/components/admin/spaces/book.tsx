import { Space } from "../../../dto"

interface ServiceBookProps {
    space: Space;
}

const ServiceBook = ({ space }: ServiceBookProps) => {
    return (
        <div>
            <h1>ServiceBook</h1>
        </div>
    )
}

export default ServiceBook