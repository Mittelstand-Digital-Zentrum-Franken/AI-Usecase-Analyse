"use client"
import { useEffect, useState, useRef } from 'react';

import ImplementationValueChart from '../components/DummyChart';
import UsecaseCard from '@/components/UsecaseCard';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import LoginCard from '@/components/LoginCard';
import JoinOrgCard from '@/components/JoinOrgCard';
import { AddButton } from '@/SVGS';
import AddUsecaseCard from '@/components/AddUseCaseCard';
import OrgList from '@/components/OrgList';
export const dynamic = 'force-dynamic'
export default function Home() {

  const [userOrgs, setUserOrgs] = useState();
  const [useCases, setUseCases] = useState();
  const [selectedOrg, setSelectedOrg] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(); // Ref for the modal container

  const fetchUserOrgs = async () => {
    try {
      const response = await fetch('/api/org',{method:"GET"});
      const data = await response.json();
      setUserOrgs(data.data);
    } catch (error) {
      console.error('Error fetching user organizations:', error);
    }
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  useEffect(() => {
    fetchUserOrgs();
  }, []);
  
  useEffect(() => {
    if (userOrgs && userOrgs.length > 0) {
      setSelectedOrg(userOrgs[0]);
    }
  }, [userOrgs]);
  
// Inside Home component
const updateUseCases = async () => {
  try {
    const url = `/api/usecase?org_id=${selectedOrg.org_id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setUseCases(data.data);
  } catch (error) {
    console.error('Error fetching usecases:', error);
  }
};

const prevOrg = () => {
  const currentIndex = userOrgs.findIndex(org => org.org_id === selectedOrg?.org_id);
  // If the current organization is the first one, loop back to the last one
  if (currentIndex == 0) {
    setSelectedOrg(userOrgs[userOrgs.length - 1]); // Set to the last organization
  } else {
    setSelectedOrg(userOrgs[currentIndex - 1]); // Set to the previous organization
  }
};

const nextOrg = () => {
  const currentIndex = userOrgs.findIndex(org => org.org_id === selectedOrg?.org_id);
  // If the current organization is the last one, loop back to the first one
  if (currentIndex == userOrgs.length - 1) {
    setSelectedOrg(userOrgs[0]); // Set to the first organization
  } else {
    setSelectedOrg(userOrgs[currentIndex + 1]); // Set to the next organization
  }
};

  useEffect(() => {
    if (!selectedOrg) return; // Exit if selectedOrg is not set
  
    const fetchUseCases = async () => {
      try {
    
        const url = `/api/usecase?org_id=${selectedOrg.org_id}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        const data = await response.json();
        setUseCases(data.data);
      } catch (error) {
        console.error('Error fetching usecases:', error);
      }
    };
    
  
    fetchUseCases();
  }, [selectedOrg]); // Include selectedOrg as a dependency
  

  useEffect(() => {
    // Function to close modal when clicked outside
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
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
    <div className='fixed  w-full bg-white h-[100%] overflow-auto' >
      <div className=" fixed w-full bg-white ">

        <TopBar />

      
<div className="fixed w-full h-[45vh] bg-[#DB3A33] rounded-b-[15px] flex flex-row justify-center">
  {/* Transparent background for the modal */}
  {isModalOpen && (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-25 z-50 flex justify-center items-center">
      {/* Modal container */}
      <div ref={modalRef} className="bg-white rounded-lg p-6 shadow-lg">
        <OrgList />
      </div>
    </div>
  )}
  <div className="bg-white rounded-[15px] m-4 w-1/3 h-auto text-[#DB3A33] flex flex-col items-center">
    <div className="flex items-center text-[26px]">
      <button
        className="p-2 mr-2 cursor-pointer hover:text-neutral-600 font-bold"
        onClick={prevOrg}
        disabled={!selectedOrg || userOrgs.length === 0}
      >
        &lt;
      </button>
      <p className="p-2 cursor-pointer hover:text-neutral-600 [font-family:'Roboto-SemiBold',Helvetica] font-semibold" onClick={toggleModal}>
        {selectedOrg?.name || "Organisation"}
      </p>
      <button
        className="p-2 ml-2 cursor-pointer hover:text-neutral-600 font-bold"
        onClick={nextOrg}
        disabled={!selectedOrg || userOrgs.length === 0}
      >
        &gt;
      </button>
    </div>
    <div className="w-full h-full">
      <ImplementationValueChart className="w-full h-full " useCases={useCases} />
    </div>
  </div>
  <div className="bg-[#f1f5f9] rounded-[15px] m-4  w-1/4 h-auto text-[#DB3A33] flex flex-col items-center">
    <div className="w-full h-full">
      <p className='font-bold pt-5 pl-5 text-[16px]'>Priorisierung der KI Usecase Ideen</p>
      <p className='text-neutral-700 p-5 text-[12px]'>
  Das Ziel dieser Usecase-Analyse ist es, mögliche Anwendungen der Künstlichen Intelligenz (KI) für ein Unternehmen zu identifizieren und zu bewerten. Jede Idee zur Nutzung von KI erfordert einen unterschiedlich hohen Aufwand und bietet variierenden Nutzen für das Unternehmen oder eine Abteilung. Diese Ideen werden mithilfe der Karten im unteren Bereich der App gesammelt und bewertet. Die Ergebnisse dieser Bewertungen sind in der nebenstehenden Grafik zusammengefasst.
  <br></br><br></br>Unser Ziel ist es, möglichst jene Ideen umzusetzen, die in die Kategorie <span className="text-[#65a30d]">„Low Hanging Fruits“</span> fallen. Diese Ideen zeichnen sich durch eine einfache Implementierung und einen hohen Nutzen aus. Nach der erfolgreichen Umsetzung dieser Ideen können wir uns den KI-Lösungen aus der Kategorie <span className="text-[#eab308]">„Cream of the Crop“</span> zuwenden. Diese bieten ebenfalls hohen Nutzen, sind jedoch oft mit größerem Aufwand verbunden. Es ist wichtig, die Ideen aus der Kategorie <span className="text-[#b91c1c]">„Rotten Tomatoes“</span> zu vermeiden, da der Aufwand hier im Verhältnis zum Nutzen zu hoch ist.
</p>

    </div>
  </div>
</div>


      </div>
      <div className='w-full bg-white mt-[50vh] p-5'>
        <div className="  [font-family:'Roboto-SemiBold',Helvetica] font-semibold text-[#DB3A33] text-[18px] " >
          <div className='mb-5 ml-[100px]'>
            <span>Ideensammlung und Bewertung <br></br></span> </div>
            <div className='flex flex-wrap ml-[100px] mr-[100px]'>
  {useCases && useCases.length > 0 ? (
    <>
      <AddUsecaseCard selectedOrg={selectedOrg} updateUseCases={updateUseCases} />
      {useCases.map((useCase, index) => (
        <UsecaseCard
          key={index}
          name={useCase.name}
          updateUseCases={updateUseCases}
          useCase={useCase}
        />
      ))}
    </>
  ) : (
    <AddUsecaseCard selectedOrg={selectedOrg} updateUseCases={updateUseCases} />
  )}
</div>




        </div>
      
      </div>
      <Footer/>
     
    </div>
  );
}
