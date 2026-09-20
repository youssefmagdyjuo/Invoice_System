import React, { useEffect, useState } from "react";
import InvoiceForm from "../components/InvoiceForm";
import { resetInvoice, setInvoiceNumber } from "../features/invoice/invoiceSlice";
import { addInvoiceToStore } from "../features/all invoices/allInvoicesSlice";
import { useSelector, useDispatch } from "react-redux";
import Button from "../components/Button";
import { generatePDF } from "../utilities/generatePDF";
import { incrementInvoice } from "../features/invoice/invoiceCounter";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function CreateInvoice() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lastNumber } = useSelector((state) => state.invoiceCounter);
  const invoice = useSelector((state) => state.invoice);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [printState, setPrintState] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(resetInvoice());
  }, [dispatch]);

  // Form validation state
  useEffect(() => {
    const hasName = Boolean(invoice.clientName?.trim());
    const hasCountry = Boolean(invoice.clientAddress?.country?.trim());
    const hasCity = Boolean(invoice.clientAddress?.city?.trim());
    const hasFirstProduct =
      Boolean(invoice.products?.[0]?.product_name?.trim()) &&
      Number(invoice.products?.[0]?.product_price) > 0;

    if (hasName && hasCountry && hasCity && hasFirstProduct) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [invoice]);

  const handleFormSubmission = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const invoiceNumber = `INV-2025-${String(lastNumber).padStart(3, "0")}`;
      dispatch(setInvoiceNumber(invoiceNumber));
      dispatch(incrementInvoice());

      const invoiceToSend = {
        ...invoice,
        invoiceNumber,
        status: invoice.draft ? "draft" : (invoice.status || "pending"),
        total_price: invoice.total_price || 0
      };

      const saved = await api.createInvoice(invoiceToSend);
      dispatch(addInvoiceToStore(saved));
      dispatch(resetInvoice());

      if (printState) {
        generatePDF(saved);
      }

      navigate("/invoices");
    } catch (error) {
      console.error("Failed to create invoice:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <InvoiceForm
        printState={printState}
        setPrintState={setPrintState}
        title="Create New Invoice"
      >
        <div className="flex gap-4 items-center">
          <Button
            type="button"
            text={isSubmitting ? "Saving..." : "Save Invoice"}
            style="btn_primary"
            disabled={buttonDisabled || isSubmitting}
            fun={handleFormSubmission}
          />
          <button
            type="button"
            onClick={() => navigate("/invoices")}
            className="px-5 py-2.5 rounded text-gray-600 hover:bg-gray-100 font-medium text-sm transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </InvoiceForm>
    </div>
  );
}
