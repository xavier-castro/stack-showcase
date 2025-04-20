import React from "react";
import { FileUpload } from "~/components/file-upload";
import { TypographyH1 } from "~/components/typography/typography-h1";
import { TypographyH2 } from "~/components/typography/typography-h2";

export default function XCUIPage() {
  return (
    <main className="flex flex-col gap-4">
      <TypographyH1>XC UI Components</TypographyH1>

      <TypographyH2>File Upload</TypographyH2>
      <FileUpload />
    </main>
  );
}
