import React, { useState } from "react";
import { useAppStore } from "../zustand/useStore";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const {
    personalInfo,
    setCurrentEdit,
    filteredPersonalInfo,
    filterPersonalInfo,
    filterSearchPersonalInfo,
    filteredSeaerchPersonalInfo,
  } = useAppStore();
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleEdit = (info) => {
    if (info.docstatus === 0) {
      setCurrentEdit(info);
      navigate("/form");
    }
  };

  const handleFilter = (status) => {
    if (status && searchTerm) {
      //   setSearchTerm("");
      setFilterStatus(status);
      filterSearchPersonalInfo(status, searchTerm);
    } else {
      setFilterStatus(status);
      filterPersonalInfo(status);
    }
  };

  const handleSearchFilter = (search) => {
    setSearchTerm(search);
    filterSearchPersonalInfo(search, filterStatus);
  };

  const displayedInfo =
    searchTerm == "" && filterStatus == ""
      ? personalInfo
      : searchTerm == "" && filterStatus != ""
      ? filteredPersonalInfo
      : searchTerm != "" && filterStatus != ""
      ? filteredSeaerchPersonalInfo
      : searchTerm != "" && filterStatus == ""
      ? filteredPersonalInfo
      : "";

  const handleClearSearch = () => {
    setFilterStatus("");
    setSearchTerm("");
    filterPersonalInfo("all"); // Reset filter when clearing search
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Personal Information
      </h1>
      <button
        onClick={() => navigate("/form")}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mb-4"
      >
        Add Personal Info
      </button>
      <div className="flex justify-start gap-4 mb-4">
        <button
          onClick={() => handleFilter("all")}
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
        >
          All
        </button>
        <button
          onClick={() => handleFilter("0")}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Draft
        </button>
        <button
          onClick={() => handleFilter("1")}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Submitted
        </button>
        <button
          onClick={() => handleFilter("2")}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        >
          Cancelled
        </button>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearchFilter(e.target.value)}
        />
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Phone</th>
            <th className="py-2 px-4">Address</th>
            <th className="py-2 px-4">DocStatus</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedInfo.map((info) => (
            <tr key={info.id} className="text-gray-700 border-b">
              <td className="py-2 px-4">{info.name}</td>
              <td className="py-2 px-4">{info.email}</td>
              <td className="py-2 px-4">{info.phone}</td>
              <td className="py-2 px-4">{info.address}</td>
              <td className="py-2 px-4">{info.docstatus}</td>
              <td className="py-2 px-4">
                {info.docstatus == 0 && (
                  <button
                    onClick={() => handleEdit(info)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                )}
                {info.docstatus == 1 && (
                  <span className="text-green-500 font-semibold">
                    Submitted
                  </span>
                )}
                {info.docstatus == 2 && (
                  <span className="text-red-500 font-semibold">Cancelled</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LandingPage;
