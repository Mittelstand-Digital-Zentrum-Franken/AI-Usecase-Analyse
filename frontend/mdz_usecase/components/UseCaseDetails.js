import React, { useState, useRef, useEffect } from "react";
import { EditButton, DeleteButton } from "@/SVGS";
import ValueScoreCard from "./ValueScoreCard";
import ImplementationScoreCard from "./ImplementationScoreCard";

const UseCaseDetails = ({ useCase, updateUseCases }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null); // State to determine which component to display
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: useCase.name,
    description: useCase.description,
    risks: useCase.risks,
    bigRisk: useCase.bigRisk || false, // Add bigRisk to the initial state
  });

  const modalRef = useRef(); // Ref for the modal container

  const handleDeleteClick = async (usecase_id) => {
    try {
      const response = await fetch(`/api/usecase?usecase_id=${usecase_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      updateUseCases();
    } catch (error) {
      console.error("Error deleting organization:", error);
    }
  };

  const openModal = (content) => {
    setIsModalOpen(true);
    setModalContent(content); // Set the content to be displayed in the modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null); // Reset the modal content
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`/api/usecase?usecase_id=${useCase.usecase_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      updateUseCases();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating use case:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleRiskChange = (index, value) => {
    const updatedRisks = [...editedData.risks];
    updatedRisks[index] = value;
    setEditedData({ ...editedData, risks: updatedRisks });
  };

  const handleCheckboxChange = (e) => {
    setEditedData({ ...editedData, bigRisk: e.target.checked });
  };

  const handleAddRisk = () => {
    setEditedData({ ...editedData, risks: [...editedData.risks, ""] });
  };

  const handleDeleteRisk = (index) => {
    const updatedRisks = editedData.risks.filter((_, i) => i !== index);
    setEditedData({ ...editedData, risks: updatedRisks });
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
    <div className="flex flex-col w-[456px] items-start justify-around gap-4 p-12 relative bg-white-ffffff overflow-y-auto">
      <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto] max-h-[700px]">
        <div className="relative self-stretch w-full">
          <div className="relative w-[360px] rounded-lg">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#bdbdbd]">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editedData.name}
                  onChange={handleInputChange}
                  className="font-title font-semibold text-[#da3a33] text-lg tracking-[var(--title-letter-spacing)] leading-[var(--title-line-height)] border border-gray-300 p-2"
                />
              ) : (
                <div className="font-title font-semibold text-[#da3a33] text-lg tracking-[var(--title-letter-spacing)] leading-[var(--title-line-height)]">
                  {useCase.name}
                </div>
              )}
              <div className="flex gap-2">
                <span className="cursor-pointer" onClick={(e) => { e.stopPropagation(); handleEditClick(); }}>
                  <EditButton />
                </span>
                <span className="cursor-pointer" onClick={(e) => { e.stopPropagation(); handleDeleteClick(useCase.usecase_id); }}>
                  <DeleteButton />
                </span>
              </div>
            </div>
            <div className="flex items-start justify-between pl-4 pr-2 py-2 mb-4 rounded-md">
              <div className="flex flex-col w-full">
                <div className="text-[#252525] font-semibold mb-2 text-[14px]">Beschreibung</div>
                {isEditing ? (
                  <textarea
                    name="description"
                    value={editedData.description}
                    onChange={handleInputChange}
                    className="text-[#252525] font-placeholder-value font-medium text-black-500-808080 text-sm tracking-[var(--placeholder-value-letter-spacing)] leading-[var(--placeholder-value-line-height)] border border-gray-300 p-2"
                  />
                ) : (
                  <div className="text-[#252525] font-placeholder-value font-medium text-black-500-808080 text-sm tracking-[var(--placeholder-value-letter-spacing)] leading-[var(--placeholder-value-line-height)]">
                    {useCase.description}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-start justify-between pl-4 pr-2 py-2 mb-4 rounded-md">
              <div className="text-[#252525] font-semibold mb-2 text-[14px]">Risiken</div>
              {isEditing ? (
                editedData.risks.map((risk, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      name={`risk_${index}`}
                      value={risk}
                      onChange={(e) => handleRiskChange(index, e.target.value)}
                      className="inline-flex items-center gap-px flex-[0_0_auto] text-[#252525] font-placeholder-value font-medium text-black-500-808080 text-sm tracking-[var(--placeholder-value-letter-spacing)] leading-[var(--placeholder-value-line-height)] whitespace-nowrap border border-gray-300 p-2"
                    />
                    <button
                      onClick={() => handleDeleteRisk(index)}
                      className="text-black text-[12px] border-2 border-black rounded-full ml-2 p-2 hover:text-sky-500 cursor:pointer hover:border-sky-500"
                    >
                      -
                    </button>
                  </div>
                ))
              ) : (
                useCase.risks.map((risk, index) => (
                  <div key={index} className="mb-2 inline-flex items-center gap-px flex-[0_0_auto]">
                    <div className="text-[#252525] font-placeholder-value font-medium text-black-500-808080 text-sm tracking-[var(--placeholder-value-letter-spacing)] leading-[var(--placeholder-value-line-height)] whitespace-nowrap">
                      - {risk}
                    </div>
                  </div>
                ))
              )}
              {isEditing && (
                <button
                  onClick={handleAddRisk}
                  className="text-black text-[12px] border-2 border-black rounded-full px-4 py-2 hover:text-sky-500 cursor:pointer hover:border-sky-500"
                >
                  + Risiko
                </button>
              )}
            </div>
            {isEditing && (
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="bigRisk"
                  checked={editedData.bigRisk}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor="bigRisk" className="text-neutral-600">Außerordentliches Risiko vorhanden</label>
              </div>
            )}
            <div className="w-full h-[30px] mb-4 border-b border-[#bdbdbd]">
              <div className="font-semibold text-[#252525] text-lg">Evaluierung</div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="col-span-2">
                <div className="flex justify-between mt-2">
                  <div className="font-normal text-[#252525] text-base leading-7">Value Score</div>
                  <div className="font-bold text-[#252525] text-base text-right leading-7 border border-[#bdbdbd] pl-2 pr-2">
                    {useCase.value_score}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div
                  className="cursor-pointer hover:bg-sky-700 px-6 py-2.5 bg-[#dad433] rounded-md"
                  onClick={() =>
                    openModal(
                      <ValueScoreCard
                        useCase={useCase}
                        setIsModalOpen={setIsModalOpen}
                        updateUseCases={updateUseCases}
                      />
                    )
                  }
                >
                  <div className="text-[#efefef] font-bold text-white-ffffff text-xs text-center leading-5">
                    Bewerten
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex justify-between mt-2">
                  <div className="font-normal text-[#252525] text-base leading-7">Implementation Score</div>
                  <div className="font-bold text-[#252525] text-base text-right leading-7 border border-[#bdbdbd] pl-2 pr-2">
                    {useCase.implementation_score}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div
                  className="cursor-pointer hover:bg-sky-700 px-6 py-2.5 bg-[#dad433] rounded-md"
                  onClick={() =>
                    openModal(
                      <ImplementationScoreCard
                        useCase={useCase}
                        setIsModalOpen={setIsModalOpen}
                        updateUseCases={updateUseCases}
                      />
                    )
                  }
                >
                  <div className="text-[#efefef] font-bold text-white-ffffff text-xs text-center leading-5">
                    Bewerten
                  </div>
                </div>
              </div>
            </div>
            {isEditing && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleSaveClick}
                  className="flex flex-col items-center justify-center px-6 py-2.5 w-full bg-[#da3a33] rounded-md hover:bg-sky-700 text-white"
                >
                  Speichern
                </button>
              </div>
            )}
            <div className="w-full h-px bg-black-100-e5e5e5" />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-25 z-40"></div>
          <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center pointer-events-none">
            {/* Modal container */}
            <div ref={modalRef} className="bg-white rounded-lg p-6 shadow-lg pointer-events-auto">
              {modalContent}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UseCaseDetails;
