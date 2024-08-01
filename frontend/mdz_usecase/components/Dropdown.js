import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";

const DropdownMenu = ({ option, visibleOption, text = "Select an option", vector = "vector-142.svg" }) => {
  const [state, dispatch] = useReducer(reducer, {
    option: option || "no",
    visibleOption: visibleOption || false,
  });

  return (
    <div
      className="border border-solid border-[#cbcbcb] w-[209px] flex items-center px-5 py-3.5 h-[25px] rounded-md justify-between bg-white relative"
      onClick={() => {
        dispatch("click");
      }}
    >
      <div
        className={`[font-family:'Inter-Regular',Helvetica] mt-[-10.00px] tracking-[0] text-xs text-[#464f60] relative font-normal mb-[-8.00px] leading-[normal] ${
          state.visibleOption && state.option === "five"
            ? "w-[122px]"
            : !state.visibleOption && state.option === "five"
            ? "w-[114px]"
            : "w-[105px]"
        }`}
      >
        {state.option === "one" && <>0</>}

        {state.option === "two" && <p>1</p>}

        {state.option === "three" && <>2</>}

        {state.option === "four" && <>3</>}

        {state.option === "five" && <>4</>}

        {state.option === "six" && <>5</>}

        {["default", "no"].includes(state.option) && <>{text}</>}
      </div>
      <img
        className={`w-[12.18px] mr-[-0.59px] h-[6.05px] relative ${
          state.visibleOption ? "mt-[-4.74px]" : "mt-[-4.31px]"
        } ${state.visibleOption ? "mb-[-4.31px]" : "mb-[-4.74px]"}`}
        alt="Vector"
        src={
          state.option === "no"
            ? vector
            : !state.visibleOption && state.option === "two"
            ? "vector-142-3.svg"
            : !state.visibleOption && state.option === "three"
            ? "vector-142-5.svg"
            : !state.visibleOption && state.option === "four"
            ? "vector-142-7.svg"
            : !state.visibleOption && state.option === "five"
            ? "vector-142-9.svg"
            : state.option === "one" && state.visibleOption
            ? "vector-142-2.svg"
            : state.visibleOption && state.option === "two"
            ? "vector-142-4.svg"
            : state.visibleOption && state.option === "three"
            ? "vector-142-6.svg"
            : state.option === "four" && state.visibleOption
            ? "vector-142-8.svg"
            : state.visibleOption && state.option === "five"
            ? "vector-142-10.svg"
            : state.option === "default"
            ? "vector-142-11.svg"
            : "image.svg"
        }
      />
      {state.visibleOption && (
        <div
          className={`border border-solid border-[#cbcbcb] w-[209px] flex left-0 flex-col items-start p-1.5 rounded-xl bg-white absolute ${
            ["five", "four", "one", "three", "two"].includes(state.option)
              ? "top-[33px]"
              : state.option === "default"
              ? "top-[31px]"
              : ""
          }`}
        >
          <div
            className={`w-full flex self-stretch flex-col items-start gap-2.5 px-5 py-2 h-[35.2px] justify-center bg-white relative ${
              state.option === "one" ? "border-black" : ""
            } ${state.option === "one" ? "border-l" : ""} ${state.option === "one" ? "[border-left-style:solid]" : ""}`}
          >
            <div className="[font-family:'Inter-Regular',Helvetica] self-stretch tracking-[0] text-xs text-[#464f60] font-normal leading-[normal] relative">
              0
            </div>
          </div>
          <div
            className={`w-full flex self-stretch flex-col items-start gap-2.5 px-5 py-2 h-[35.2px] justify-center bg-white relative ${
              state.option === "two" ? "border-black" : ""
            } ${state.option === "two" ? "border-l" : ""} ${state.option === "two" ? "[border-left-style:solid]" : ""}`}
          >
            <p className="[font-family:'Inter-Regular',Helvetica] self-stretch tracking-[0] text-xs text-[#464f60] font-normal leading-[normal] relative">
              1
            </p>
          </div>
          <div
            className={`w-full flex self-stretch flex-col items-start gap-2.5 px-5 py-2 h-[35.2px] justify-center bg-white relative ${
              state.option === "three" ? "border-black" : ""
            } ${state.option === "three" ? "border-l" : ""} ${
              state.option === "three" ? "[border-left-style:solid]" : ""
            }`}
          >
            <div className="[font-family:'Inter-Regular',Helvetica] self-stretch tracking-[0] text-xs text-[#464f60] font-normal leading-[normal] relative">
              2
            </div>
          </div>
          <div
            className={`w-full flex self-stretch flex-col items-start gap-2.5 px-5 py-2 h-[35.2px] justify-center bg-white relative ${
              state.option === "four" ? "border-black" : ""
            } ${state.option === "four" ? "border-l" : ""} ${
              state.option === "four" ? "[border-left-style:solid]" : ""
            }`}
          >
            <div className="[font-family:'Inter-Regular',Helvetica] self-stretch tracking-[0] text-xs text-[#464f60] font-normal leading-[normal] relative">
              3
            </div>
          </div>
          <div
            className={`w-full flex self-stretch flex-col items-start gap-2.5 px-5 py-2 h-[35.2px] justify-center bg-white relative ${
              state.option === "five" ? "border-black" : ""
            } ${state.option === "five" ? "border-l" : ""} ${
              state.option === "five" ? "[border-left-style:solid]" : ""
            }`}
          >
            <div className="[font-family:'Inter-Regular',Helvetica] self-stretch tracking-[0] text-xs text-[#464f60] font-normal leading-[normal] relative">
              4
            </div>
          </div>
          <div
            className={`w-full flex self-stretch flex-col items-start gap-2.5 px-5 py-2 h-[35.2px] justify-center bg-white relative ${
              state.option === "six" ? "border-black" : ""
            } ${state.option === "six" ? "border-l" : ""} ${
              state.option === "six" ? "[border-left-style:solid]" : ""
            }`}
          >
            <div className="[font-family:'Inter-Regular',Helvetica] self-stretch tracking-[0] text-xs text-[#464f60] font-normal leading-[normal] relative">
              5
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function reducer(state, action) {
  if (state.option === "no" && state.visibleOption === false) {
    switch (action) {
      case "click":
        return {
          option: "default",
          visibleOption: true,
        };
    }
  }

  if (state.option === "one" && state.visibleOption === false) {
    switch (action) {
      case "click":
        return {
          option: "one",
          visibleOption: true,
        };
    }
  }

  if (state.option === "one" && state.visibleOption === true) {
    switch (action) {
      case "click":
        return {
          option: "one",
          visibleOption: false,
        };
    }
  }

  if (state.option === "two" && state.visibleOption === false) {
    switch (action) {
      case "click":
        return {
          option: "two",
          visibleOption: true,
        };
    }
  }

  if (state.option === "two" && state.visibleOption === true) {
    switch (action) {
      case "click":
        return {
          option: "two",
          visibleOption: false,
        };
    }
  }

  if (state.option === "three" && state.visibleOption === false) {
    switch (action) {
      case "click":
        return {
          option: "three",
          visibleOption: true,
        };
    }
  }

  if (state.option === "three" && state.visibleOption === true) {
    switch (action) {
      case "click":
        return {
          option: "three",
          visibleOption: false,
        };
    }
  }

  if (state.option === "four" && state.visibleOption === false) {
    switch (action) {
      case "click":
        return {
          option: "four",
          visibleOption: true,
        };
    }
  }

  if (state.option === "four" && state.visibleOption === true) {
    switch (action) {
      case "click":
        return {
          option: "four",
          visibleOption: false,
        };
    }
  }

  if (state.option === "five" && state.visibleOption === false) {
    switch (action) {
      case "click":
        return {
          option: "five",
          visibleOption: true,
        };
    }
  }

  if (state.option === "five" && state.visibleOption === true) {
    switch (action) {
      case "click":
        return {
          option: "five",
          visibleOption: false,
        };
    }
  }

  if (state.option === "six" && state.visibleOption === false) {
    switch (action) {
      case "click":
        return {
          option: "six",
          visibleOption: true,
        };
    }
  }

  if (state.option === "six" && state.visibleOption === true) {
    switch (action) {
      case "click":
        return {
          option: "six",
          visibleOption: false,
        };
    }
  }

  if (state.option === "default" && state.visibleOption === true) {
    switch (action) {
      case "click":
        return {
          option: "no",
          visibleOption: false,
        };
    }
  }

  return state;
}

DropdownMenu.propTypes = {
  option: PropTypes.oneOf(["default", "no", "two", "three", "four", "one", "five","six"]),
  visibleOption: PropTypes.bool,
  text: PropTypes.string,
  vector: PropTypes.string,
};


export default DropdownMenu;