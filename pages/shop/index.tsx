import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Menu } from "../../components/shared/Menu";
import { BodyMeasurement, DesignType, Fabric, ToastProps } from "../../util/types";
import styles from "../../styles/Checkout.module.css";
import { useForm, SubmitHandler, Validate } from "react-hook-form";
import { EbackendEndpoints, EhttpMethod } from "../../util/enums";
import { Api } from "../api/service/Api";
import { Home } from "../../layouts/Home";

interface FabricsObject {
  id?: number;
  image?: any;
  name?: string;
}

export default function Shop(): JSX.Element {
  const router = useRouter();
  const { register, handleSubmit, getValues } = useForm<BodyMeasurement>();
  const onSubmit: SubmitHandler<BodyMeasurement> = (data) => console.log(data);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [state, setState] = useState<BodyMeasurement>({});

  function handleTextChange(text: string) {
    setValue(text);

    if (text !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }
  const items: FabricsObject[] = [
    { id: 1, image: "/assets/fabric2.png", name: "Fabric used" },
    { id: 2, image: "/assets/fabric1.png", name: "Fabric used" },
    { id: 3, image: "/assets/fabric1.png", name: "Fabric used" },
    { id: 4, image: "/assets/fabric1.png", name: "Fabric used" },
    { id: 5, image: "/assets/fabric1.png", name: "Fabric used" },
    { id: 6, image: "/assets/fabric1.png", name: "Fabric used" },
    { id: 7, image: "/assets/fabric1.png", name: "Fabric used" },
    { id: 8, image: "/assets/fabric1.png", name: "Fabric used" },
  ];
  const measurementSample: BodyMeasurement = {
    body_Height: "5 ft 7 in",
    bust_Circomference: "35.25",
    waist_circumference: "28.5",
    hips_bust_circumference: "37.5",
    elbow: "15.8",
    biceps: "22.3"
  }
  
  const [loadedDesign, setLoadedDesign]=useState<DesignType>({});
  const [errortext, setErrortext] = useState<string>("");
    const [{status,message}, setStatus] = useState<ToastProps>({status:"",message:""});
    useEffect(()=>{
        const fetchDesigns = async ()=>{
              await new Api().connect(EbackendEndpoints.GET_DESIGNS, EhttpMethod.GET)
              .then(
                (response) => {
                  if (response.success === true) {
                   setLoadedDesign(response.data.docs[0]);
                  } else setStatus({status:"error",message:'something went wrong'}); setTimeout(() => { setStatus({status:'',message:''})},1000)
                },
                (error) => {
                  // setStatus({status:"error",message:error.message});
                    setErrortext("can't fetch data");
                }
              );
        }
        fetchDesigns();
    },[loadedDesign]);

    // console.log("this is the loadedDesign :",loadedDesign);

  return (
    <Home>
    <div className="grid grid-rows-12">
      <div className="overflow-x-auto">
        <div className="w-full overflow-y-auto min-h-full h-screen flex flex-col ">
          <div className="">
            <div className="flex justify-center w-full">
              <Image
                src="/assets/images/Post.png"
                width={489}
                height={453}  
                alt="post"
              />
            </div>
          </div>
          <div className="p-5">
            <div className="flex justify-between">
              <div>
                <p className="font-bold ">{loadedDesign.name}</p>
                {/* <p className="text-xs">
                  <span className="font-bold text-gray-600">Design by:</span>{" "}
                  @{loadedDesign.designer_id?.username}
                </p> */}
                {loadedDesign.designer_id === null ?(<p className="text-xs">
                  <span className="font-bold text-gray-600">Design by:</span>{" "}
                  @Unkown
                </p>): (<p className="text-xs">
                  <span className="font-bold text-gray-600">Design by:</span>{" "}
                  @{loadedDesign.designer_id?.username}
                </p>)}

              </div>
              <div>
                <p className="font-bold">${loadedDesign.selling_price! + loadedDesign.cost_Price!}</p>
              </div>
            </div>
            <h2 className="font-bold mt-2">{"Tailor's details"}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4">
                <div className={styles.inputContainer}>
                  <label
                    htmlFor="body_Height"
                    className={styles.filled }
                  >
                    Body Height
                  </label>
                  <input
                    {...register("body_Height")}
                    onChange={(e) => {
                      setState({ ...state, body_Height: e.target.value });
                    }}
                    value={measurementSample.body_Height}
                    disabled={true}
                    className="text-gray-400 text-xs"
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label
                    htmlFor="bust_Circomference"
                    className={styles.filled}
                  >
                    Bust Circomference
                  </label>
                  <input
                    {...register("bust_Circomference")}
                    onChange={(e) => {
                      setState({
                        ...state,
                        bust_Circomference: e.target.value,
                      });
                    }}
                    value={measurementSample.bust_Circomference}
                    disabled={true}
                    className="text-gray-400 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className={styles.inputContainer}>
                  <label
                    htmlFor="waist_circumference"
                    className={styles.filled}
                  >
                    Waist circumference
                  </label>
                  <input
                    {...register("waist_circumference")}
                    onChange={(e) => {
                      setState({
                        ...state,
                        waist_circumference: e.target.value,
                      });
                    }}
                    value={measurementSample.waist_circumference}
                    disabled={true}
                    className="text-gray-400 text-xs"
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label
                    htmlFor="hips_bust_circumference"
                    className={
                      styles.filled
                    }
                  >
                    Hips bust circumference{" "}
                  </label>
                  <input
                    {...register("hips_bust_circumference")}
                    onChange={(e) => {
                      setState({
                        ...state,
                        hips_bust_circumference: e.target.value,
                      });
                    }}
                    value={measurementSample.hips_bust_circumference}
                    disabled={true}
                    className="text-gray-400 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className={styles.inputContainer}>
                  <label
                    htmlFor="elbow"
                    className={styles.filled}
                  >
                    Elbow
                  </label>
                  <input
                    {...register("elbow")}
                    onChange={(e) => {
                      setState({ ...state, elbow: e.target.value });
                    }}
                    value={measurementSample.elbow}
                    disabled={true}
                    className="text-gray-400 text-xs"
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label
                    htmlFor="biceps"
                    className={styles.filled}
                  >
                    Biceps
                  </label>
                  <input
                    {...register("biceps")}
                    onChange={(e) => {
                      setState({ ...state, biceps: e.target.value });
                    }}
                    value={measurementSample.biceps}
                    disabled={true}
                    className="text-gray-400 text-xs"
                  />
                </div>
              </div>
              <div className="my-5">
                <h1 className="font-bold">Fabric used</h1>

                <div className="grid grid-cols-4 gap-4">
                  {loadedDesign.fabrics?.length != 0 ? (
                      loadedDesign.fabrics?.map((item: Fabric, index: number) => {
                        return (
                          <div key={index}>
                            <Image
                              src={item.file_link!}
                              width={80}
                              height={69}
                              alt="fabrics"
                            />
                            <p className="text-xs">{item.name}</p>
                          </div>
                        );
                      }
                  )):(
                    <div className="col-span-3">
                      <p>no fabrics provided yet</p>
                    </div>
                  )
                  }
                </div>
              </div>
              <input
                type="submit"
                value={"Proceed to Payment"}
                className="bg-brown w-full font-bold rounded py-2 my-2 text-sm"
                onClick={() => router.push({
                  pathname: '/checkouts',
                  query: { order_id: loadedDesign._id }
              })}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
    </Home>
  );
}
