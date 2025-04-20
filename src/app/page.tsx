import { FileUpload } from "~/components/file-upload";

export default async function Home() {
  return (
    <main className="">
      <h1>Landing</h1>
      <FileUpload />
    </main>
  );
}
