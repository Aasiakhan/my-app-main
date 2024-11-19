import React, { useState } from "react";

interface ServiceFormProps {
  onAddService: (service: {
    name: string;
    ip: string;
    port: string;
  }) => void;
}

const AddServiceForm: React.FC<ServiceFormProps> = ({ onAddService }) => {
  const [formData, setFormData] = useState({
    name: "",
    ip: "",
    port: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddService(formData);
    setFormData({ name: "", ip: "", port: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow-md mb-4 w-full max-w-md"
    >
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 font-bold mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full border border-gray-700 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="ip"
          className="block text-gray-700 font-bold mb-2"
        >
          IP Address
        </label>
        <input
          type="text"
          id="ip"
          name="ip"
          value={formData.ip}
          onChange={handleInputChange}
          className="w-full border border-gray-700 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="port"
          className="block text-gray-700 font-bold mb-2"
        >
          Port
        </label>
        <input
          type="text"
          id="port"
          name="port"
          value={formData.port}
          onChange={handleInputChange}
          className="w-full border border-gray-700 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Service
        </button>
      </div>
    </form>
  );
};

export default AddServiceForm;
