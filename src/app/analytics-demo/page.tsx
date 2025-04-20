"use client";

import React, { useState } from "react";
import { TypographyH1 } from "~/components/typography/typography-h1";
import { TypographyH2 } from "~/components/typography/typography-h2";
import { AnalyticsCard } from "~/components/app/analytics-dashboard.card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  IconTrendingUp,
  IconUsers,
  IconRefresh,
  IconCreditCard,
} from "@tabler/icons-react";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";

export default function AnalyticsDemoPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const sampleChartData = [
    { date: "2024-01-01", value: 100 },
    { date: "2024-01-02", value: 150 },
    { date: "2024-01-03", value: 120 },
    { date: "2024-01-04", value: 180 },
    { date: "2024-01-05", value: 200 },
    { date: "2024-01-06", value: 170 },
    { date: "2024-01-07", value: 220 },
  ];

  const negativeChartData = [
    { date: "2024-01-01", value: 220 },
    { date: "2024-01-02", value: 200 },
    { date: "2024-01-03", value: 180 },
    { date: "2024-01-04", value: 150 },
    { date: "2024-01-05", value: 140 },
    { date: "2024-01-06", value: 130 },
    { date: "2024-01-07", value: 100 },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <main className="container py-10">
      <TypographyH1>Analytics Dashboard Cards</TypographyH1>
      <p className="text-muted-foreground mt-4">
        Customizable cards for displaying key metrics, trends, and data
        visualizations.
      </p>

      <Tabs defaultValue="variations" className="mt-8">
        <TabsList>
          <TabsTrigger value="variations">Design Variations</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard Example</TabsTrigger>
        </TabsList>
        <TabsContent value="variations">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Card Variations</CardTitle>
              <CardDescription>
                Different styles and features of the analytics card component
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <AnalyticsCard
                  title="Basic Card"
                  value={45231.89}
                  formatter={(v) => `$${Number(v).toFixed(2)}`}
                  visualization="none"
                />

                <AnalyticsCard
                  title="With Change"
                  value={2350}
                  change={12.5}
                  timePeriod="last month"
                  visualization="none"
                />

                <AnalyticsCard
                  title="With Chart"
                  value={12873.45}
                  change={8.1}
                  chartData={sampleChartData}
                  visualization="area"
                  formatter={(v) =>
                    typeof v === "number" ? `$${v.toFixed(2)}` : v
                  }
                />

                <AnalyticsCard
                  title="Negative Trend"
                  value={950}
                  change={-5.2}
                  chartData={negativeChartData}
                  visualization="area"
                />

                <AnalyticsCard
                  title="With Description"
                  description="Detailed explanation about this metric and what it represents in the overall analytics"
                  value="5.6%"
                  change={0}
                  changeDirection="neutral"
                  visualization="none"
                />

                <AnalyticsCard
                  title="Loading State"
                  value={"Loading..."}
                  isLoading={true}
                  visualization="none"
                />

                <AnalyticsCard
                  title="Filled Variant"
                  value={42}
                  visualization="none"
                  variant="filled"
                  accentColor="hsl(var(--warning))"
                />

                <AnalyticsCard
                  title="With Previous"
                  value={12873.45}
                  previousValue={14005.2}
                  change={-8.1}
                  visualization="none"
                  formatter={(v) =>
                    typeof v === "number" ? `$${v.toFixed(2)}` : v
                  }
                />

                <AnalyticsCard
                  title="With Footer"
                  value={350}
                  footerText="Last updated: 2 hours ago"
                  visualization="none"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dashboard">
          <div className="mt-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <AnalyticsCard
                title="Revenue"
                value={45231.89}
                change={12.5}
                timePeriod="vs last month"
                chartData={sampleChartData}
                visualization="area"
                footerText="Updated 1 hour ago"
                formatter={(v) =>
                  typeof v === "number" ? `$${v.toFixed(2)}` : v
                }
                onRefresh={handleRefresh}
                isLoading={isRefreshing}
              />

              <AnalyticsCard
                title="New Users"
                value={2350}
                change={8.1}
                timePeriod="last 7 days"
                chartData={sampleChartData}
                visualization="sparkline"
                accentColor="hsl(var(--success))"
                actions={
                  <>
                    <DropdownMenuItem>
                      <IconUsers className="mr-2 h-4 w-4" />
                      <span>View user details</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <IconTrendingUp className="mr-2 h-4 w-4" />
                      <span>View growth report</span>
                    </DropdownMenuItem>
                  </>
                }
              />

              <AnalyticsCard
                title="Conversion Rate"
                value="3.2%"
                previousValue="2.8%"
                change={14.3}
                timePeriod="vs last month"
                chartData={sampleChartData}
                visualization="sparkline"
                footerText="Based on website visits"
              />

              <AnalyticsCard
                title="Average Order Value"
                value={129.99}
                change={-3.5}
                timePeriod="vs last week"
                chartData={negativeChartData}
                visualization="area"
                formatter={(v) =>
                  typeof v === "number" ? `$${v.toFixed(2)}` : v
                }
              />

              <AnalyticsCard
                title="Churn Rate"
                value="2.4%"
                change={-0.5}
                changeDirection="up" // In this case, an increase in churn is bad
                timePeriod="last quarter"
                chartData={sampleChartData.slice().reverse()}
                visualization="area"
                accentColor="hsl(var(--destructive))"
              />

              <AnalyticsCard
                title="Total Customers"
                value={15482}
                change={5.3}
                timePeriod="year to date"
                visualization="sparkline"
                actions={
                  <>
                    <DropdownMenuItem>
                      <IconUsers className="mr-2 h-4 w-4" />
                      <span>Customer segments</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <IconRefresh className="mr-2 h-4 w-4" />
                      <span>Retention report</span>
                    </DropdownMenuItem>
                  </>
                }
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12">
        <TypographyH2>Usage Instructions</TypographyH2>
        <div className="text-muted-foreground mt-4 space-y-4">
          <p>
            The AnalyticsCard component provides a versatile way to display
            metrics and data visualizations.
          </p>
          <p>
            Import the component from{" "}
            <code>~/components/app/analytics-dashboard.card</code> and customize
            it with various props.
          </p>
          <p>
            Required props: <code>title</code> and <code>value</code>
          </p>
          <p>
            Optional features:
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Chart visualization (area or sparkline)</li>
              <li>Trend indicators (change percentage with up/down status)</li>
              <li>Custom formatting</li>
              <li>Interactive elements (refresh, dropdown actions)</li>
              <li>Loading state</li>
              <li>Visual variants (default or filled)</li>
            </ul>
          </p>
        </div>
      </div>
    </main>
  );
}

