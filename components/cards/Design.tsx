/* eslint-disable @next/next/no-img-element */
import { MoreOutlined } from "@ant-design/icons";
import { useState } from "react";
import { IDesignProps } from "../../util/types";
import { BrownButton } from "../buttons/BrownButton";
import { Product } from "./Product";

export function Design(props: IDesignProps): JSX.Element {
  const [designModal, handleDesignModel] = useState(false);
  return (
    <div className={`${designModal && "modal"}`}>
      {!designModal && props.design ? (
        <div className="mb-5" onClick={() => handleDesignModel(true)}>
          <div className="">
            <div className=" my-1 border rounded-md bg-gray-200 relative">
              <img
                src={props.design.images![0]}
                alt="Product"
                className={`${props.small === true ? "--lg-img" : "-lg-img"}`}
              />

              {props.hasMore && (
                <div>
                  <MoreOutlined className="text-lg top-0 absolute right-0" />
                </div>
              )}
            </div>

            <div
              className={`text-xs w-full ${
                props.hasActions ? "grid grid-cols-2 " : "text-center"
              }`}
            >
              <span className="font-bold">{props.design.name}</span>
              {props.hasActions && (
                <div className="flex justify-end">
                  <span className="text-gray-500">10/11/2021</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="modal-content min-h-full mt-10 rounded-tl-3xl rounded-tr-3xl p-4">
          <div className="grid grid-cols-2 items-center mb-5">
            <h1 className="font-bold">Post Design</h1>
            <div className="flex justify-end text-sm">
              <span
                className="cursor-pointer"
                onClick={() => handleDesignModel(false)}
              >
                Cancel
              </span>
            </div>
          </div>
          {/* <Product /> */}

          <BrownButton title="Publish" />
        </div>
      )}
    </div>
  );
}
