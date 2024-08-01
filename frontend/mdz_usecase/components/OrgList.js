import React, { useState, useEffect, useRef } from "react";
import JoinOrgCard from "./JoinOrgCard";
import CreateOrgCard from "./CreateOrgCard";
import { EditButton, DeleteButton, ShareButton } from "@/SVGS";

const OrgList = () => {
  const [showJoinOrgCard, setShowJoinOrgCard] = useState(false);
  const [showCreateOrgCard, setShowCreateOrgCard] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [editingOrgId, setEditingOrgId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [copiedNotification, setCopiedNotification] = useState("");
  const inputRef = useRef(null);

  const fetchOrganizations = async () => {
    try {
      const response = await fetch("/api/org");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setOrganizations(data.data);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setEditingOrgId(null);
      }
    };

    const handleEscapePress = (event) => {
      if (event.key === "Escape") {
        setEditingOrgId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapePress);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, []);

  const handleJoinClick = () => {
    setShowJoinOrgCard(true);
  };

  const handleCreateClick = () => {
    setShowCreateOrgCard(true);
  };

  const handleDeleteClick = async (orgId) => {
    try {
      const response = await fetch(`/api/org?org_id=${orgId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // After successful deletion, update the state to remove the deleted organization
      setOrganizations((prevOrgs) => prevOrgs.filter((org) => org.org_id !== orgId));
    } catch (error) {
      console.error("Error deleting organization:", error);
    }
  };

  const handleEditClick = (orgId, currentName) => {
    if (editingOrgId === orgId) {
      setEditingOrgId(null);
    } else {
      setEditingOrgId(orgId);
      setEditedName(currentName);
    }
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleNameSave = async (orgId) => {
    try {
      const response = await fetch(`/api/org?org_id=${orgId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: editedName }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Update the organization name in the state
      setOrganizations((prevOrgs) =>
        prevOrgs.map((org) => (org.org_id === orgId ? { ...org, name: editedName } : org))
      );
      setEditingOrgId(null); // Exit editing mode
    } catch (error) {
      console.error("Error updating organization name:", error);
    }
  };

  const handleKeyPress = (e, orgId) => {
    if (e.key === "Enter") {
      handleNameSave(orgId);
    }
  };

  const handleShareClick = (inviteCode) => {
    navigator.clipboard.writeText(inviteCode)
      .then(() => {
        setCopiedNotification("Copied invite code to clipboard");
        setTimeout(() => {
          setCopiedNotification("");
        }, 1500);
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  return (
    <div className="relative w-[456px] bg-white-ffffff rounded-[15px] [font-family:'Roboto-SemiBold',Helvetica] font-semibold">
      {showJoinOrgCard  ? (
        <JoinOrgCard setShowJoinOrgCard={setShowJoinOrgCard} fetchOrganizations={fetchOrganizations}/>
      ) : showCreateOrgCard ? (
        <CreateOrgCard setShowCreateOrgCard={setShowCreateOrgCard} fetchOrganizations={fetchOrganizations} />
      ) : (
        <React.Fragment>
          <div className="text-[28px] p-[48px] text-[#da3a33] font-title font-[number:var(--title-font-weight)] text-[length:var(--title-font-size)] tracking-[var(--title-letter-spacing)] leading-[var(--title-line-height)] [font-style:var(--title-font-style)] border-b-2">
            Meine Organisationen
          </div>
          <div className="p-[48px] space-y-4">
            {organizations.map((org) => (
              <div
                key={org.org_id}
                className="flex items-center justify-between text-[#252525] font-title font-[number:var(--title-font-weight)] text-[length:var(--title-font-size)] tracking-[var(--title-letter-spacing)] leading-[var(--title-line-height)] [font-style:var(--title-font-style)]"
              >
                {editingOrgId === org.org_id ? (
                  <input
                    ref={inputRef}
                    type="text"
                    value={editedName}
                    onChange={handleNameChange}
                    onKeyPress={(e) => handleKeyPress(e, org.org_id)}
                    className="border border-gray-300 p-2"
                  />
                ) : (
                  <span>{org.name}</span>
                )}
                <div className="flex items-center">
                  <span
                    className="order-2 mr-2 cursor-pointer"
                    onClick={() => handleShareClick(org.invite_code)}
                  >
                    <ShareButton />
                  </span>
                  {org.user_id === "0" && (
                    <span className="order-1 mr-2 cursor-pointer" onClick={() => handleEditClick(org.org_id, org.name)}>
                      <EditButton />
                    </span>
                  )}
                  <span
                    className="order-2 cursor-pointer"
                    onClick={() => handleDeleteClick(org.org_id)}
                  >
                    <DeleteButton />
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-[48px] flex space-x-4 border-t-2">
            <div
              className="cursor-pointer hover:bg-sky-700 bg-[#e33b32] flex flex-col w-[154px] items-center justify-center px-[24px] py-[10px] rounded-[6px]"
              onClick={handleJoinClick}
            >
              <div className="relative w-fit mt-[-1.00px] font-button-label font-[number:var(--button-label-font-weight)] text-white-ffffff text-[length:var(--button-label-font-size)] text-center tracking-[var(--button-label-letter-spacing)] leading-[var(--button-label-line-height)] whitespace-nowrap [font-style:var(--button-label-font-style)]">
                Beitreten
              </div>
            </div>
            <div
              className="cursor-pointer hover:bg-sky-700 bg-[#dad433] flex flex-col w-[154px] items-center justify-center px-[24px] py-[10px] rounded-[6px]"
              onClick={handleCreateClick}
            >
              <div className="relative w-fit mt-[-1.00px] font-button-label font-[number:var(--button-label-font-weight)] text-white-ffffff text-[length:var(--button-label-font-size)] text-center tracking-[var(--button-label-letter-spacing)] leading-[var(--button-label-line-height)] whitespace-nowrap [font-style:var(--button-label-font-style)]">
                + Neu
              </div>
            </div>
          </div>
          {copiedNotification && (
            <div className="  text-neutral-500 ">
              {copiedNotification}
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default OrgList;
