import { useEffect, useState } from "react";
import { needProps } from "../utils/types/data";
import { ApolloClientCall } from "../components/apolloClient/ApolloClient";
import { getUserNeeds } from "../components/apolloClient/Queries";

import { getUsersByTagNeed } from "../components/apolloClient/Queries";
import { CURRENT_USER } from "../components/loggedUser/userLoged";



export default function Myneeds() {
    const [userNeed, setUserNeed] = useState<needProps[]>([]);
    const [needSuggestions, setNeedSuggestions] = useState<needProps[]>([]);
    
    
    useEffect(() => {
        getUserNeeds(CURRENT_USER)
          .then((needData) => {
            setUserNeed(needData);
            console.log('test');
            console.log(userNeed)
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);
    
    console.log(userNeed);

    return(
    
        <div className="bg-gray p-4 flex justify-center h-screen ">
            <div className="bg-white rounded-lg w-1/2 h-[90%] shadow-lg flex flex-col justify-between p-10 relative">
                <div className="flex flex-col ml-6 pt-4">
                    <h3 className="text-2xl font-semibold pb-1">Mes besoins</h3>
                </div>

                <div className="mt-6 flex flex-col overflow-y-scroll"> 
                    {userNeed !== undefined && userNeed.length === 0 ? (
                        <p className="text-xs p-2 bg-gray-100 rounded mt-2">Vous n'avez pas de besoins pour l'instant.</p>
                        ) : (
                        [...userNeed].reverse().map((need) => (
                
                        <div className="p-10 bg-gray-100 rounded-lg w-full mb-4 flex justify-center "> Titre du besoin : {need?.title}</div>
                    
                    )))}
                </div>
        </div>
        </div>
    
    )
}