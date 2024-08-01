import React, { useState, useRef, useEffect } from "react";
import UseCaseDetails from "./UseCaseDetails";
import { DeleteButton } from "@/SVGS";

const UsecaseCard = ({ name, useCase, updateUseCases }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(); // Ref for the modal container

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };




  useEffect(() => {
    // Function to close modal when clicked outside
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    // Attach event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div
        className="hover:bg-red-400 cursor-pointer flex flex-col w-[200px] h-[160px] items-start justify-around gap-[28px] p-[28px] bg-red-25 rounded-[15px] mb-8 mr-8"
        onClick={openModal}
      >
        <div className="flex flex-col items-start gap-[20px] self-stretch w-full flex-[0_0_auto]">
          <div className="flex flex-col self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-col self-stretch w-full flex-[0_0_auto] rounded-[8px]">
              <div className="flex flex-col items-start gap-[2px] self-stretch w-full flex-[0_0_auto]">
                 <div className="flex justify-between items-center mt-[-1.00px] text-[#da3a33] mb-2 pb-3 border-b font-title font-bold text-lg tracking-wide leading-normal">
                 <span className="text-sm md:text-base">{name}</span>
                  
                </div>
                
                
                <div className="self-stretch w-full h-px bg-black-100-e5e5e5" />
                <div className="flex justify-between w-full">
                  <div className="text-[#252525] font-title font-medium text-base tracking-wide leading-normal">
                    Value
                  </div>
                  <div className="text-[#252525] font-title font-bold text-base tracking-wide leading-normal">
                  {useCase.value_score}
                  </div>
                </div>
                <div className="flex justify-between w-full">
                  <div className="text-[#252525] font-title font-medium text-base tracking-wide leading-normal">
                    Implementation
                  </div>
                  <div className="text-[#252525] font-title font-bold text-base tracking-wide leading-normal ">
                    {useCase.implementation_score}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-25 z-40"></div>
          <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center pointer-events-none">
            {/* Modal container */}
            <div ref={modalRef} className="bg-white rounded-lg p-6 shadow-lg pointer-events-auto">
              <UseCaseDetails useCase={useCase} updateUseCases={updateUseCases}/>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UsecaseCard;
