import Button from "@/components/Common/Button";
import Heading from "@/components/Common/Heading";
import React from "react";

export default function page() {
  return (
    <div className="w-full p-16 flex flex-col">
      <div className="w-full flex justify-between items-center">
        <Button title={"Add User"} className={"m-0"} />
        <Heading heading={"All Users"} />
      </div>
    </div>
  );
}
