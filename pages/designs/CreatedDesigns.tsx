import { Design } from "../../components/cards/Design";
import { useRouter } from "next/router";
import {useState} from 'react';
import { DesignType } from "../../util/types";


export default function CreatedDesigns(): JSX.Element {
    const router = useRouter();
    const createdDesign:DesignType[] = [
        {_id:"1",images:["/assets/images/manekke.png"],name:"Design Name",createdAt:"12/2020"},
        {_id:"2",images:["/assets/images/manekke.png"],name:"Design name",createdAt:"12/2020"},
        {_id:"3",images:["/assets/images/manekke.png"],name:"Design name",createdAt:"12/2020"},
        {_id:"4",images:["/assets/images/manekke.png"],name:"Design name",createdAt:"12/2020"}
        
    ]
    return (
       

<div className="px-3">
<h1 className="font-bold mb-2">
    Created Design
</h1>
{/* //---------------------- */}
<div className="grid grid-cols-2 gap-3">

{createdDesign.map((item, index)=>(
    <Design hasActions key={index} design={item}/>

))}
{/* <Design hasActions />
<Design hasActions />
<Design hasActions /> */}
</div>
</div>
    )
}