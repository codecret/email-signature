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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const EXPORT_WIDTH = 1000;
  const EXPORT_HEIGHT = 364;
  const PREVIEW_WIDTH = 500;
  const PREVIEW_HEIGHT = 200;

  const signatureHtml = `
   <div style="position:relative;width:${PREVIEW_WIDTH}px;height:${PREVIEW_HEIGHT}px;background:url('/email-sign.jpg') no-repeat center/cover; color:#fff; font-family:Arial, sans-serif; overflow:hidden;">
      <div style='position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(17,17,17,0.10);'></div>
      <div style='position:absolute;top:6%;left:45%;width:54%;height:100%;display:flex;flex-direction:column;justify-content:center;padding:24px 32px 24px 24px;z-index:2;font-family:Arial, sans-serif;'>

        <div style="position:absolute;top:0%;left:0%; margin-top: 0.4rem; display:flex;flex-direction:column;justify-content:center;padding:24px 32px 24px 14px;z-index:2;font-family:Arial, sans-serif;">
          <div style='font-size:1.08em;font-weight:600; color:#fff;font-family:Arial, sans-serif;'>${
            form.name || "Mohamad"
          }</div>
          <div style='color:#c5e1a5; font-size:0.70em; margin-bottom:2px;font-weight:400;font-family:Arial, sans-serif;'>${
            form.department || "Marketing"
          }</div>
          <div style='font-size:0.56em; color:#fff;font-weight:400;font-family:Arial, sans-serif;'>Zain Middle East Properties LLC</div>
        </div>

        <div style='display:flex;flex-direction:column;justify-content:center;padding:24px 32px 24px 4px;z-index:2;font-family:Arial, sans-serif;'>
          <div style='position:absolute;top:54.7%;left:11%; margin-bottom:4px; font-size:0.60em;font-weight:400;font-family:Arial, sans-serif;text-align:left;'>${
            form.mobile || "[Mobile]"
          }</div>
          <div style='font-size:0.60em;font-weight:400;font-family:Arial, sans-serif;text-align:left; position:absolute;top:54%;left:50%;'><a href='mailto:${
            form.email
          }' style='color:#fff;'>${form.email || "[Email]"}</a></div>
        <div style='position:absolute;top:62.9%;left:11%; font-size:0.60em;font-weight:400;font-family:Arial, sans-serif;text-align:left;'><a href='https://zainme.com' style='color:#fff;'>www.zainme.net</a></div>
        <div style='position:absolute;top:63.6%;left:50%; font-size:0.60em;color:#fff;font-weight:400;font-family:Arial, sans-serif;text-align:left;'>
          <span>2304, C88 Tower <br/> Electra Street, Abu Dhabi</span>
        </div>
      </div>
    </div>
  `;

  const exportHtml = `
    <div style="position:relative;width:${EXPORT_WIDTH}px;height:${EXPORT_HEIGHT}px;background:url('/background.jpg') no-repeat center/cover; color:#fff; font-family:Arial, sans-serif; overflow:hidden;">
      <div style='position:absolute;top:0;left:0;width:100%;margin-top:0.4rem;height:100%;background:rgba(17,17,17,0.10);'></div>
      <div style='position:absolute;top:6%;margin-top:0.4rem;left:45%;width:54%;height:100%;display:flex;flex-direction:column;justify-content:center;padding:24px 32px 24px 24px;z-index:2;font-family:Arial, sans-serif;'>

        <div style="position:absolute;top:0%;left:0%;margin-top:2rem;display:flex;flex-direction:column;justify-content:center;padding:24px 32px 0px 29px;z-index:2;font-family:Arial, sans-serif;">
          <div style='font-size:2em;font-weight:600; color:#fff;font-family:Arial, sans-serif; margin-bottom:-10px'>${
            form.name || "Mohamad"
          }</div>
          <div style='color:#c5e1a5; font-size:1.2em; margin-top:8px; font-weight:400;font-family:Arial, sans-serif;'>${
            form.department || "Marketing"
          }</div>
          <div style='font-size:1.2em; color:#fff;font-weight:400;font-family:Arial, sans-serif;'>Zain Middle East Properties LLC</div>
        </div>

        <div style='display:flex;flex-direction:column;justify-content:center;padding:4px 32px 24px 4px;z-index:2;font-family:Arial, sans-serif; margin-top:10px;'>
          <div style='position:absolute;top:53.3%;left:11%; margin-bottom:0px; font-size:1em;font-weight:400;font-family:Arial, sans-serif;text-align:left;'>${
            form.mobile || "[Mobile]"
          }</div>
          <div style='font-size:1em;font-weight:400;font-family:Arial, sans-serif;text-align:left; position:absolute;top:53.5%;left:47%;'><a href='mailto:${
            form.email
          }' style='color:#fff;'>${form.email || "[Email]"}</a></div>
        <div style='position:absolute;top:62%;left:11%; font-size:1em;font-weight:400;font-family:Arial, sans-serif;text-align:left;'><a href='https://zainme.com' style='color:#fff;'>www.zainme.net</a></div>
        <div style='position:absolute;top:62%;left:47%; font-size:1em;color:#fff;font-weight:400;font-family:Arial, sans-serif;text-align:left;'>
          <span>2304, C88 Tower <br/> Electra Street, Abu Dhabi</span>
        </div>
      </div>
    </div>
  `;

  const handleDownloadImage = async () => {
    if (previewRef.current) {
      // Save original content
      const originalContent = previewRef.current.innerHTML;
      // Set to export content
      previewRef.current.innerHTML = exportHtml;
      // Save original size
      const originalWidth = previewRef.current.style.width;
      const originalHeight = previewRef.current.style.height;

      try {
        const dataUrl = await htmlToImage.toPng(previewRef.current, {
          backgroundColor: "transparent",
          width: EXPORT_WIDTH,
          height: EXPORT_HEIGHT,
        });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `email-signature-${form.name || "employee"}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error generating image:", error);
      } finally {
        // Restore original content and size
        previewRef.current.innerHTML = originalContent;
        previewRef.current.style.width = originalWidth;
        previewRef.current.style.height = originalHeight;
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <h1 className="text-3xl font-extrabold mb-2 text-indigo-900 tracking-tight text-center drop-shadow-sm">
        Email Signature Generator
      </h1>
      <p className="mb-8 text-gray-700 text-center max-w-xl text-base">
        Fill in your details below to generate a professional email signature.
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
              width: PREVIEW_WIDTH,
              height: PREVIEW_HEIGHT,
              background: "transparent",
              borderRadius: 14,
              boxShadow: "0 2px 12px #0002",
              border: "1px solid #222",
              overflow: "hidden",
              position: "relative",
            }}
          />

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
