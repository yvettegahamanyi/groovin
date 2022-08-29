import { IDesignSectionsProps } from "../../util/types";
import { Design } from "../cards/Design";

export default function Designs(props:IDesignSectionsProps):JSX.Element{
    const designs = props.designs;
    return(
        <div>
              <div className="overflow-x-auto mb-5">
                        <div className={`${props.grid?'w-full':"w-max md:w-full"}`}>
                            <div className={` ${props.grid?'grid grid-cols-2 gap-3':'flex gap-2'}`}>
                                {designs?.length && props.small == true? (
                                    designs.map((item, index)=>(
                                        <Design key={index} small = {props.small} design={item} />
                                    ))
                                ):(
                                   
                                    <div>
                                        <p>{"you don't have design yet"}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
        </div>
    )
}