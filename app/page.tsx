import React from "react";
import EmailSignatureGenerator from "./components/File";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Signature Generator",
  description: "Generate professional email signatures with ease",
};

export default function page() {
  return (
    <div>
      <EmailSignatureGenerator />
    </div>
  );
}
