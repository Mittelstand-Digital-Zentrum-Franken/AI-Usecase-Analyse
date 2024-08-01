import React from "react";
import { Button } from "./Button";
import { Chart } from "./Chart";
import { TopBar } from "./TopBar";
import { UsecaseCard } from "./UsecaseCard";

export const Box = () => {
  return (
    <div className="w-[1361px] h-[946px]">
      <div className="fixed w-[1363px] h-[946px] top-0 left-0">
        <div className="relative w-[1361px] h-[946px] bg-white">
          <div className="absolute w-[1361px] h-[40px] top-0 left-0">
            <TopBar
              className="!shadow-[0px_4px_4px_#00000040] !absolute !left-0 !top-0"
              line="image.svg"
              rectangle="rectangle-4-2.svg"
            />
            <Button
              addStyleOverrideClassName="!relative !w-[16px] !h-[16px] !mt-[-3.00px] !mb-[-3.00px] !ml-[-6.00px] !mr-[-6.00px]"
              className="!h-[22px] !flex !absolute !left-[1272px] !bg-black !w-[28px] !top-[9px]"
              hasDiv={false}
              icon
              iconType="left"
              stateProp="hover"
              type="primary"
            />
          </div>
          <div className="absolute w-[1361px] h-[498px] top-[40px] left-0 bg-[#da3a33] rounded-[0px_0px_15px_15px] shadow-[0px_4px_4px_#00000040]">
            <Chart className="!left-[239px] !top-[48px]" group="image.png" vector="vector-50-2.svg" />
          </div>
          <div className="absolute w-[788px] top-[569px] left-[47px] [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-[#e33b32] text-[24px] tracking-[0] leading-[normal]">
            Ideensammlung und Bewertung
          </div>
          <UsecaseCard
            className="!h-[222px] !absolute !left-[47px] !bg-[#da3a3340] !w-[278px] !top-[628px]"
            elementClassName="!mr-[-95.00px]"
            elementClassNameOverride="!mr-[-95.00px]"
            frameClassName="!mt-[-15.50px] !mb-[-15.50px]"
          />
        </div>
      </div>
    </div>
  );
};
