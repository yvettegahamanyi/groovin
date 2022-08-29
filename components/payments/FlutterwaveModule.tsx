import {
  useFlutterwave,
  FlutterWaveButton,
  closePaymentModal,
} from "flutterwave-react-v3";
import { useContext } from "react";
import { AppContext } from "../context/GlobalContext";
export default function FlutterwaveModule(props:{total_amount:number}) {

  const {user} = useContext(AppContext)
  const config: any = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: props.total_amount,
    currency: "RWF",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: user?.email,
      phonenumber: user?.phoneNumber,
      name: user?.name,
    },

    customizations: {
      title: "My store",
      description: "Payment for items in cart",
      logo: "https://res.cloudinary.com/ddhssri3t/image/upload/v1638569768/groovinx/logo_lbv6j0.png",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave btn",
    callback: (response: any) => {
      console.log(response);
      closePaymentModal();
    },
    onClose: () => {
      console.log("You close me ooo");
    },
  };
  return (
    <div>
      <button
      className="w-full text-black font-bold px-3 py-2 bg-brown rounded-md text-sm"
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
              closePaymentModal();
            },
            onClose: () => {
              // console.log("You close me ooo");
            },
          });
        }}
      >
        Pay now
      </button>

      {/* <FlutterWaveButton {...fwConfig} /> */}
    </div>
  );
}
