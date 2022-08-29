import Link from 'next/link'
import {useRouter} from 'next/router'
import { INavProps } from '../../util/types'
export function NavLink(props:INavProps): JSX.Element {
    const router = useRouter()
    return(
        <Link href={props.path}>
        <a className={`grid grid-cols-1 text-sm ${router.pathname === props.path && 'text-primary'}`}> <span className="text-center text-xl">{props.children}</span> <span className="block">{props.title}</span></a>
        </Link>
    )
}