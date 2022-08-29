import {
    EnvironmentOutlined,
    DashOutlined
} from "@ant-design/icons";
import { IOrderTrackProps } from "../../util/types";

export function TrackProgress(props: IOrderTrackProps): JSX.Element {
    return (
        <div className="flex gap-5 w-full my-1">
            <div>
                <div className={`w-10 h-10 rounded-full  flex items-center justify-center ${props.active ? 'bg-primary p-1 text-white' : 'bg-gray-100 text-black'}`}>
                    <EnvironmentOutlined />
                </div>
                {!props.end &&
                    <div className={`text-center ${props.active ? 'text-primary' : 'text-black'}`}>

                        <DashOutlined className="transform rotate-90" />
                    </div>
                }
            </div>
            <div className="w-full">
                <div className="grid grid-cols-2">
                    <h1 className="font-bold text-md">Order Placed</h1>
                    <div className="flex justify-end items-center">
                        <span className="text-xs text-gray-500">  Monday 1st Jan</span>
                    </div>
                </div>
                <p className="text-sm">Your order is received by groovin</p>
            </div>

        </div>
    )
}