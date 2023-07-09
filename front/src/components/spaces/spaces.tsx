import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spaces } from "../../services";
import { Space } from "../../dto/"
import { Link } from "react-router-dom";

const SpaceComponent = () => {

    const { id } = useParams();
    const [space, setSpace] = useState<Space | null>(null);

    useEffect(() => {
        if (id) {
            Spaces.getSpaceById(id).then((space) => setSpace(space));
        }
    }, [id]);

    return (
        <div>
            <h1>Space</h1>
            {space && (
                <div>
                    <h2>{space.name}</h2>
                    <p>{space.description}</p>
                    <Link to={`/Spaces/${space._id}/tickets`}>Tickets</Link>
                </div>
            )}
        </div>
    );




};

export default SpaceComponent;



