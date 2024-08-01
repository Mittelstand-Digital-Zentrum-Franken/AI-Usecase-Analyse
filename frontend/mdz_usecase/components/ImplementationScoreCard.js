import React, { useEffect, useState } from "react";

const ImplementationScoreCard = ({ useCase, setIsModalOpen, updateUseCases }) => {
  const [scores, setScores] = useState(
    sections.map(section => section.questions.map(() => 0))
  );
  const [timeScore, setTimeScore] = useState(0);
  const [existingScore, setExistingScore] = useState(null);

  useEffect(() => {
    const fetchExistingScore = async () => {
      try {
        const url = `/api/implementationscore?usecase_id=${useCase.usecase_id}`;
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
        setExistingScore(data.data);
        data = data.data;
        
        // Assuming the data structure matches what we need
        const newScores = sections.map((section) =>
          data[section.label] ? data[section.label].map((score) => score || 0) : section.questions.map(() => 0)
        );

        setScores(newScores);
        setTimeScore(data.time || 0);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchExistingScore();
  }, [useCase.usecase_id]);

  const handleSelectChange = (sectionIndex, questionIndex, value) => {
    const newScores = [...scores];
    newScores[sectionIndex][questionIndex] = parseInt(value, 10);
    setScores(newScores);
  };

  const handleTimeScoreChange = (value) => {
    setTimeScore(parseInt(value, 10));
  };

  const handleSave = async () => {
    const formData = sections.reduce((acc, section, sectionIndex) => {
      acc[section.label] = scores[sectionIndex];
      return acc;
    }, {});
    formData["time"] = timeScore;
    formData["usecase_id"] = useCase.usecase_id;

    console.log(formData);

    try {
      const response = await fetch('/api/implementationscore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
    setIsModalOpen(false);
    updateUseCases();
  };

  const getSectionSum = sectionIndex => {
    return scores[sectionIndex].reduce((sum, value) => sum + value, 0);
  };

  const timeOptions = [
    { value: 0, label: "> 12 Monate" },
    { value: 1, label: "10-12 Monate" },
    { value: 2, label: "7-9 Monate" },
    { value: 3, label: "4-6 Monate" },
    { value: 4, label: "< 4 Monate" },
    { value: 5, label: "0 Monate" }
  ];

  return (
    <div className="text-[#252525] font-normal flex flex-col w-[748px] h-[904px] items-start justify-between p-12 relative bg-white">
      <div className="relative self-stretch w-full h-full overflow-y-auto">
        <div className="relative w-full h-auto rounded-lg">
          <div className="relative w-full border-b border-[#bdbdbd] pb-2 mb-4">
            <div className="font-semibold w-full text-[#da3a33]">
              Implementation Score
            </div>
          </div>
          <div className="relative w-full rounded-md mb-4">
            <p className="font-placeholder-value text-black-500-808080 text-[14px]">
              Der Implementation Score beschreibt, wie aufwendig es ist, eine KI Lösung in das Unternehmen zu
              implementieren. Auf Grundlage der nachfolgenden Fragen sollen unterschiedliche Faktoren ermittelt und
              bewertet werden.
              <br />
              <br />
              Für jeden der nachfolgenden Schritte findet eine Bewertung zwischen 1 (trifft nicht zu) und 5 (trifft
              voll und ganz zu) statt.
              <br />
              Wenn über den Punkt keine Aussage getroffen werden kann, dann ist die 0 auszuwählen
            </p>
          </div>

          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-8">
              <div className="relative w-full border-b border-[#bdbdbd] pb-2 mb-4 flex justify-between items-center">
                <div className="font-semibold text-[#252525] text-lg">
                  {section.title}
                </div>
                <div className="bg-gray-200 rounded px-2 py-1 mr-4">
                  {getSectionSum(sectionIndex)}
                </div>
              </div>
              {section.questions.map((question, qIndex) => (
                <div key={qIndex} className="flex items-center mb-4 justify-between">
                  <p className="w-[374px] font-placeholder-value text-black-500-808080 text-[14px]">
                    {question}
                  </p>
                  <select
                    className="border border-gray-300 rounded p-1 mr-4"
                    value={scores[sectionIndex][qIndex]}
                    onChange={(e) => handleSelectChange(sectionIndex, qIndex, e.target.value)}
                  >
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          ))}

          <div className="flex items-center mb-8 justify-between">
            <div className="w-[374px] font-semibold text-[#252525] text-lg">
              Time Score:
            </div>
            <select
              className="border bg-green-200 border-gray-300 rounded p-1 mr-5"
              value={timeScore}
              onChange={(e) => handleTimeScoreChange(e.target.value)}
            >
              {timeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col items-center justify-center px-6 py-2.5 self-stretch w-full bg-[#dad433] rounded-md cursor-pointer cursor-pointer hover:bg-sky-700"
        onClick={handleSave}
      >
        <div className="relative w-fit font-button-label text-white text-center">
          Speichern
        </div>
      </div>
    </div>
  );
};

const sections = [
  {
    title: "Daten und Infrastruktur",
    label: "data",
    questions: [
      "Zugang zu benötigten Daten vorhanden?",
      "Benötigte Menge an Daten vorhanden?",
      "Datenqualität entspricht den Vorgaben?"
    ]
  },
  {
    title: "Algorithmen und Lösungen",
    label: "algorithms",
    questions: [
      "Es sind benötigte Herangehensweisen bekannt?",
      "Es wurde bereits ein ähnliches Problem gelöst?",
      "Die benötigten Technologien sind bekannt?"
    ]
  },
  {
    title: "Prozesse und Systeme",
    label: "processes",
    questions: [
      "Keine großen Umstellungen in den Prozessen?",
      "Keine/Wenige Systeme müssen eingeführt werden?",
      "Keine organisatorischen Veränderungen nötig?"
    ]
  },
  {
    title: "Know-How",
    label: "knowledge",
    questions: [
      "Wissen über Technologien vorhanden?",
      "Benötigtes Domänenwissen vorhanden?",
      "Schulungen können in annehmbarer Zeit durchgeführt werden?"
    ]
  }
];

export default ImplementationScoreCard;
