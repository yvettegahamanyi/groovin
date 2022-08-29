import { useContext } from "react"
import { AppContext } from "../context/GlobalContext"

/* eslint-disable @next/next/no-img-element */
export default function Navbar():JSX.Element{
    const {user} = useContext(AppContext)
    return(
        <nav className="flex gap-2 items-center w-full bg-white p-3 shadow">
                <img src="/assets/images/logo_2.png" alt="Logo" className="md-img" />
                <h1 className="font-bold">Groovinx</h1>

        </nav>
    )
}