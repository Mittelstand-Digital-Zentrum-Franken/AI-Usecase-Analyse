import React, { useState } from "react";

const CreateUseCaseForm = ({ selectedOrg, updateUseCases, handleClose }) => {
  const [formData, setFormData] = useState({
    org_id: selectedOrg.org_id,
    name: "",
    description: "",
    risks: [""],
    bigRisk: false,
  });
  const [isOpen, setIsOpen] = useState(true); // State to manage form visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRiskChange = (index, value) => {
    const newRisks = [...formData.risks];
    newRisks[index] = value;
    setFormData({
      ...formData,
      risks: newRisks,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      bigRisk: e.target.checked,
    });
  };

  const addRisk = () => {
    setFormData({
      ...formData,
      risks: [...formData.risks, ""],
    });
  };

  const removeRisk = (index) => {
    const newRisks = formData.risks.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      risks: newRisks,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const response = await fetch("/api/usecase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          org_id: formData.org_id,
          name: formData.name,
          desc: formData.description,
          risks: formData.risks,
          bigRisk: formData.bigRisk,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create use case");
      }

      const data = await response.json();
      console.log("Response Data:", data);
      updateUseCases();
      setIsOpen(false); // Close the form
      handleClose();

      // You can handle the response data here
    } catch (error) {
      console.error("Error:", error);
      // Handle error here
    }
  };

  if (!isOpen) {
    return null; // Return null if form is closed
  }

  return (
    <form className="flex flex-col w-[456px] p-12 relative bg-white rounded-md shadow-lg" onSubmit={handleSubmit}>
      <div className="flex flex-col items-start gap-6 relative w-full">
        <div className="font-title text-[#da3a33] text-xl tracking-wide leading-tight">
          Usecase erstellen
        </div>
        <div className="flex flex-col items-start gap-4 w-full">
          <div className="w-full">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded-md text-neutral-600"
              required
            />
          </div>
        </div>
        <div className="w-full h-24">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Beschreibung"
            className="w-full h-full p-2 border border-gray-300 rounded-md resize-none text-neutral-600"
            required
          />
        </div>
        <div className="flex flex-col items-start gap-4 w-full">
          {formData.risks.map((risk, index) => (
            <div key={index} className="flex items-center gap-2 w-full">
              <input
                placeholder="Risiken"
                type="text"
                value={risk}
                onChange={(e) => handleRiskChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-neutral-600"
              />
              <button
                type="button"
                onClick={() => removeRisk(index)}
                className="text-black text-[12px] border-2 border-black rounded-full p-2 hover:text-sky-500 cursor:pointer hover:border-sky-500"
              >
                <span>-</span>
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addRisk}
            className="text-black text-[12px] border-2 border-black rounded-full px-4 py-2 hover:text-sky-500 cursor:pointer hover:border-sky-500"
          >
            <span>+ Risiko</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="bigRisk"
            value={formData.bigRisk}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="bigRisk" className="text-neutral-600">Außerordentliches Risiko vorhanden</label>
        </div>
        <div className="flex flex-col items-center justify-center px-6 py-2.5 w-full bg-[#da3a33] rounded-md hover:bg-sky-700">
          <button type="submit" className="text-white">
            Erstellen
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateUseCaseForm;
