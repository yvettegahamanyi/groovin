import { checkLocalStorage } from "../../util/checkLocalStorage"

export default function ProtectRoutes({children}:any){
    if (typeof window !== 'undefined' && !checkLocalStorage('token')) {
        window.location.href = "/login"
        return <></>
    }
    else return(<>{children}</>)
}