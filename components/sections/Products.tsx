
import axios from "axios";
import { useEffect, useState } from "react";
import { Api } from "../../pages/api/service/Api";
import { EbackendEndpoints, EhttpMethod } from "../../util/enums";
import { ToastProps } from "../../util/types";
import baseUrl from "../../util/url";
import { Product } from "../cards/Product";


export default function Products():JSX.Element{
    const [loadedDesigns, setLoadedDesign]=useState([]);
    const [errortext, setErrortext] = useState<string>("");
    const [{status,message}, setStatus] = useState<ToastProps>({status:"",message:""});
    useEffect(()=>{
        const fetchDesigns = async ()=>{
              await new Api().connect(EbackendEndpoints.GET_DESIGNS, EhttpMethod.GET)
              .then(
                (response) => {
                  
                  if (response.success === true) {
                   setLoadedDesign(response.data.docs);
                  } else setStatus({status:"error",message:'something went wrong'}); setTimeout(() => { setStatus({status:'',message:''})},1000)
                },
                (error) => {
                  // setStatus({status:"error",message:error.message});
                    setErrortext("Invalid username or password");
                }
              );
        }
        fetchDesigns();
    },[loadedDesigns]);
    // console.log("these are loaded designs :", loadedDesigns);
    return(
      <div>
        {loadedDesigns.length != 0?
        
        (   
        <div>
             
          {loadedDesigns.map((item, index)=>(
            <Product hasActions key={index} design={item} />
          ))}
     </div>
     ):(
          <div>
          no design registered
     </div>

        )
        }

      </div>
     
    )
}