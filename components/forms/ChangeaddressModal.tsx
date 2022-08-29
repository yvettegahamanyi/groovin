import React, { useContext, useState } from "react";
import { AddressModal, ToastProps, UserObject } from "../../util/types";
import { BodyMeasurement } from "../../util/types";
import styles from "../../styles/Checkout.module.css";
import { useForm, SubmitHandler, Validate } from "react-hook-form";
import { Api } from "../../pages/api/service/Api";
import { EbackendEndpoints, EhttpMethod } from "../../util/enums";
import { AppContext } from "../context/GlobalContext";
import { Toast } from "../toasts/Toaster";
export default function ChangeaddressModal({
  isVisible,
  setModalVisiblity,
  ontouchOutSide,
  title,
  user,
}: AddressModal): JSX.Element {
  const {setUser} = useContext(AppContext);
  const { register, handleSubmit, getValues } = useForm<UserObject>();
  const [state, setState] = useState<UserObject>(user!);


  const [loading, setLoading] = useState<boolean>(false);
  const [{status,message}, setStatus] = useState<ToastProps>({status:"",message:""});
  
  // const router = useRouter();
  // const { register, handleSubmit, formState: { errors } } = useForm<UserObject>();
  const onSubmit: SubmitHandler<UserObject> = (data) => handleUpdate(data);

  const handleUpdate = async (data: Object) => {
    setLoading(true);
    await new Api().connect(EbackendEndpoints.UPDATE_USER, EhttpMethod.PUT, data)
      .then(
        (response) => {
          console.log(response);
          if (response.success) {
            setStatus({status:"success",message: response.message}); setTimeout(() => { setStatus({status:'',message:''})},1000)
             
           if(setUser) setUser(response.data.data);
          } else {
            setStatus({status:"error",message: response.message}); setTimeout(() => { setStatus({status:'',message:''})},1000)
          }
        },
        (error) => {
          setStatus({status:"error",message: error.message}); setTimeout(() => { setStatus({status:'',message:''})},1000)
        }
      )
      setLoading(false);
  }
  

  return (
    <>
      <Toast status={status} message={message} />
    <div className={styles.modal}>
      <div className="modal-content-2 rounded-tl-3xl rounded-tr-3xl p-4">
        <div className="items-center mb-5">
         <div className="flex justify-between">
         <h1 className="font-bold">{title}</h1>
          <div className="text-sm">
            <span
              className="cursor-pointer"
              onClick={() => setModalVisiblity(false)}
            >
              Cancel
            </span>
          </div>
         </div>
          <form onSubmit={handleSubmit(onSubmit)} className="text-sm">
            <div className="grid grid-cols-1 gap-4">
              <div className={styles.inputContainer}>
                <label
                  htmlFor="street_ddress"
                  className={state.streetAddress ? styles.filled : ""}
                >
                  Street Address
                </label>
                <input
                defaultValue={user?.streetAddress}
                  {...register("streetAddress")}
                  onChange={(e) => {
                    setState({ ...state, streetAddress: user?.streetAddress || e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className={styles.inputContainer}>
                <label
                  htmlFor="streen_number"
                  className={state.streetNumber ? styles.filled : ""}
                >
                  Street Number
                </label>
                <input
                defaultValue={user?.streetNumber}
                  {...register("streetNumber")}
                  onChange={(e) => {
                    setState({
                      ...state,
                      streetNumber: user?.streetNumber || e.target.value,
                    });
                  }}
                />
              </div>

              <div className={styles.inputContainer}>
                <label
                  htmlFor="postal_code"
                  className={state.postalCode ? styles.filled : ""}
                >
                  Postal Code
                </label>
                <input
                defaultValue={user?.postalCode}
                  {...register("postalCode")}
                  onChange={(e) => {
                    setState({
                      ...state,
                      postalCode: user?.postalCode || e.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className={styles.inputContainer}>
                <label
                  htmlFor="country"
                  className={state.country ? styles.filled : ""}
                >
                  Country
                </label>
                <input
                defaultValue={user?.country}
                  {...register("country")}
                  onChange={(e) => {
                    setState({ ...state, country: user?.country || e.target.value });
                  }}
                />
              </div>

              <div className={styles.inputContainer}>
                <label
                  htmlFor="city"
                  className={state.city ? styles.filled : ""}
                >
                  City
                </label>
                <input
                defaultValue={user?.city}
                  {...register("city")}
                  onChange={(e) => {
                    setState({ ...state, city: user?.city || e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className={styles.inputContainer}>
                <label
                  htmlFor="phone_number"
                  className={state.phoneNumber ? styles.filled : ""}
                >
                  Phone Number
                </label>
                <input
                defaultValue={user?.phoneNumber}
                  {...register("phoneNumber")}
                  onChange={(e) => {
                    setState({ ...state, phoneNumber: user?.phoneNumber || e.target.value });
                  }}
                />
              </div>
            </div>

            <input
              type="submit"
              defaultValue={"Proceed to Payment"}
              className="bg-brown w-full font-bold rounded py-2 my-2 text-sm"
            />
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
