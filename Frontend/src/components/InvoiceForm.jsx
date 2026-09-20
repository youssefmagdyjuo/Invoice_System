import React from "react";
import ClientInfo from "./ClientInfo";
import EnterProducts from "./EnterProducts";
import { useSelector, useDispatch } from "react-redux";
import {
  draftToggle,
  setStatus,
  updateInvoiceField
} from "../features/invoice/invoiceSlice";
import Input from "./Input";

export default function InvoiceForm({
  children,
  printState,
  setPrintState,
  title = "Invoice Form"
}) {
  const dispatch = useDispatch();
  const invoice = useSelector((state) => state.invoice);

  const formattedDate = invoice.date ? invoice.date.split("T")[0] : "";
  const formattedDueDate = invoice.dueDate ? invoice.dueDate.split("T")[0] : "";

   return (
    <div className="page">
      <div className="page_container flex flex-col justify-between overflow-y-auto max-h-[95vh]">
        <div className="border-b border-gray-100 pb-3 mb-3 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <p className="text-xs text-gray-500">
              {invoice.invoiceNumber ? `Invoice #${invoice.invoiceNumber}` : "New Invoice Document"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Status:</span>
            <select
              value={invoice.status || (invoice.draft ? "draft" : "pending")}
              onChange={(e) => dispatch(setStatus(e.target.value))}
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border cursor-pointer ${
                invoice.status === "paid"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                  : invoice.status === "overdue"
                  ? "bg-rose-50 text-rose-700 border-rose-300"
                  : invoice.status === "draft"
                  ? "bg-slate-100 text-slate-700 border-slate-300"
                  : "bg-amber-50 text-amber-700 border-amber-300"
              }`}
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4 p-0">
          <ClientInfo />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Invoice Date
              </label>
              <Input
                type="date"
                value={formattedDate}
                fun={(e) =>
                  dispatch(
                    updateInvoiceField({
                      field: "date",
                      value: new Date(e.target.value).toISOString()
                    })
                  )
                }
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Due Date
              </label>
              <Input
                type="date"
                value={formattedDueDate}
                fun={(e) =>
                  dispatch(
                    updateInvoiceField({
                      field: "dueDate",
                      value: new Date(e.target.value).toISOString()
                    })
                  )
                }
              />
            </div>
          </div>

          <EnterProducts />

          <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200 mt-2 gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Input
                  type="checkbox"
                  checked={invoice.draft}
                  fun={() => {
                    if (printState && !invoice.draft) {
                      setPrintState(false);
                    }
                    dispatch(draftToggle());
                  }}
                />
                <span className="text-sm text-gray-700">Save as Draft</span>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="checkbox"
                  checked={printState}
                  fun={() => {
                    invoice.draft ? setPrintState(false) : setPrintState((prev) => !prev);
                  }}
                />
                <span className="text-sm text-gray-700">Print / Download PDF upon saving</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-gray-500 uppercase tracking-wider block">
                Total Amount
              </span>
              <span className="text-2xl font-black text-cyan-600">
                ${(invoice?.total_price ?? 0).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
            </div>
          </div>

          <div className="pt-2">{children}</div>
        </form>
      </div>
    </div>
  );
}
