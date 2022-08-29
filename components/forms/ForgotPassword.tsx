import React from "react";
import Image from "next/image";
import { useForm, SubmitHandler, Validate } from "react-hook-form";
import styles from "../../styles/Registration.module.css";
import { useRouter } from "next/router";
import { ForgotPasswordFormInput } from "../../util/types";


export default function ForgotPassword(): JSX.Element {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ForgotPasswordFormInput>();
  const onSubmit: SubmitHandler<ForgotPasswordFormInput> = (data) =>
    console.log(data);

  return (
    <div className="relative bg-primary w-full h-screen">
      <div className="flex flex-col items-center justify-center flex-1 pt-8">
        <div>
          <Image src="/assets/images/Logo.png" width={90} height={70} alt="logo" />
        </div>
        <div>
          <Image
            src="/assets/images/forgotPassword.png"
            width={240}
            height={340}
            alt="login image"
          />
        </div>
      </div>

      <div className="flex-2 absolute bottom-0 top-1/2 w-full">
        <div className={styles.roundedRectangle}>
          <h1 className="font-bold">Forgot Password</h1>
          <p className="mb-6">
            Provide your e-mail to get a password reset link
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="my-2">
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
                {...register("email")}
                placeholder="Email"
                className="bg-gray-100 outline-none "
              />
            </div>

            <input
              type="submit"
              value={"Submit"}
              className="bg-brown w-full font-bold rounded py-2"
            />
          </form>

          <input
            type="submit"
            value={"Back to Login"}
            className="bg-gray-100 font-bold w-full rounded py-2 mt-8"
            onClick={() => router.push("/login")}
          />

          <div>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
}
