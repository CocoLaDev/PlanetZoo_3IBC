import map from "../../assets/map.jpeg"
import { Space } from "../../dto";
import "./style.css";

interface MapProps {
    handleClick: (arg0: Space, arg1: string) => void;
    spaces: Space[];
}

const Map = ({ handleClick, spaces }: MapProps) => { 
    return (
      <div className="relative h-[90%] w-full">
        <img src={map} alt="map" className="h-full w-full" />
        <button
          className="button absolute top-14 left-1/4 disabled:"
          onClick={() => handleClick(spaces.find((space)=>space.name === "Farm")!, spaces.find((space) => space.name === "Farm")?._id!)}
          disabled={spaces.find((space) => space.name === "Farm")?.status === true}
        >
          <svg
            className="svgIcon"
            viewBox="0 0 512 512"
            height="1em"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
          </svg>
        </button>
        <button
          className="button absolute bottom-16 right-1/3 -mr-6"
          onClick={() => handleClick(spaces.find((space)=>space.name === "Savanna")!, spaces.find((space) => space.name === "Savanna")?._id!)}
          disabled={spaces.find((space) => space.name === "Savanna")?.status === true}
        >
          <svg
            className="svgIcon"
            viewBox="0 0 512 512"
            height="1em"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
          </svg>
        </button>
        <button
          className="button absolute top-12 left-1/2 ml-20"
          onClick={() => handleClick(spaces.find((space)=>space.name === "Forest")!, spaces.find((space) => space.name === "Forest")?._id!)}
          disabled={spaces.find((space) => space.name === "Forest")?.status === true}
        >
          <svg
            className="svgIcon"
            viewBox="0 0 512 512"
            height="1em"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
          </svg>
        </button>
      </div>
    );
};

export default Map;