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
             {/* //---------------------- */}
        </div>
        <div className="px-3">
            {/* create designs */}
            <div>
            <div className="grid grid-cols-2 items-center">
                <h1 className="font-bold mb-2">
                    Create Designs
                </h1>
                <div className="flex justify-end">
                    <span className="text-gray-500 text-sm">See all</span>
                </div>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <div className="w-max md:w-full">
                        <div className=" flex gap-2">
                            <Design small />
                            <Design small />
                            <Design small />
                            <Design small />
                            <Design small />
                        </div>
                    </div>
                </div>
            </div>
            </div>

            {/* my saved designs */}
            <div>
            <div className="grid grid-cols-2 items-center">
                <h1 className="font-bold mb-2">
                    My Saved Designs
                </h1>
                <div className="flex justify-end">
                    <span className="text-gray-500 text-sm">See all</span>
                </div>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <div className="w-max md:w-full">
                        <div className=" flex gap-2">
                            <Design small />
                            <Design small />
                            <Design small />
                            <Design small />
                            <Design small />
                        </div>
                    </div>
                </div>
            </div>
            </div>

            {/* Shop */}
            <div>
            <div className="grid grid-cols-2 items-center">
                <h1 className="font-bold mb-2">
                   Shop
                </h1>
                <div className="flex justify-end">
                    <span className="text-gray-500 text-sm">See all</span>
                </div>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <div className="w-max md:w-full">
                        <div className=" flex gap-2">
                            <Design small />
                            <Design small />
                            <Design small />
                            <Design small />
                            <Design small />
                        </div>
                    </div>
                </div>
            </div>
            </div>

        </div>

    </Home>
    )
}