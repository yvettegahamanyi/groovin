import { Design } from "../../components/cards/Design";
import { Home } from "../../layouts/Home";
import { useRouter } from "next/router";
import React, { useState } from "react";
import MyDesigns from "../../pages/designs/MyDesigns";
import CreatedDesigns from "../../pages/designs/CreatedDesigns";

export default function DesignSectionPage(): JSX.Element {
  const [active, setActive] = useState<string>("createdDesigns");
  const router = useRouter();
  function toggle() {
    var isactive = active;
    var newActive =
      isactive === "createdDesigns" ? "myDesigns" : "createdDesigns";
    setActive(newActive);
  }
  return (
    <Home>
      <div className="w-full banner mb-5 flex items-center px-3">
        <h1 className="text-white font-bold">
          Welcome,
          <br />
          SergeArts
        </h1>
      </div>
      <div className="flex mb-2 text-xs text-white">
        <button
          className={`mx-4 p-1 rounded ${
            active == "createdDesigns" ? `bg-black` : `bg-primary`
          }`}
          disabled={active == "createdDesigns" ? true : false}
          onClick={() => toggle()}
        >
          Create Design
        </button>
        <button
          className={`mx-4 p-1 rounded ${
            active == "myDesigns" ? `bg-black` : `bg-primary`
          }`}
          disabled={active == "myDesigns" ? true : false}
          onClick={() => toggle()}
        >
          My Design
        </button>
      </div>

      {active === "myDesigns" && <MyDesigns />}
      {active === "createdDesigns" && <CreatedDesigns />}
    </Home>
  );
}
