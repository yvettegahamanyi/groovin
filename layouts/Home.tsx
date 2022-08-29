import ProtectRoutes from "../components/sections/ProtectRoutes";
import { Menu } from "../components/shared/Menu";
import Navbar from "../components/shared/Navbar";
import {useRouter} from 'next/router'

export function Home({ children }: any): JSX.Element {
    const pagesWithNav = ['/discover','/designs','/profile']
    const current_page = useRouter().pathname
    return (
      <ProtectRoutes>
            <div className="grid grid-rows-12">
            {
                pagesWithNav.includes(current_page) &&  <Navbar />
            }
            <div className="overflow-x-auto mb-20">
                {children}
            </div>
            <div className="fixed  bg-white w-full bottom-0 z-50 md:w-2/3 lg:w-1/3">

                <Menu />
            </div>

        </div>
      </ProtectRoutes>
    )
}