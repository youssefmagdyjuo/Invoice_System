import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addProduct,
  updateProduct,
  removeProduct,
  calculateTotal
} from "../features/invoice/invoiceSlice";
import Input from "./Input";

export default function EnterProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.invoice.products || []);

  return (
    <div className="products_section">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-gray-700 text-sm flex items-center gap-2">
          <i className="fa-solid fa-list-check text-cyan-600"></i> Line Items & Services
        </h3>
        <button
          type="button"
          className="flex items-center gap-2 bg-slate-700 hover:bg-cyan-600 text-white px-3 py-1.5 rounded text-sm transition-all shadow-sm cursor-pointer"
          onClick={() => {
            dispatch(addProduct());
          }}
        >
          <i className="fa-solid fa-plus text-xs"></i> Add Item
        </button>
      </div>

      <div className="scrollable_container border border-gray-200 rounded-md">
        <table className="products_table w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-xs uppercase tracking-wider">
              <th className="p-2 text-left">Item Description</th>
              <th className="p-2 text-center" style={{ width: "90px" }}>
                Qty
              </th>
              <th className="p-2 text-center" style={{ width: "120px" }}>
                Price ($)
              </th>
              <th className="p-2 text-center" style={{ width: "110px" }}>
                Discount (%)
              </th>
              <th className="p-2 text-center" style={{ width: "130px" }}>
                Total ($)
              </th>
              <th className="p-2 text-center" style={{ width: "50px" }}></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-t border-gray-100">
                <td className="p-1.5">
                  <Input
                    placeholder="e.g. Web Development or UI Design"
                    value={product.product_name || ""}
                    fun={(e) => {
                      dispatch(
                        updateProduct({
                          index: index,
                          field: "product_name",
                          value: e.target.value
                        })
                      );
                      dispatch(calculateTotal());
                    }}
                  />
                </td>
                <td className="p-1.5">
                  <Input
                    type="number"
                    min="1"
                    placeholder="1"
                    value={product.count ?? 1}
                    fun={(e) => {
                      const val = Math.max(1, Number(e.target.value) || 1);
                      dispatch(
                        updateProduct({
                          index: index,
                          field: "count",
                          value: val
                        })
                      );
                      dispatch(calculateTotal());
                    }}
                  />
                </td>
                <td className="p-1.5">
                  <Input
                    type="number"
                    min="0"
                    step="any"
                    placeholder="0.00"
                    value={product.product_price ?? 0}
                    fun={(e) => {
                      const val = Math.max(0, Number(e.target.value) || 0);
                      dispatch(
                        updateProduct({
                          index: index,
                          field: "product_price",
                          value: val
                        })
                      );
                      dispatch(calculateTotal());
                    }}
                  />
                </td>
                <td className="p-1.5">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0%"
                    value={product.descount ?? 0}
                    fun={(e) => {
                      const val = Math.min(100, Math.max(0, Number(e.target.value) || 0));
                      dispatch(
                        updateProduct({
                          index: index,
                          field: "descount",
                          value: val
                        })
                      );
                      dispatch(calculateTotal());
                    }}
                  />
                </td>
                <td className="p-1.5">
                  <input
                    type="text"
                    readOnly
                    className="bg-gray-50 text-gray-800 font-semibold text-center border border-gray-200 rounded px-2 py-1.5 text-sm w-full cursor-not-allowed"
                    value={`$${(product.product_total_price || 0).toFixed(2)}`}
                  />
                </td>
                <td className="p-1.5 text-center">
                  {products.length > 1 && (
                    <button
                      type="button"
                      title="Remove item"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 w-7 h-7 rounded-full flex items-center justify-center mx-auto transition-colors cursor-pointer"
                      onClick={() => {
                        dispatch(removeProduct(index));
                        dispatch(calculateTotal());
                      }}
                    >
                      <i className="fa-solid fa-trash-can text-xs"></i>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
