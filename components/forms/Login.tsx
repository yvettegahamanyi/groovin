import React, { useState } from "react";
import {Toast} from '../../components/toasts/Toaster';
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "../../styles/Registration.module.css";
import { useRouter } from "next/router";
import { Api } from "../../pages/api/service/Api";
import { EbackendEndpoints, EhttpMethod } from "../../util/enums";
import { ToastProps, LoginFormInput } from "../../util/types";

export default function Login(): JSX.Element {
  const router = useRouter();
  const [errortext, setErrortext] = useState<string>("");
  const [{status,message}, setStatus] = useState<ToastProps>({status:"",message:""});
  const [ loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>();
  const handleLogin = async(data:LoginFormInput)=>{
    setLoading(true);
    await new Api().connect(EbackendEndpoints.LOGIN_USER, EhttpMethod.POST,data)
    .then(
      (response) => {
        if (response.success === true) {
          setLoading(false)
          localStorage.setItem("token",JSON.stringify(response.message))
         
          router.push("/discover");
        } else setStatus({status:"error",message:'Invalid username or password'}); setTimeout(() => { setStatus({status:'',message:''})},1000)
        setLoading(false);
      },
      (error) => {
        // setStatus({status:"error",message:error.message});
        setLoading(false);
          setErrortext("Invalid username or password");
      }
    );
  }
  const onSubmit: SubmitHandler<LoginFormInput> = (data) => handleLogin(data);
 

  return (
    <>
  <Toast status={status} message={message} />
    <div className="relative bg-primary w-full h-screen">
      <div className="flex flex-col items-center justify-center flex-1 pt-8">
        <div>
          <Image src="/assets/images/Logo.png" width={90} height={70} alt="logo" />
        </div>
        <div>
          <Image
            src="/assets/images/loginImage.png"
            width={240}
            height={340}
            alt="login image"
          />
        </div>
      </div>

      <div className="flex-2 absolute bottom-0 top-1/3 w-full">
        <div className={styles.roundedRectangle}>
          <h1 className="font-bold">Welcome Back</h1>
          <p>Log in to access Groovin</p>

          <form onSubmit={handleSubmit(onSubmit)} className="my-2 text-sm">
            <div className="bg-gray-100 rounded flex px-2 py-2 my-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-3 self-center"
              >
                <path
                  d="M16 21V19C16 16.7909 14.2091 15 12 15H5C2.79086 15 1 16.7909 1 19V21"
                  stroke="#828282"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"
                  stroke="#828282"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 11L19 13L23 9"
                  stroke="#828282"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <input
                {...register("username", { required: true })}
                placeholder="Username"
                className="bg-gray-100 outline-none"
              />
            </div>
            {errors?.username?.type === "required" && (
              <p className="text-red-500 text-xs">This field is required</p>
            )}
            <div className="bg-gray-100 rounded flex justify-between px-2 py-2 my-3">
              <div className="flex ">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-3 self-center"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 13C3 11.8954 3.89543 11 5 11H19C20.1046 11 21 11.8954 21 13V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V13Z"
                    stroke="#828282"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11"
                    stroke="#828282"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <input
                  {...register("password", { required: true, minLength: 6 })}
                  placeholder="Password"
                  className="bg-gray-100 outline-none "
                  type={"password"}
                />
              </div>
            </div>
            {errors?.password?.type === "required" && (
              <p className="text-red-500 text-xs">This field is required</p>
            )}
            {errors?.password?.type === "minLength" && (
              <p className="text-red-500 text-xs">
                Password cannot be less than 6 characters
              </p>
            )}
            <div className="grid justify-items-stretch">
            {errortext != '' ? (
              <p className="text-red-500 text-xs justify-self-center">
                {errortext}
              </p>
            ) : null}
            </div>
            

            <div className="flex justify-center items-center">
              <p
                className="self-cente text-sm my-4 cursor-pointer"
                onClick={() => router.push("/forgotpassword")}
              >
                Forgot Password
              </p>
            </div>
            <input
              type="submit"
              value={!loading?"Log In":"Logging in ..."}
              // onClick={() => router.push("/discover")}
              disabled={loading}
              // className="bg-brown w-full font-bold rounded py-2"
              className={loading? styles.disabledButton : styles.Button}
            />
          </form>

          <div className="flex justify-center items-center">
            <p className="self-cente text-sm my-4">Don’t have an account ?</p>
          </div>
          <input
            type="submit"
            value={"Sign Up"}
            onClick={() => router.push("/register")}
            className="bg-gray-100 font-bold w-full rounded py-2 text-sm"
          />

          <div>
            <p></p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
