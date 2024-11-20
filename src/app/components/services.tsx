"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ServiceForm from "./add-services";

interface Service {
  id: number;
  name: string;
  status: Status;
  ip: string;
  timestamp: string;
  port: string;
}

enum Status {
  UP="UP",
  DOWN="DOWN",
}

const Data: Service[] = [
  {
    id: 1,
    name: "Service 1",
    status: Status.UP,
    ip: "192.168.1.1",
    timestamp: "2024-10-14 10:00:00",
    port: "3001",
  },
  {
    id: 2,
    name: "Service 2",
    status: Status.DOWN,
    ip: "192.168.1.2",
    timestamp: "2024-10-14 09:30:00",
    port: "3002",
  },
  {
    id: 3,
    name: "Service 3",
    status: Status.UP,
    ip: "192.168.1.3",
    timestamp: "2024-10-14 08:45:00",
    port: "3002",
  },
];

const ServicesTable: React.FC = () => {
  const [services, setServices] = useState<Service[]>(Data);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [_, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get<{last_updated_at:string,data:Service[]}>(
          "http://192.168.25.146:8000/services-status"
        );
        setServices(response.data.data);
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
      status: Status.DOWN,
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
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md text-left">
          <thead>
            <tr>
              <th className="py-3 px-5 bg-gray-50 border-b font-semibold text-gray-600">
                Name
              </th>
              <th className="py-3 px-5 bg-gray-50 border-b font-semibold text-gray-600">
                IP
              </th>
              <th className="py-3 px-5 bg-gray-50 border-b font-semibold text-gray-600">
                Port
              </th>
              <th className="py-3 px-5 bg-gray-50 border-b font-semibold text-gray-600">
                Status
              </th>
              <th className="py-3 px-5 bg-gray-50 border-b font-semibold text-gray-600">
                Updated at
              </th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-gray-100">
                <td className="py-3 px-5 border-b text-gray-700">
                  {service.name}
                </td>
                <td className="py-3 px-5 border-b text-gray-700">
                  {service.ip}
                </td>
                <td className="py-3 px-5 border-b text-gray-700">
                  {service.port}
                </td>
                <td className="py-3 px-5 border-b">
                  <div className="flex items-center justify-start space-x-2 text-black">
                    <span
                      className={`inline-block h-3 w-3 rounded-full ${
                        service.status === Status.UP
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></span>
                    <span className="font-bold uppercase text-sm leading-none">
                      {service.status}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-5 border-b text-gray-700">
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
