"use client";

import React from "react";
import { TypographyH1 } from "~/components/typography/typography-h1";
import { TypographyH2 } from "~/components/typography/typography-h2";
import {
  InteractiveTimeline,
  type TimelineItemStatus,
} from "~/components/app/interactive-timeline";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function TimelineDemoPage() {
  const projectTimeline: TimelineItemStatus[] = [
    {
      id: "1",
      label: "Project Kickoff",
      date: new Date(2023, 10, 15),
      status: "completed",
      description:
        "Initial planning and scope definition for the project. Team members assigned and resources allocated.",
    },
    {
      id: "2",
      label: "Design Phase",
      date: new Date(2023, 11, 1),
      status: "completed",
      description:
        "UI/UX design and approval of wireframes. Stakeholders provided feedback on initial mockups.",
    },
    {
      id: "3",
      label: "Development Sprint 1",
      date: new Date(2024, 0, 15),
      status: "completed",
      description:
        "Core functionality development including authentication and basic user flows.",
    },
    {
      id: "4",
      label: "Development Sprint 2",
      date: new Date(2024, 1, 1),
      status: "in-progress",
      description:
        "Advanced features implementation including analytics dashboard and reporting tools.",
    },
    {
      id: "5",
      label: "QA Testing",
      date: new Date(2024, 2, 1),
      status: "pending",
      description:
        "Comprehensive testing of all features and user flows. Bug fixes and performance optimization.",
    },
    {
      id: "6",
      label: "Launch",
      date: new Date(2024, 3, 1),
      status: "pending",
      description:
        "Product launch to production environment and initial customer onboarding.",
    },
  ];

  const supportTicketTimeline: TimelineItemStatus[] = [
    {
      id: "ticket-1",
      label: "Ticket Submitted",
      date: new Date(2024, 3, 15),
      status: "completed",
      description:
        "Customer reported an issue with payment processing on mobile devices.",
    },
    {
      id: "ticket-2",
      label: "Initial Assessment",
      date: new Date(2024, 3, 16),
      status: "completed",
      description:
        "Support team reproduced the issue and escalated to development team.",
    },
    {
      id: "ticket-3",
      label: "Development Investigation",
      date: new Date(2024, 3, 17),
      status: "error",
      description:
        "Issue identified as a compatibility problem with certain mobile browsers. Fix requires API modification.",
    },
    {
      id: "ticket-4",
      label: "Fix Implementation",
      date: new Date(2024, 3, 18),
      status: "in-progress",
      description: "Development team working on implementing the solution.",
    },
    {
      id: "ticket-5",
      label: "QA Verification",
      date: new Date(2024, 3, 20),
      status: "pending",
      description: "Fix to be verified across multiple devices and browsers.",
    },
    {
      id: "ticket-6",
      label: "Deployment",
      date: new Date(2024, 3, 21),
      status: "pending",
      description: "Scheduled deployment of the fix to production environment.",
    },
  ];

  return (
    <main className="container py-10">
      <TypographyH1>Interactive Timeline Component</TypographyH1>
      <p className="text-muted-foreground mt-4">
        A versatile timeline component for displaying chronological events with
        status indicators.
      </p>

      <Tabs defaultValue="project" className="mt-8">
        <TabsList>
          <TabsTrigger value="project">Project Timeline</TabsTrigger>
          <TabsTrigger value="ticket">Support Ticket</TabsTrigger>
        </TabsList>
        <TabsContent value="project">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Product Development Timeline</CardTitle>
              <CardDescription>
                Track the progress of our software development lifecycle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InteractiveTimeline items={projectTimeline} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ticket">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Support Ticket Timeline</CardTitle>
              <CardDescription>
                Track the resolution process for customer support case #12345
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InteractiveTimeline
                items={supportTicketTimeline}
                positions="left"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-12">
        <TypographyH2>Usage Instructions</TypographyH2>
        <div className="text-muted-foreground mt-4 space-y-4">
          <p>
            The InteractiveTimeline component provides a clean way to display
            chronological events with status indicators.
          </p>
          <p>
            Import the component from{" "}
            <code>~/components/app/interactive-timeline</code> and provide an
            array of timeline items.
          </p>
          <p>
            Each timeline item requires an id, label, date, and status. The
            description is optional.
          </p>
          <p>
            Available status types: <code>pending</code>,{" "}
            <code>in-progress</code>, <code>completed</code>, <code>error</code>
          </p>
          <p>
            You can customize the position of the timeline with the{" "}
            <code>positions</code> prop: <code>left</code>, <code>right</code>,
            or <code>center</code>.
          </p>
        </div>
      </div>
    </main>
  );
}

