import React from "react";
import { LoginButton } from "@/SVGS";

const Footer = ({ }) => {
  return (
<div className="sticky top-[100vh]  w-full h-[50px] ">
  <div className=" top-[50%] ml-10 transform -translate-y-1/2">
    <div className=" tracking-[0] leading-[normal] whitespace-nowrap">
      <a href="https://www.bmwk.de/Navigation/DE/Home/home.html" target="_blank"><img className="max-h-[70px]" src="footer_mdz.png" alt="MD Zentrum Franken" /></a>
    </div>
  </div>
  <div className="absolute top-[10%] right-[25px] transform -translate-y-1/2">
   
    
      <a href="https://www.mittelstand-digital.de/MD/Navigation/DE/Home/home.html" target="_blank"><img className="max-h-[150px] mb-[100px] " src="footer_gefrdert_durch.png" alt="MD Zentrum Franken" /></a>
   
  </div>
</div>



  );
};



export default Footer;