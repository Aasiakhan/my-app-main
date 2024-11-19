"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ServiceForm from "./add-services";

interface Service {
  id: number;
  name: string;
  status: "online" | "offline";
  ip: string;
  timestamp: string;
  port: string;
}

const Data: Service[] = [
  {
    id: 1,
    name: "Service 1",
    status: "online",
    ip: "192.168.1.1",
    timestamp: "2024-10-14 10:00:00",
    port: "3001",
  },
  {
    id: 2,
    name: "Service 2",
    status: "offline",
    ip: "192.168.1.2",
    timestamp: "2024-10-14 09:30:00",
    port: "3002",
  },
  {
    id: 3,
    name: "Service 3",
    status: "online",
    ip: "192.168.1.3",
    timestamp: "2024-10-14 08:45:00",
    port: "3002",
  },
];

const ServicesTable: React.FC = () => {
  const [services, setServices] = useState<Service[]>(Data);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get<Service[]>(
          "http://localhost:8080/services-status"
        );
        setServices(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch services");
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleAddService = (newService: {
    name: string;
    ip: string;
    port: string;
  }) => {
    const timestamp = new Date().toISOString();
    const id = services.length + 1;
    const service: Service = {
      id,
      name: newService.name,
      status: "offline", 
      ip: newService.ip,
      timestamp,
      port: newService.port,
    };
    setServices((prev) => [...prev, service]);
    setShowForm(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">Services</h1>
      <div className="overflow-x-auto w-full max-w-6xl px-8">
        <button
          className="bg-red-300 px-4 py-2 rounded mb-4"
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? "Close Form" : "Add New"}
        </button>
        {showForm && <ServiceForm onAddService={handleAddService} />}
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-3 px-5 bg-gray-50 border-b font-semibold text-gray-600 text-center">
                Name
              </th>
              <th className="py-3 px-5 bg-gray-50 border-b font-semibold text-gray-600 text-center">
                IP
              </th>
              <th className="py-3 px-5 bg-gray-50 border-b font-semibold text-gray-600 text-center">
                Port
              </th>
              <th className="py-3 px-5 bg-gray-50 border-b font-semibold text-gray-600 text-center">
                Status
              </th>
              <th className="py-3 px-5 bg-gray-50 border-b font-semibold text-gray-600 text-center">
                Updated at
              </th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-gray-100">
                <td className="py-3 px-5 border-b text-gray-700 text-center">
                  {service.name}
                </td>
                <td className="py-3 px-5 border-b text-gray-700 text-center">
                  {service.ip}
                </td>
                <td className="py-3 px-5 border-b text-gray-700 text-center">
                  {service.port}
                </td>
                <td className="py-3 px-5 border-b text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <span
                      className={`inline-block h-3 w-3 rounded-full ${
                        service.status === "online"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></span>
                    <span className="font-bold uppercase text-sm leading-none">
                      {service.status}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-5 border-b text-gray-700 text-center">
                  {service.timestamp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServicesTable;
