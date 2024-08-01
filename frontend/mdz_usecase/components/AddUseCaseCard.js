import React, { useState, useRef, useEffect } from "react";
import CreateUseCaseForm from "./CreateUseCaseForm";

const AddUsecaseCard = ({ selectedOrg, updateUseCases }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className="hover:bg-sky-700 cursor-pointer flex flex-col w-[200px] h-[160px] items-start justify-around gap-[28px] p-[28px]  bg-[#DB3A33] rounded-[15px] mb-8 mr-8"
        onClick={handleClick}
      >
        <div className={`flex flex-col items-start gap-[20px]  self-stretch w-full flex-[0_0_auto]`}>
          <div className="flex flex-col  self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-col  self-stretch w-full flex-[0_0_auto] rounded-[8px]">
              <div className="text-[#ffffff] text-center flex flex-col items-start gap-[2px]  self-stretch w-full flex-[0_0_auto]">
                Usecase erstellen
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-25 z-50 flex justify-center items-center">
          <div ref={modalRef} className="bg-white rounded-lg p-6 shadow-lg relative">
            <button className="absolute top-2 right-2 text-black" onClick={handleClose}>&times;</button>
            <CreateUseCaseForm selectedOrg={selectedOrg} updateUseCases={updateUseCases} handleClose={handleClose} />
          </div>
        </div>
      )}
    </>
  );
};

export default AddUsecaseCard;
