
import { TrackProgress } from "../../components/cards/TrackProgress";
import { Home } from "../../layouts/Home";

export default function track(): JSX.Element {
    return (
        <Home>
            <div className="w-full order--track-banner mb-5 flex items-center px-3 relative">

                <div className="px-2 py-4 grid grid-cols-2 gap-3 bg-gray-100 w-full rounded-md text-xs">
                    <div className="border-r-2 border-black text-center">
                        <h1 className="text-gray-500 my-1 block">Product</h1>
                        <span className="font-bold">Custom T-shirt design</span>
                    </div>
                    <div className="text-center">
                        <h1 className="text-gray-500 my-1 block">Order No</h1>
                        <span className="font-bold">Oder #23450</span>
                    </div>
                </div>
            </div>

            <div className="my-3 p-5">
                <div className="mb-5 grid grid-cols-2 items-center">
                    <h1 className="font-bold text-sm">
                        Sun, 7th Jan
                    </h1>
                    <div className="flex justify-end">
                        <span className="text-gray-500 text-xs">
                            Estimated arrival date
                        </span>
                    </div>
                </div>

                {/* tabs progressing bar */}


                {/* tabs progressing bar ends here */}

                <div>
                    <TrackProgress active />
                    <TrackProgress active  />
                    <TrackProgress  />
                    <TrackProgress  />
                    <TrackProgress  />
                    <TrackProgress end />
                </div>
            </div>
        </Home>
    )
}