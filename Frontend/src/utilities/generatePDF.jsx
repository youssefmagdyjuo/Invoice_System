import axios from "axios";
import { renderToString } from "react-dom/server";
import HTMLTemplate from "../components/PDF/HTMLTemplate";

export const generatePDF = async (invoice) => {
    const htmlString = renderToString(<HTMLTemplate invoice={invoice} />);
    const cleanedHTML = htmlString.replace(/\n/g, "").replace(/\s\s+/g, " ");
    const response = await axios.post("/api/invoices/generate-pdf",
        { html: cleanedHTML },
        { responseType: "blob" });
    console.log(response.data);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = `Invoice_${invoice.clientName}.pdf`;
    link.click();
};