import React, { useState } from "react";

const CreateOrgCard = ({ setShowCreateOrgCard, fetchOrganizations }) => {
  const [name, setName] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);

  const handleInputChange = (event) => {
    setName(event.target.value);
    setIsNameValid(true); // Reset validity when the user starts typing
  };

  const handleSubmit = async () => {
    if (name.trim() === "") {
      setIsNameValid(false);
      return;
    }

    try {
      const response = await fetch("/api/org", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Organization created:", data);
    } catch (error) {
      console.error("Error creating organization:", error);
    }
    setShowCreateOrgCard(false);
    fetchOrganizations();
  };

  return (
    <div className="flex flex-col w-[456px] h-[374px] items-start justify-around gap-[228px] p-[48px] relative bg-white-ffffff rounded-[15px]">
      <div className="flex flex-col items-start gap-[48px] relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-center gap-[24px] relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex flex-col items-start gap-[32px] relative self-stretch w-full flex-[0_0_auto] rounded-[8px]">
            <div className="flex flex-col items-start gap-[24px] relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative self-stretch mt-[-1.00px] font-title font-[number:var(--title-font-weight)] text-[#da3a33] text-[length:var(--title-font-size)] tracking-[var(--title-letter-spacing)] leading-[var(--title-line-height)] [font-style:var(--title-font-style)]">
                Organisation erstellen
              </div>
              <div className="flex flex-col items-start gap-[20px] relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col items-start gap-[16px] relative self-stretch w-full flex-[0_0_auto]">
                  <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                    <div className="gap-[8px] flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                      <div className="relative self-stretch w-full flex-[0_0_auto]" />
                      <div className={`relative self-stretch w-full h-[48px] ${isNameValid ? 'bg-black-50-f2f2f2' : 'bg-red-50'} rounded-[6px] border-[0.5px] border-solid ${isNameValid ? 'border-black-100-e5e5e5' : 'border-red-500'}`}>
                        <div className="flex w-[360px] items-center justify-between pl-[16px] pr-[8px] py-[8px] relative rounded-[6px]">
                          <div className="inline-flex flex-col items-start justify-center relative flex-[0_0_auto] w-full">
                            <input
                              className="w-full h-[48px] bg-transparent outline-none text-black"
                              type="text"
                              placeholder="Name eingeben..."
                              value={name}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="inline-flex items-start gap-[16px] p-[8px] relative flex-[0_0_auto] opacity-0">
                            <div className="relative w-[16px] h-[16px]">
                              <div className="inline-flex items-start gap-[10px] p-[5px] relative bg-black-700-4d4d4d rounded-[8px]">
                                <img
                                  className="relative w-[6px] h-[6px] mb-[-3632.00px] mr-[-1421.00px]"
                                  alt="Union"
                                  src="union.svg"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {!isNameValid && (
                        <div className="text-red-500 text-sm mt-1">
                          Name is required.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="cursor-pointer hover:bg-sky-700 flex flex-col items-center justify-center px-[24px] py-[10px] relative self-stretch w-full flex-[0_0_auto] bg-[#da3a33] rounded-[6px]"
              onClick={handleSubmit}
            >
              <div className="relative w-fit mt-[-1.00px] font-button-label font-[number:var(--button-label-font-weight)] text-white-ffffff text-[length:var(--button-label-font-size)] text-center tracking-[var(--button-label-letter-spacing)] leading-[var(--button-label-line-height)] whitespace-nowrap [font-style:var(--button-label-font-style)]">
                Erstellen
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrgCard;
