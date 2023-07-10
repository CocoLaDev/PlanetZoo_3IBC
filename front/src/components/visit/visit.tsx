import React from "react";
import { useUserContext } from "../../utils/user.context";
import Enclos from "./enclos";
import Map from "./map";
import TicketDetails from "./ticketDetails";

const Visit = () => {

  const [enclosVisited, setEnclosVisited] = React.useState<boolean>(false);
  const [objectSource, setObjectSource] = React.useState<string>("");

  const { data } = useUserContext().user;

  function handleClick(source: string) {
    setObjectSource(source);
    setEnclosVisited(true);
  }

  return (
    <div className="w-full h-[90vh]">
      {!data ?
        <div className="grid h-full px-4 bg-white place-content-center">
          <div className="text-center">
            <h1 className="font-black text-gray-200 flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
            </h1>
            <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>
            <p className="mt-4 text-gray-500">You need to be logged in to visit the zoo !</p>
          </div>
        </div>
        :
        <div className="h-full w-full p-4 flex">
          <div className="h-full w-[80%]">
            <div className="h-[10%] mx-2">
              <h1 className="text-3xl font-bold">Visit the zoo</h1>
              <hr className="my-2 w-1/3" />
              <p className="text-gray-500 italic w-full text-right -mt-4">Click on an area to visit it</p>
            </div>
            {enclosVisited ?
              <Enclos setEnclosVisited={setEnclosVisited} objectSource={objectSource} />
              :
              <Map handleClick={handleClick} />
            }
          </div>
          <div className="w-[20%] pl-4">
            <div className="h-[10%]" />
            <h1 className="h-[6%] text-xl font-bold">Your pass :</h1>
            <TicketDetails />
          </div>
        </div>
      }
    </div>
  )
};

export default Visit;
