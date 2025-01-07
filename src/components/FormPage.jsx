import React, { useEffect, useState } from "react";
import { useAppStore } from "../zustand/useStore";
import { useNavigate } from "react-router-dom";

const FormPage = () => {
  const { currentEdit, addPersonalInfo, updatePersonalInfo, clearCurrentEdit } =
    useAppStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    address: "",
    docstatus: 0, // Default to draft (editable)
  });

  useEffect(() => {
    if (currentEdit) {
      setFormData(currentEdit);
    }
  }, [currentEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentEdit) {
      updatePersonalInfo(formData);
    } else {
      const newInfo = {
        ...formData,
        id: Date.now(), // Generate a unique ID
        // docstatus: 0, // New entries start as draft
      };
      addPersonalInfo(newInfo);
    }
    clearCurrentEdit();
    navigate("/");
  };

  const handleCancel = () => {
    clearCurrentEdit();
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        {currentEdit ? "Edit Personal Info" : "Add Personal Info"}
      </h2>
      {currentEdit && currentEdit.docstatus !== 0 && (
        <p className="text-red-500 font-semibold mb-4">
          This entry is not editable (Submitted or Cancelled).
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
            disabled={currentEdit && currentEdit.docstatus !== 0}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
            disabled={currentEdit && currentEdit.docstatus !== 0}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
            disabled={currentEdit && currentEdit.docstatus !== 0}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
            disabled={currentEdit && currentEdit.docstatus !== 0}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="number"
            name="docstatus"
            value={formData.docstatus}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3"
            disabled={currentEdit && currentEdit.docstatus !== 0}
            required
          />
        </div>
        {!currentEdit || currentEdit.docstatus === 0 ? (
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {currentEdit ? "Update Info" : "Add Info"}
          </button>
        ) : null}
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 ml-4"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default FormPage;
