import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../components/context/GlobalContext";
import { EbackendEndpoints, EhttpMethod } from "../../util/enums";
import { DesignType, OrderType, ToastProps } from "../../util/types";
import { Api } from "../api/service/Api";

export default function Order(props:OrderType):JSX.Element {
    const { user,setToken } = useContext(AppContext);
    const [loadedDesign, setLoadedDesign]=useState<DesignType>({});
    const [errortext, setErrortext] = useState<string>("");
      const [{status,message}, setStatus] = useState<ToastProps>({status:"",message:""});
      useEffect(()=>{
          const fetchDesigns = async ()=>{
                await new Api().connect(EbackendEndpoints.GET_DESIGNS, EhttpMethod.GET)
                .then(
                  (response) => {
                    
                    if (response.success === true) {
                     setLoadedDesign(response.data[0]);
                    } else setStatus({status:"error",message:'something went wrong'}); setTimeout(() => { setStatus({status:'',message:''})},1000)
                  },
                  (error) => {
                    // setStatus({status:"error",message:error.message});
                      setErrortext("can't fetch data");
                  }
                );
          }
          fetchDesigns();
      },[loadedDesign]);
    
    return(
        
        <div className="flex flex-col pb-4 text-sm p-5">
          <div className="flex flex-row justify-between font-bold py-2">
            <p>Order Item</p>
            <p>${loadedDesign.cost_Price! + loadedDesign.selling_price!}</p>
          </div>
          
          <div  className="flex flex-row justify-between font-bold py-2">
            <p>Delivery Fee</p>
            <p>$3</p>
          </div>

          <div className="flex flex-row justify-between font-bold py-2">
            <p>Total cost</p>
            <p>${loadedDesign.cost_Price! + loadedDesign.selling_price! + 3}</p>
          </div>
        </div>
    )
}