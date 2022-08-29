import{ useEffect } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/onboarding");
    }, 5000);
  });

  return (
    <div>
      <div className="bg-primary w-full h-screen flex items-center justify-center text-blue-500">
        <div>
          <Image src="/assets/images/Logo.png" width={100} height={80} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default Home;
