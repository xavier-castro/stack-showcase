"use client";

import React from "react";
import { FileUpload } from "~/components/file-upload";
import { TypographyH1 } from "~/components/typography/typography-h1";
import { TypographyH2 } from "~/components/typography/typography-h2";
import { AnalyticsCard } from "~/components/analytics-dashboard.card";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import {
  IconUser,
  IconTrendingUp,
  IconTrendingDown,
} from "@tabler/icons-react";

const sampleChartData = [
  { date: "2024-01-01", value: 100 },
  { date: "2024-01-02", value: 150 },
  { date: "2024-01-03", value: 120 },
  { date: "2024-01-04", value: 180 },
  { date: "2024-01-05", value: 200 },
  { date: "2024-01-06", value: 170 },
  { date: "2024-01-07", value: 220 },
];

export default function XCUIPage() {
  return (
    <main className="flex flex-col gap-4">
      <TypographyH1>XC UI Components</TypographyH1>

      <TypographyH2>File Upload</TypographyH2>
      <FileUpload />

      <div className="container mx-auto p-4">
        <h1 className="mb-6 text-2xl font-bold">Analytics Card Showcase</h1>
        <div className="grid grid-cols-1 gap-4 @md:grid-cols-2 @xl:grid-cols-3 @3xl:grid-cols-4">
          <AnalyticsCard
            title="Total Revenue"
            value={45231.89}
            formatter={(v) => `$${Number(v).toFixed(2)}`}
          />
          <AnalyticsCard
            title="Subscriptions"
            value={2350}
            change={12.5}
            timePeriod="last month"
            chartData={sampleChartData}
            visualization="sparkline"
            accentColor="var(--chart-2)"
          />
          <AnalyticsCard
            title="Direct Sales"
            description="Sales made directly through the website."
            value={12873.45}
            previousValue={14005.2}
            change={-8.1}
            timePeriod="vs last week"
            chartData={sampleChartData.slice().reverse()}
            visualization="area"
            footerText="Updated 1 hour ago"
            formatter={(v) => `$${Number(v).toFixed(2)}`}
            onRefresh={() => alert("Refreshing Direct Sales...")}
          />
          <AnalyticsCard
            title="Active Users"
            value={1250}
            change={5.2}
            timePeriod="last 24 hours"
            chartData={sampleChartData.map((d) => ({
              ...d,
              value: d.value * 0.8,
            }))}
            visualization="area"
            formatter={(v) => `${v} users`}
            actions={
              <>
                <DropdownMenuItem>
                  <IconUser className="mr-2 h-4 w-4" />
                  <span>View user list</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconTrendingUp className="mr-2 h-4 w-4" />
                  <span>Analyze trends</span>
                </DropdownMenuItem>
              </>
            }
          />
          <AnalyticsCard
            title="New Signups"
            value={350}
            change={-2.3}
            changeDirection="down"
            footerText="Data accuracy: High"
            visualization="none"
          />
          <AnalyticsCard
            title="Server Load"
            value={"Loading..."}
            isLoading={true}
          />
          <AnalyticsCard
            title="Conversion Rate"
            value={"5.6%"}
            change={0}
            changeDirection="neutral"
            timePeriod="this quarter"
          />
          <AnalyticsCard
            title="Pending Orders"
            value={42}
            visualization="none"
            variant="filled"
            accentColor="hsl(var(--warning))"
            actions={
              <>
                <DropdownMenuItem>
                  <span>Process orders</span>
                </DropdownMenuItem>
              </>
            }
          />
        </div>
      </div>
    </main>
  );
}
