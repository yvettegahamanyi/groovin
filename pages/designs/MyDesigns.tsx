import { Design } from "../../components/cards/Design";
import { Home } from "../../layouts/Home";
import { useRouter } from "next/router";
import {useState} from 'react';
import { DesignType } from "../../util/types";


export default function MyDesigns(): JSX.Element {
    const router = useRouter();
    
  
    const myDesigns:DesignType[] = [
        {_id:"1",images:["/assets/images/manekke.png"],name:"Design Name",createdAt:"12/2020"},
        {_id:"2",images:["/assets/images/manekke.png"],name:"Design name",createdAt:"12/2020"},
        {_id:"3",images:["/assets/images/manekke.png"],name:"Design name",createdAt:"12/2020"},
        {_id:"4",images:["/assets/images/manekke.png"],name:"Design name",createdAt:"12/2020"}
        
    ]
    return (
       

    
<div className="px-3">
<h1 className="font-bold mb-2">
    my Design
</h1>

<div className="grid grid-cols-2 gap-3">

{myDesigns.map((item, index)=>(
    <Design hasActions key={index} hasMore design={item}/>

))}
{/* <Design hasActions hasMore/>
<Design hasActions hasMore/>
<Design hasActions hasMore/> */}
</div>
</div>

    )
}