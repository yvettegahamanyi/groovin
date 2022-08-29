import jwt from 'jsonwebtoken';
export default function decodeToken(token:string){
    return jwt.decode(token)
}