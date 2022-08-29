import { IButtonProps } from "../../util/types";

// export function BrownButton(props:IButtonProps):JSX.Element {
//     return(
//         <button className="w-full text-black font-bold px-3 py-2 bg-brown rounded-md text-sm">
//             {props.title}
//         </button>
//     )
// }

const BrownButton: React.FC<IButtonProps> = (props) => {
    return (
        <button className="w-full text-black font-bold px-3 py-1 bg-brown rounded-md text-sm" onClick={props.action}> {props.title}</button>
    )
}

export {BrownButton};
