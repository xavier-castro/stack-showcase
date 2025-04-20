import { FileUpload } from "~/components/app/file-upload";
import { TypographyH1 } from "~/components/typography/typography-h1";
import { TypographyH2 } from "~/components/typography/typography-h2";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="container py-10">
      <TypographyH1>Stack Showcase</TypographyH1>
      <p className="text-muted-foreground mt-4">
        A collection of UI components and patterns built with Next.js, Tailwind
        CSS, and Shadcn UI.
      </p>

      <div className="mt-8">
        <TypographyH2>UI Components</TypographyH2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Link href="/shadcn" className="group">
            <div className="group-hover:border-primary rounded-lg border p-4 transition-colors">
              <h3 className="text-lg font-medium">Basic UI</h3>
              <p className="text-muted-foreground mt-2 line-clamp-1 text-sm">
                Basic ShadCN Components
              </p>
            </div>
          </Link>

          <Link href="/form-management" className="group">
            <div className="group-hover:border-primary rounded-lg border p-4 transition-colors">
              <h3 className="text-lg font-medium">Form Management</h3>
              <p className="text-muted-foreground mt-2 line-clamp-1 text-sm">
                Form components with validation using React Hook Form and Zod.
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <TypographyH2>Niche but Nice</TypographyH2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Link href="/analytics-demo" className="group">
            <div className="group-hover:border-primary rounded-lg border p-4 transition-colors">
              <h3 className="text-lg font-medium">Analytics Dashboard Cards</h3>
              <p className="text-muted-foreground mt-2 line-clamp-1 text-sm">
                Cards for displaying metrics and data visualizations.
              </p>
            </div>
          </Link>

          <Link href="/timeline-demo" className="group">
            <div className="group-hover:border-primary rounded-lg border p-4 transition-colors">
              <h3 className="text-lg font-medium">Interactive Timeline</h3>
              <p className="text-muted-foreground mt-2 line-clamp-1 text-sm">
                Displays chronological events with status indicators.
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div className="mt-10 rounded-lg border p-6">
        <TypographyH2>File Upload Component</TypographyH2>
        <p className="text-muted-foreground mt-2 mb-6">
          A drag-and-drop file upload component with progress indicators.
        </p>
        <FileUpload />
      </div>
    </main>
  );
}
