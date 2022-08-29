
import { useRouter } from "next/router";
import React, { useState, createContext, ReactNode, Dispatch, useEffect } from "react";
import { Api } from "../../pages/api/service/Api";
import { checkLocalStorage } from "../../util/checkLocalStorage";
import decodeToken from "../../util/decodeToken";
import { EbackendEndpoints, EhttpMethod } from "../../util/enums";
import { ToastProps, UserObject } from "../../util/types";
import { Toast } from "../toasts/Toaster";

export interface IAppProps {
  children?: ReactNode;
}
export interface IAppContext {
  token?: string;
  setToken?: (value: string) => void;
  user?: UserObject;
  setUser?: (value: UserObject) => void;
}
const AppContext = createContext<IAppContext>({});

export function GlobalContext({ children }: IAppProps) {
  const [{ status, message }, setStatus] = useState<ToastProps>({ status: "", message: "" });
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<UserObject>();

  const router = useRouter()


  const localToken: string = checkLocalStorage('token');
  let u_id: string = ''
  if (localToken) {
    let tokenPayload: any = decodeToken(localToken)
    u_id = (tokenPayload?.user_id)
    
  } 
  
  // get user info
 
  useEffect(() => {
    async function loadUser() {
      if (u_id) {
        const endpoint = EbackendEndpoints.GET_USER+u_id
        const response = await new Api().connect(endpoint, EhttpMethod.GET)
        if (response.success === true) {
          setUser(response.data)
        } else setStatus({ status: "error", message: response.message }); setTimeout(() => { setStatus({ status: '', message: '' }) }, 1000)
      } 
    }
    if(!user) loadUser() 
  }, [localToken, router, u_id, user])

  
  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        setUser,
        user
      }}
    >
      <Toast status={status} message={message} />
      {children}
    </AppContext.Provider>
  );
}
export { AppContext };
