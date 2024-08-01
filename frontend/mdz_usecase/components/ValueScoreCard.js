import React, { useState, useEffect } from "react";

const ValueScoreCard = ({ useCase, setIsModalOpen, updateUseCases }) => {
  const [alignment, setAlignment] = useState(1);
  const [savings, setSavings] = useState(0);
  const [advantages, setAdvantages] = useState(
    useCase?.advantages?.map((adv) => ({ name: adv, value: 1 })) || []
  );

  useEffect(() => {
    const fetchExistingScore = async () => {
      try {
        const url = `/api/valuescore?usecase_id=${useCase.usecase_id}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        data = data.data;
        // Prepopulate the state with the existing values
        if (data) {
          setAlignment(data.alignment || 1);
          setSavings(data.savings || 0);
          setAdvantages(data.advantages || []);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchExistingScore();
  }, [useCase.usecase_id]);

  const alignmentLabels = {
    1: "Gegenläufig",
    2: "Niedrig",
    3: "Keinen",
    4: "Etwas",
    5: "Hoch",
  };

  const handleAddAdvantage = () => {
    setAdvantages([...advantages, { name: "", value: 1 }]);
  };

  const handleAdvantageChange = (index, name) => {
    const newAdvantages = [...advantages];
    newAdvantages[index].name = name;
    setAdvantages(newAdvantages);
  };

  const handleAdvantageValueChange = (index, value) => {
    const newAdvantages = [...advantages];
    newAdvantages[index].value = value;
    setAdvantages(newAdvantages);
  };

  const handleDeleteAdvantage = (index) => {
    const newAdvantages = advantages.filter((_, i) => i !== index);
    setAdvantages(newAdvantages);
  };

  const handleSubmit = async () => {
    const formData = {
      alignment,
      savings,
      advantages,
      usecase_id: useCase.usecase_id,
    };

    try {
      const response = await fetch("/api/valuescore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
    setIsModalOpen(false);
    updateUseCases();
  };

  return (
    <div className="font-normal text-[#252525] flex flex-col w-[748px] h-[904px] items-start justify-between p-12 relative bg-white-ffffff">
      <div className="relative self-stretch w-full h-full overflow-y-auto overflow-x-hidden">
        <div className="relative w-[651px] h-[763px] flex flex-col items-center">
          <div className="w-[651px] flex flex-col items-center">
            <div className="w-[360px] h-7 border-b border-[#bdbdbd]">
              <div className="font-title font-semibold text-[#da3a33] text-lg text-center ">
                Value Score
              </div>
            </div>
            <div className="w-[651px] mt-4">
              <div className="w-[651px] h-36 rounded-md">
                <div className="relative w-[635px] h-auto">
                  <p className="font-placeholder-value text-black-500-808080 text-sm">
                    Der Value Score beschreibt den Mehrwert, welcher durch die
                    KI Lösung geschaffen wird. Hierfür wird bewertet, inwiefern
                    die Idee zur KI-Strategie beiträgt bzw. wie sehr es zum
                    Thema passt. Bei den Vorteilen können alle positiven Effekte
                    aufgeführt werden. Die Ersparnis ist in h/Tag einzutragen.
                    Auf diese Weise lässt sich der Mehrwert der Idee auf die
                    Ersparnis der Arbeitszeit bemessen. Zuletzt kann eine
                    Ertragssteigerung eingetragen werden, falls die KI Lösung
                    eine solche bewirken kann.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[651px] mt-2 flex flex-col items-center">
            <div className="w-[362px] h-[30px] border-b border-[#bdbdbd]">
              <div className="font-semibold text-[#252525] text-lg text-center">
                Übereinstimmung mit KI Strategie
              </div>
            </div>
            <div className="w-[651px] mt-4 flex flex-col items-center">
              <p className="font-placeholder-value text-black-500-808080 text-sm ">
                Inwieweit hat die KI-Lösung einen Einfluss auf die KI-Strategie
                des Unternehmens? Besteht hier ein hoher Synergieeffekt, oder
                steuert es dieser sogar entgegen?
              </p>
              <div className="w-[600px] h-[75px] mt-4 flex flex-col items-center">
                <div className="w-full h-2 bg-sliderbar rounded-full relative w-full">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    className="w-full py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                    value={alignment}
                    onChange={(e) => setAlignment(Number(e.target.value))}
                  />
                </div>
                <div className="mt-7 text-[#252525] p-3 border-1 rounded-full bg-[#d9d9d9]">
                  {alignmentLabels[alignment]}
                </div>
              </div>
            </div>
          </div>

          <div className="w-[651px] mt-10 flex flex-col items-center">
            <div className="w-[362px] h-[30px] border-b border-[#bdbdbd]">
              <div className="font-semibold text-[#252525] text-lg text-center">
                Vorteile
              </div>
            </div>
            <p className="mt-2 font-placeholder-value text-black-500-808080 text-sm">
              Welche Vorteile bringt die hier beschriebene KI Lösung? Durch das
              Plus lassen sich weitere Vorteile hinzufügen.
            </p>
            <div className="w-[651px] mt-4">
              <div className="grid grid-cols-4 gap-4 items-center text-[12px]">

              <div className="font-normal text-[#252525] text-base"></div>

                <div className="font-normal text-[#252525] text-base"></div>
                <div className="flex justify-center">gering</div>
                <div className="flex justify-center">hoch</div>
              </div>
              {advantages.map((advantage, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 gap-4 items-center mb-2"
                >
                   
                  <input
                    type="text"
                    value={advantage.name}
                    onChange={(e) =>
                      handleAdvantageChange(index, e.target.value)
                    }
                    className="font-normal text-[#252525] text-base border-b border-[#bdbdbd] p-1"
                  />
                   <button
                    onClick={() => handleDeleteAdvantage(index)}
                    className="font-bold w-[18px] text-[12px]  border-2 border-black rounded-full  hover:text-sky-500 cursor:pointer hover:border-sky-500"
                    >
                    −
                  </button>
                  <div className="flex justify-center">
                    <input
                      type="radio"
                      value="1"
                      name={`vorteil${index}`}
                      checked={advantage.value === 1}
                      onChange={(e) => handleAdvantageValueChange(index, 1)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex justify-center">
                    <input
                      type="radio"
                      value="2"
                      name={`vorteil${index}`}
                      checked={advantage.value === 2}
                      onChange={(e) => handleAdvantageValueChange(index, 2)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                  </div>
                
                </div>
              ))}
              <button
                onClick={handleAddAdvantage}
                className="text-[12px] mt-2 border-2 border-black rounded-full px-4 py-2 hover:text-sky-500 cursor:pointer hover:border-sky-500"
              >
                + Vorteil
              </button>
            </div>
          </div>

          <div className="w-[651px] mt-10 flex flex-col items-center">
            <div className="w-[362px] h-[30px] border-b border-[#bdbdbd]">
              <div className="font-semibold text-[#252525] text-lg text-center">
                Ersparnisse
              </div>
            </div>
            <div className="w-[651px] mt-4 grid grid-cols-3 gap-4 items-center mb-5">
              <p className="font-placeholder-value text-black-500-808080 text-sm col-span-2">
                Wie viele Stunden Zeitersparnis bringt die KI Lösung mit sich?
              </p>
              <div className="w-[180px] flex items-center justify-end">
                <div className="w-[83px] h-[38px] bg-[#d9d9d9] flex items-center justify-center">
                  <input
                    type="number"
                    className="w-full h-full text-center bg-transparent border-none outline-none"
                    min="0"
                    step="1"
                    value={savings}
                    onChange={(e) => setSavings(Number(e.target.value))}
                  />
                </div>
                <div className="w-[115px] text-right font-placeholder-value text-black-500-808080 text-sm">
                  h pro Woche
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center px-6 py-2.5 w-full bg-[#dad433] rounded-md cursor-pointer  hover:bg-sky-700">
        <button
          onClick={handleSubmit}
          className="font-button-label font-semibold text-white text-lg text-center"
        >
          Speichern
        </button>
      </div>
    </div>
  );
};

export default ValueScoreCard;
