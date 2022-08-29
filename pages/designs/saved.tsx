import { Design } from "../../components/cards/Design";
import { Home } from "../../layouts/Home";

export default function saved(): JSX.Element {
    return (
        <Home>
            <div className="w-full banner mb-5 flex items-center px-3">
                    <h1 className="text-white font-bold">Welcome, 
                    
                    <br />
                    SergeArts
                     </h1>
            </div>
            <div className="px-3">
            <h1 className="font-bold mb-2">
                My Saved Designs
            </h1> 
            <div className="grid grid-cols-2 gap-3">

            <Design />
            <Design />
            <Design />
            <Design />
            </div>
            </div>
          
        </Home>
    )
}