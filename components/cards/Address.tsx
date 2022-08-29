import { useContext } from "react";
import { AppContext } from "../context/GlobalContext";

export function Address():JSX.Element {
    const { user,setToken } = useContext(AppContext);
    return(
        <div className="bg-gray-100 border-2 border-brown rounded-md p-5">
                <h1 className="font-bold mb-1">{user?.name}</h1>
                <div className="text-sm">
                    <span className="">{user?.streetNumber} {user?.streetAddress} </span>
                    <span>{user?.postalCode} - {user?.country}</span>
                </div>
        </div>  
    )
}