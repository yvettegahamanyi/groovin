
import { useContext } from "react";
import { AppContext } from "../components/context/GlobalContext";
import Products from "../components/sections/Products";
import { Home } from "../layouts/Home";

export default function discover(): JSX.Element {
    return (
        <Home>
            <div className="p-3">
                <Products/>
            </div>
        </Home>
    )
}