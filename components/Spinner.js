import React from "react";
import Spinner from "../public/spinner.gif";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="spinner">
      <Image src={Spinner} alt="로딩 아이콘" width={100} height={100} />
    </div>
  );
};

export default Loader;
