import { FileUpload } from "~/components/app/file-upload";
import { TypographyH1 } from "~/components/typography/typography-h1";
import { TypographyH2 } from "~/components/typography/typography-h2";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default async function Home() {
  return (
    <main className="container py-10">
      <TypographyH1>Stack Showcase</TypographyH1>
      <p className="mt-4 text-muted-foreground">
        A collection of UI components and patterns built with Next.js, Tailwind CSS, and Shadcn UI.
      </p>
      
      <div className="mt-8">
        <TypographyH2>UI Components</TypographyH2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/shadcn" className="group">
            <div className="border rounded-lg p-4 transition-colors group-hover:border-primary">
              <h3 className="text-lg font-medium">Shadcn UI</h3>
              <p className="text-muted-foreground text-sm mt-2">
                A collection of reusable components built on top of Radix UI and Tailwind CSS.
              </p>
            </div>
          </Link>
          
          <Link href="/xc-ui" className="group">
            <div className="border rounded-lg p-4 transition-colors group-hover:border-primary">
              <h3 className="text-lg font-medium">XC UI</h3>
              <p className="text-muted-foreground text-sm mt-2">
                Custom UI components built for this showcase.
              </p>
            </div>
          </Link>
          
          <Link href="/form-management" className="group">
            <div className="border rounded-lg p-4 transition-colors group-hover:border-primary">
              <h3 className="text-lg font-medium">Form Management</h3>
              <p className="text-muted-foreground text-sm mt-2">
                Form components with validation using React Hook Form and Zod.
              </p>
            </div>
          </Link>
        </div>
      </div>
      
      <div className="mt-8">
        <TypographyH2>New Components</TypographyH2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/analytics-demo" className="group">
            <div className="border rounded-lg p-4 transition-colors group-hover:border-primary">
              <h3 className="text-lg font-medium">Analytics Dashboard Cards</h3>
              <p className="text-muted-foreground text-sm mt-2">
                Interactive cards for displaying metrics and data visualizations.
              </p>
            </div>
          </Link>
          
          <Link href="/timeline-demo" className="group">
            <div className="border rounded-lg p-4 transition-colors group-hover:border-primary">
              <h3 className="text-lg font-medium">Interactive Timeline</h3>
              <p className="text-muted-foreground text-sm mt-2">
                A timeline component for displaying chronological events with status indicators.
              </p>
            </div>
          </Link>
        </div>
      </div>
      
      <div className="mt-10 border rounded-lg p-6">
        <TypographyH2>File Upload Component</TypographyH2>
        <p className="mt-2 text-muted-foreground mb-6">
          A drag-and-drop file upload component with progress indicators.
        </p>
        <FileUpload />
      </div>
    </main>
  );
}
