import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import router, { useRouter } from "next/router";

export default function OnBoarding(): JSX.Element {
  interface ItemType {
    title: string;
    description: string;
    image: string;
  }
  const items: ItemType[] = [
    {
      title: "Discover New Designs",
      description:
        "Emerge in a ton of designs crafted by different designers from all around the world",
      image: "/assets/images/on-boarding-discover.png",
    },
    {
      title: "Bring Your Business Online",
      description:
        "Get a free online store, sell your best designs without the need of having a physical store.",
      image: "/assets/images/brooke-lark-W1B2LpQOBxA-unsplash.jpg",
    },
    {
      title: "Vote for what you wish",
      description:
        "Create an ecommerce website backed by powerful tools that help you find customers.",
      image: "/assets/images/on-boarding-vote-001.png",
    },
    {
      title: "Vote for what you wish",
      description:
        "Create an ecommerce website backed by powerful tools that help you find customers.",
      image: "/assets/images/on-boarding-vote-002.png",
    },
  ];
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const handleNext: Function = () => {
    if (currentSlide < items.length - 1) setCurrentSlide(currentSlide + 1);
    else router.push("/login");
  };

  const handleSkip: Function = () => {
    router.push("/login");
  };

  return (
    <div className="bg-primary w-full h-screen p-6">
      <div className="flex items-center justify-center">
        <div>
          <Image src="/assets/images/Logo.png" width={90} height={70} alt="logo" />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div>
          <Image
            src={items[currentSlide].image}
            height={300}
            width={300}
            alt="onbording image"
          />
        </div>
      </div>

      <div className="flex items-center justify-center text-white text-lg font-semibold">
        <p className="text-center">{items[currentSlide].title}</p>
      </div>

      <div className="flex items-center justify-center text-gray-200 mt-6 mx-4">
        <p className="text-center">{items[currentSlide].description}</p>
      </div>

      <div className="flex items-center justify-center mt-6">
        {items.map((item: Object, index: number) =>
          currentSlide === index ? (
            <p
              key={index}
              className="bg-white border-1 border-white rounded mx-2 w-4 h-2"
            />
          ) : (
            <p
              key={index}
              className="bg-transparent border-2 border-white rounded mx-2 w-2 h-2"
              onClick={() => setCurrentSlide(index)}
            />
          )
        )}
      </div>
      <div className="flex flex-row justify-center item-center mx-4 mt-6 ">
        <div
          className="bg-primary border-white border-2 border-white text-white mr-6 w-1/2 py-2 rounded"
          onClick={() => handleSkip()}
        >
          <p className="text-center">Skip</p>
        </div>
        <div
          className="bg-white text-primary w-1/2 py-2 rounded "
          onClick={() => handleNext()}
        >
          <p className="text-center">next</p>
        </div>
      </div>
    </div>
  );
}
