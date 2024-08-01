import React from "react";
import { LoginButton } from "@/SVGS";

const TopBar = ({ }) => {
  return (
<div className="fixed  w-full h-[40px] bg-white border-b border-solid border-[#cbcbcb] relative box-border  ">
  <div className=" items-center gap-[5px] absolute top-[50%] left-[13px] transform -translate-y-1/2">
    <div className=" items-center space-x-2 [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-black text-[12px] tracking-[0] leading-[normal] whitespace-nowrap">
      <a href="https://digitalzentrum-franken.de/" target="_blank"><img className="max-h-12" src="MD_zentrum_Franken.png" alt="MD Zentrum Franken" /></a>
    </div>
  </div>
  <div className="absolute w-[16px] h-[18px] top-[50%] right-[25px] transform -translate-y-1/2">
    <div className="relative w-[18px] h-[20px]">
      <div className="cursor-pointer absolute w-[18px] h-[14px] top-[6px] left-0 rounded-[4px] border border-solid border-[#da3a33]" />
      <LoginButton />
    </div>
  </div>
</div>



  );
};



export default TopBar;