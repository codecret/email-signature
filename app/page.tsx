"use client";
import { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";

const defaultValues = {
  name: "",
  department: "",
  mobile: "",
  email: "",
};

export default function EmailSignatureGenerator() {
  const [form, setForm] = useState(defaultValues);
  const previewRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const CARD_WIDTH = 600;
  const CARD_HEIGHT = 218;
  const signatureHtml = `
    <div style="position:relative;width:${CARD_WIDTH}px;height:${CARD_HEIGHT}px;background:url('/email-sign.jpg') no-repeat center/cover; color:#fff; font-family:Arial, sans-serif; overflow:hidden;">
      <div style='position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(17,17,17,0.10);'></div>
      <div style='position:absolute;top:6%;left:45%;width:54%;height:100%;display:flex;flex-direction:column;justify-content:center;padding:24px 32px 24px 24px;z-index:2;font-family:Arial, sans-serif;'>

        <div style="position:absolute;top:0%;left:0%;display:flex;flex-direction:column;justify-content:center;padding:24px 32px 24px 24px;z-index:2;font-family:Arial, sans-serif;">
          <div style='font-size:1.3em;font-weight:600; color:#fff;font-family:Arial, sans-serif;'>${
            form.name || "Mohamad"
          }</div>
          <div style='color:#c5e1a5; font-size:0.76em; margin-bottom:2px;font-weight:400;font-family:Arial, sans-serif;'>${
            form.department || "Marketing"
          }</div>
          <div style='font-size:0.76em; color:#fff;font-weight:400;font-family:Arial, sans-serif;'>Zain Middle East Properties LLC</div>
        </div>

        <div style='display:flex;flex-direction:column;justify-content:center;padding:24px 32px 24px 24px;z-index:2;font-family:Arial, sans-serif;'>
          <div style='position:absolute;top:54.7%;left:11%; margin-bottom:4px; font-size:0.66em;font-weight:400;font-family:Arial, sans-serif;text-align:left;'>${
            form.mobile || "[Mobile]"
          }</div>
          <div style='font-size:0.76em;font-weight:400;font-family:Arial, sans-serif;text-align:left; position:absolute;top:54%;left:47%;'><a href='mailto:${
            form.email
          }' style='color:#fff;'>${form.email || "[Email]"}</a></div>
        <div style='position:absolute;top:62.5%;left:11%; font-size:0.76em;font-weight:400;font-family:Arial, sans-serif;text-align:left;'><a href='https://zainme.com' style='color:#fff;'>www.zainme.com</a></div>
        <div style='position:absolute;top:62.5%;left:47%; font-size:0.76em;color:#fff;font-weight:400;font-family:Arial, sans-serif;text-align:left;'>
          <span>2304, C88 Tower <br/> Electra Street, Abu Dhabi</span>
        </div>
      </div>
    </div>
  `;

  const handleDownload = () => {
    const blob = new Blob(
      [
        `<!DOCTYPE html><html><head><meta charset='UTF-8'></head><body style='margin:0;'>${signatureHtml}</body></html>`,
      ],
      { type: "text/html" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `email-signature-${form.name || "employee"}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    if (navigator.clipboard && window.ClipboardItem) {
      const blob = new Blob([signatureHtml], { type: "text/html" });
      const clipboardItem = new window.ClipboardItem({ "text/html": blob });
      await navigator.clipboard.write([clipboardItem]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (navigator.clipboard) {
      // fallback: copy as plain text
      await navigator.clipboard.writeText(signatureHtml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadImage = async () => {
    if (previewRef.current) {
      const dataUrl = await htmlToImage.toPng(previewRef.current, {
        backgroundColor: "#111",
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `email-signature-${form.name || "employee"}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <h1 className="text-3xl font-extrabold mb-2 text-indigo-900 tracking-tight text-center drop-shadow-sm">
        Email Signature Generator
      </h1>
      <p className="mb-8 text-gray-700 text-center max-w-xl text-base">
        Fill in your details below to generate a professional email signature.
        Download the HTML and embed it in your Outlook signature settings.
      </p>
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-4xl">
        {/* Form */}
        <form
          className="flex-1 bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-5 border border-gray-200"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800 mb-1"
            >
              Full Name *
            </label>
            <input
              className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-indigo-300 outline-none text-base placeholder:text-gray-400"
              name="name"
              id="name"
              placeholder="e.g. Mohamad"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-semibold text-gray-800 mb-1"
            >
              Department *
            </label>
            <input
              className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-indigo-300 outline-none text-base placeholder:text-gray-400"
              name="department"
              id="department"
              placeholder="e.g. Marketing"
              value={form.department}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="mobile"
              className="block text-sm font-semibold text-gray-800 mb-1"
            >
              Mobile Number *
            </label>
            <input
              className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-indigo-300 outline-none text-base placeholder:text-gray-400"
              name="mobile"
              id="mobile"
              placeholder="e.g. +971 50 123 4567"
              value={form.mobile}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800 mb-1"
            >
              Email *
            </label>
            <input
              className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-indigo-300 outline-none text-base placeholder:text-gray-400"
              name="email"
              id="email"
              placeholder="e.g. john@zainme.com"
              value={form.email}
              onChange={handleChange}
              required
              type="email"
            />
          </div>
        </form>
        {/* Preview */}
        <div className="flex-1 flex flex-col items-center">
          <div className="mb-3 font-semibold text-gray-700 text-lg">
            Signature Preview
          </div>
          <div
            suppressHydrationWarning
            ref={previewRef}
            dangerouslySetInnerHTML={{ __html: signatureHtml }}
            style={{
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              background: "#111",
              borderRadius: 14,
              boxShadow: "0 2px 12px #0002",
              border: "1px solid #222",
              overflow: "hidden",
              position: "relative",
            }}
          />
          <button
            type="button"
            className="mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg px-4 py-2 font-semibold shadow hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy to Clipboard"}
          </button>
          <button
            type="button"
            className="mt-2 bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-lg px-4 py-2 font-semibold shadow hover:from-blue-800 hover:to-indigo-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            onClick={handleDownloadImage}
          >
            Download as Image
          </button>
        </div>
      </div>
    </div>
  );
}
