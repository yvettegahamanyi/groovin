/* eslint-disable @next/next/no-img-element */
import { SettingOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BrownButton } from "../../components/buttons/BrownButton";
import { OrangeButton } from "../../components/buttons/OrangeButton";

import { AppContext } from "../../components/context/GlobalContext";
import Designs from "../../components/sections/Designs";
import { Home } from "../../layouts/Home";
import { Api } from "../../pages/api/service/Api";
import { EbackendEndpoints, EhttpMethod } from "../../util/enums";
import { getUserProfileAlphabets } from "../../util/profileLetters";
import { DesignType, ToastProps } from "../../util/types";

export default function Profile(): JSX.Element {
  const { user, setToken } = useContext(AppContext);
  const [userDesigns, setUserDesigns] = useState<DesignType[]>([]);
  const [votes, setVotes] = useState<number>(0);
  const [orders, setOrders] = useState<number>(0);
  const [errortext, setErrortext] = useState<string>("");
  const [{ status, message }, setStatus] = useState<ToastProps>({
    status: "",
    message: "",
  });

  useEffect(() => {
    const fetchDesigns = async () => {
      await new Api()
        .connect(EbackendEndpoints.GET_DESIGNS, EhttpMethod.GET)
        .then(
          (response) => {
            if (response.success === true) {
              var numberOfVotes: number = 0;
              var totalDesigns = response.data.docs;
              for (const key in totalDesigns) {
                if(totalDesigns[key].designer_id === null){
                  break;
                }
                if (totalDesigns[key].designer_id._id === user?._id) {
                  userDesigns.push(totalDesigns[key]);
                  numberOfVotes =
                    numberOfVotes + totalDesigns[key].votes.length;
                }
              }
              setVotes(numberOfVotes);
            } else
              setStatus({ status: "error", message: "something went wrong" });
            setTimeout(() => {
              setStatus({ status: "", message: "" });
            }, 1000);
          },
          (error) => {
            // setStatus({status:"error",message:error.message});
            setErrortext("Invalid username or password");
          }
        );
    };

    const fetchOrders = async () => {
      await new Api()
        .connect(EbackendEndpoints.GET_ORDER_BY_CUSTOMERID+user?._id, EhttpMethod.GET)
        .then(
          (response) => {
            if (response.success === true) {
              setOrders(response.data.totalDocs);
            } else
              setStatus({ status: "error", message: "something went wrong" });
            setTimeout(() => {
              setStatus({ status: "", message: "" });
            }, 1000);
          },
          (error) => {
            // setStatus({status:"error",message:error.message});
            setErrortext("Invalid username or password");
          }
        );
    };

    fetchOrders();
    fetchDesigns();
  }, [user?._id, userDesigns]);

  const router = useRouter();
  const logout = () => {
    console.log("here we are");
    router.push("/login");
    localStorage.clear();
    if (setToken) {
      setToken("");
    }
  };


const profileAlpha = getUserProfileAlphabets(user?.name!);
function navigateToOrderTracker(){
  router.push("/orders/track")
}
  return (
    <Home>
      {user ? (
        <>
          <div className="w-full profile--banner mb-5 flex items-center px-3 relative">
            <div className="w-full flex justify-center pt-12">
              <div>
                {/* <img
                  src="./profile_pic.png"
                  alt=""
                  className="mt-36 mx-auto mb-1 object-cover w-36 h-36  rounded-full"
                /> */}
                <div className="mt-36 mx-auto w-36 h-36 bg-gray-200 rounded-full flex items-stretch">
                 <p className="self-center text-7xl mx-auto"> {profileAlpha}</p>
                </div>
                <div className="text-xs text-center">
                  <span className="font-bold">@{user.username}</span> <br />
                  <span className="font-bold text-sm mt-3 block">
                    {user.name}
                  </span>
                  <span className="block">E-mail: {user.email}</span>
                </div>
              </div>
            </div>

            <div className="absolute w-9 h-9 bg-black text-white rounded-full flex items-center justify-center right-5 top-5  ">
              <SettingOutlined />
            </div>

            <div className="absolute top-20 mt-20 left-5">
              <BrownButton title="Logout" action={logout} />
            </div>
            <div className="absolute top-20 mt-20 right-5">
              <OrangeButton title="Track Order" action={navigateToOrderTracker} />
            </div>
          </div>
          <div className="p-5 relative top-32 text-sm">
            <div className="font-bold flex justify-between my-5 text-sm">
              <span>{userDesigns.length} Designs</span>
              <span>{votes} Votes</span>
              <span>{orders} Orders</span>
            </div>

            {/* my Orders */}
            <div>
              <h1 className="font-bold my-3">My Orders</h1>
              <Designs small={true} />
            </div>

            {/* posted designs */}

            <div>
              <h1 className="font-bold my-3">Posted Designs</h1>
              <Designs small={true} designs={userDesigns} />
            </div>
            {/* Recently purchased products */}

            <div>
              <h1 className="font-bold my-3">
                Recently purchased products
              </h1>
              <div className="mb-20">
                <Designs small={false} grid />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </Home>
  );
}
