import React, { useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler, Validate } from "react-hook-form";
import styles from "../../styles/Registration.module.css";
import { useRouter } from "next/router";
import { Api } from "../../pages/api/service/Api";
import { EbackendEndpoints, EhttpMethod } from "../../util/enums";
import { SignupFormInput, ToastProps } from "../../util/types";
import { Toast } from "../toasts/Toaster";

export default function Register():JSX.Element{
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const [{status,message}, setStatus] = useState<ToastProps>({status:"",message:""});
  const { register, reset, handleSubmit, formState: { errors } } = useForm<SignupFormInput>();
  const handleSignup = async (data: Object) => {
    setLoading(true);
    await new Api().connect(EbackendEndpoints.CREATE_USER, EhttpMethod.POST, data)
      .then(
        (response) => {
            if(response.success){
                reset(response)
                setStatus({status:"success",message: response.message}); setTimeout(() => { setStatus({status:'',message:''})},1000)
                
              setTimeout(() => {
                    router.push("/login");
              },2000)
            }
           else {
            setStatus({status:"error",message: response.message}); setTimeout(() => { setStatus({status:'',message:''})},1000)
     
          }
        },
        (error) => {
       
            setStatus({status:"success",message: error.message}); setTimeout(() => { setStatus({status:'',message:''})},1000)
     
        }
      )
      setLoading(false);
  }
  const onSubmit: SubmitHandler<SignupFormInput> = (data) => handleSignup(data);

  return (
    <div className="bg-primary w-full flex flex-col h-screen">

  <Toast status={status} message={message} />
      <div className="flex items-center justify-center h-1/4">
        <div>
          <Image src="/assets/images/Logo.png" width={90} height={70} alt="logo" />
        </div>
      </div>

      <div className={styles.roundedRectangle}>
        <h1 className="font-bold">Create An Account</h1>
        <p>Create account to use Groovinx</p>

        <form onSubmit={handleSubmit(onSubmit)} className="my-2 text-sm">
          {/* <label>First Name</label> */}

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
                d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
                stroke="#828282"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                stroke="#828282"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <input
              {...register("name", { required: true })}
              placeholder="Full Name"
              className="bg-gray-100 outline-none "
            />
          </div>
          {errors?.name?.type === "required" && (
            <p className="text-red-500 text-xs">This field is required</p>
          )}

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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                stroke="#828282"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 6L12 13L2 6"
                stroke="#828282"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <input
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              placeholder="Email"
              className="bg-gray-100 outline-none "
            />
          </div>
          {errors?.email?.type === "required" && (
            <p className="text-red-500 text-xs">This field is required</p>
          )}
          {errors?.email?.type === "patten" && (
            <p className="text-red-500 text-xs">This field must be a valid email</p>
          )}

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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="#828282"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12H22"
                stroke="#828282"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2V2Z"
                stroke="#828282"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <input
              {...register("country", { required: true })}
              placeholder="Country"
              className="bg-gray-100 outline-none "
            />
          </div>
          {errors?.country?.type === "required" && (
            <p className="text-red-500 text-xs">This field is required</p>
          )}

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
              className="bg-gray-100 outline-none "
            />
          </div>
          {errors?.username?.type === "required" && (
            <p className="text-red-500 text-xs">This field is required</p>
          )}
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
              type={"password"}
              className="bg-gray-100 outline-none "
            />
          </div>
          {errors?.password?.type === "required" && (
            <p className="text-red-500 text-xs">This field is required</p>
          )}
          {errors?.password?.type === "minLength" && (
            <p className="text-red-500 text-xs">
              Password cannot be less than 6 characters
            </p>
          )}


          {/* <input
            {...register("isDesigner")}
            type="radio"
            name="weather"
            value="true"
            id="field-rain"
            checked={true}
            className='hidden'
          /> */}
          
          <input
            type="submit"
            value={!loading?"Sign Up":"Creating account ..."}
            // onClick={() => router.push("/Login")}
            // className="bg-brown w-full font-bold rounded py-2"
            className={loading ? styles.disabledButton : styles.Button}
          />
        </form>

        <div className="flex justify-center items-center">
          <p className="self-cente text-sm my-4">Already has an account?</p>
        </div>
        <input
          type="submit"
          value={"Log In Here"}
          onClick={() => router.push("/login")}
          className="bg-gray-100 font-bold w-full rounded py-2 text-sm"
        />

        <div>
          <p></p>
        </div>
      </div>
    </div>
  );
}

