import React, { useEffect, useState } from "react";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import {
  updateClientName,
  updateClientAddress,
  updateClientPhone,
  setClientDetails
} from "../features/invoice/invoiceSlice";
import { api } from "../services/api";

export default function ClientInfo() {
  const dispatch = useDispatch();
  const clientName = useSelector((state) => state.invoice.clientName);
  const clientPhone = useSelector((state) => state.invoice.clientPhone);
  const clientAddress = useSelector((state) => state.invoice.clientAddress);

  const [availableClients, setAvailableClients] = useState([]);

  useEffect(() => {
    const loadClients = async () => {
      const data = await api.getClients();
      setAvailableClients(data || []);
    };
    loadClients();
  }, []);

  const handleSelectClient = (e) => {
    const selectedId = e.target.value;
    if (!selectedId) return;
    const found = availableClients.find((c) => String(c._id) === String(selectedId));
    if (found) {
      dispatch(setClientDetails(found));
    }
  };

  return (
    <div className="clintInfo">
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-semibold text-gray-700 text-sm flex items-center gap-2">
          <i className="fa-solid fa-user-tag text-cyan-600"></i> Client Details
        </h3>
        {availableClients.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Quick fill from existing client:</span>
            <select
              className="border border-gray-300 rounded px-2 py-1 text-xs text-gray-700 bg-white focus:outline-none focus:border-cyan-500 cursor-pointer"
              onChange={handleSelectClient}
              defaultValue=""
            >
              <option value="" disabled>
                -- Choose client --
              </option>
              {availableClients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.name} ({client.city}, {client.country})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="Client Name *"
          value={clientName || ""}
          fun={(e) => {
            dispatch(updateClientName(e.target.value));
          }}
        />
        <Input
          type="text"
          placeholder="Client Phone *"
          value={clientPhone || ""}
          fun={(e) => {
            dispatch(updateClientPhone(e.target.value));
          }}
        />
      </div>

      <div className="flex justify-between gap-4">
        <Input
          type="text"
          placeholder="Country *"
          value={clientAddress?.country || ""}
          fun={(e) => {
            dispatch(
              updateClientAddress({
                field: "country",
                value: e.target.value
              })
            );
          }}
        />
        <Input
          type="text"
          placeholder="City *"
          value={clientAddress?.city || ""}
          fun={(e) => {
            dispatch(
              updateClientAddress({
                field: "city",
                value: e.target.value
              })
            );
          }}
        />
        <Input
          type="text"
          placeholder="Street Address *"
          value={clientAddress?.street || ""}
          fun={(e) => {
            dispatch(
              updateClientAddress({
                field: "street",
                value: e.target.value
              })
            );
          }}
        />
      </div>
    </div>
  );
}
