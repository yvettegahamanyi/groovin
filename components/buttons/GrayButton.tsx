import { IButtonProps } from "../../util/types";

export function GrayButtonProps(props:IButtonProps):JSX.Element {
    return(
        <button className="w-full text-black font-bold px-3 py-2 bg-gray-100 rounded-md text-sm">
            {props.title}
        </button>
    )
}