import { FileUpload } from "~/components/file-upload";
import { TypographyH1 } from "~/components/typography/typography-h1";
export default async function Home() {
  return (
    <main className="">
      <TypographyH1>Landing Page</TypographyH1>
      <FileUpload />
    </main>
  );
}
