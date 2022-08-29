import React, { useContext, useState } from "react";
import { EnvironmentOutlined } from "@ant-design/icons";
import { BrownButton } from "../../components/buttons/BrownButton";
import { GrayButtonProps } from "../../components/buttons/GrayButton";
import { Address } from "../../components/cards/Address";
import { Home } from "../../layouts/Home";
import { useRouter } from "next/router";
import Order from "../../pages/checkouts/Order";
import { AppContext } from "../context/GlobalContext";
import ChangeaddressModal from "../forms/ChangeaddressModal";
import FlutterwaveModule from "../payments/FlutterwaveModule";
export default function Checkouts(): JSX.Element {
  const [addressModalVisible, setAdressModalVisible] = useState<boolean>(false);
  const { user, setToken } = useContext(AppContext);
  const order_id: string = JSON.stringify(useRouter().query.order_id);
  return (
    <Home>
      <div className="relative h-screen">
        {addressModalVisible ? (
          <div className="w-full absolute bg-black bg-opacity-50 h-screen">
            <ChangeaddressModal
              isVisible={addressModalVisible}
              setModalVisiblity={(value: boolean) => {
                setAdressModalVisible(value);
              }}
              ontouchOutSide={() => {
                setAdressModalVisible(false);
              }}
              title="+ Add Delivery Info"
              user={user}
            />
          </div>
        ) : null}
        <div className="p-3">
          {user?.city?.length !== 0 ||
          user?.country ||
          user?.postalCode ||
          user?.streetAddress ||
          user?.streetNumber ? (
            <div className="my-3">
              <div className="grid grid-cols-2 my-5 items-center text-sm">
                <h1 className="flex gap-2 items-center">
                  <EnvironmentOutlined />
                  Saved Addresses
                </h1>

                <div
                  className="flex justify-end"
                  onClick={() => {
                    setAdressModalVisible(true);
                  }}
                >
                  <GrayButtonProps title="Change Address" />
                </div>
              </div>

              <Address />
            </div>
          ) : (
            <div className="my-3">
              <div className="grid grid-cols-2 my-5 items-center text-sm">
                <h1 className="flex gap-2 items-center">
                  <EnvironmentOutlined />
                  Saved Addresses
                </h1>

                <div
                  className="flex justify-end"
                  onClick={() => {
                    setAdressModalVisible(true);
                  }}
                >
                  <GrayButtonProps title="+ add Address" />
                </div>
              </div>

              {/* <Address /> */}
            </div>
          )}

          <Order order_id={order_id} />
          {/* <BrownButton title="Place Order" /> */}
          <FlutterwaveModule total_amount = {100} />
        </div>
      </div>
    </Home>
  );
}
