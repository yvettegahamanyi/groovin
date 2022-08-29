import axios from 'axios'
import { checkLocalStorage } from '../../../util/checkLocalStorage';
import { EbackendEndpoints, EhttpMethod } from '../../../util/enums';
import baseUrl from '../../../util/url';
export class Api{
    private token = checkLocalStorage('token')
    public async connect(
        endpoint:EbackendEndpoints | string,
        method:EhttpMethod,
        body?:any
    ): Promise<any>{
        const url = baseUrl+endpoint;
        let headers:any =  {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }
        if(typeof window !== undefined){
            headers = {
                ...headers,
                Authorization: 'Bearer '+this.token,
                'set-Cookies': 'AccessToken='+this.token
            }
        }
        try{
            const request = await axios({
                url,
                method,
                headers,
                data:JSON.stringify(body)
            })

            if(request.status.toString().startsWith('4') || request.status.toString().startsWith('5')){
                // console.error(` error returned by the API: ${request.statusText}`)
                return({status:false,message:request.statusText})
                // throw new Error(request.statusText)
            }
            return request.data

        }catch(e:any) {
            // console.log(`There was an error connecting to the API: ${e.message}`)
            return({status:false,message:e.message})
        }
    }
}
export const UseApi = new Api()
