"use client";

import * as React from "react";
import {
  IconArrowDown,
  IconArrowUp,
  IconInfoCircle,
} from "@tabler/icons-react";
import { BarChart, Bar, Cell, ResponsiveContainer } from "recharts";

import { cn } from "~/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

type KpiComparisonProps = {
  title: string;
  description?: string;
  currentValue: number;
  previousValue: number;
  targetValue: number;
  timeframe: string;
  format?: (value: number) => string;
  className?: string;
};

export function KpiComparison({
  title,
  description,
  currentValue,
  previousValue,
  targetValue,
  timeframe,
  format = (value) => value.toLocaleString(),
  className,
}: KpiComparisonProps) {
  const percentChange = ((currentValue - previousValue) / previousValue) * 100;
  const isPositive = percentChange >= 0;
  const comparedToTarget = ((currentValue - targetValue) / targetValue) * 100;
  const isAboveTarget = comparedToTarget >= 0;

  const chartData = [
    {
      name: "Previous",
      value: previousValue,
    },
    {
      name: "Current",
      value: currentValue,
    },
    {
      name: "Target",
      value: targetValue,
    },
  ];

  return (
    <Card className={cn("@container/kpi", className)}>
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">{title}</CardTitle>
            {description && (
              <CardDescription className="mt-0.5">
                {description}
              </CardDescription>
            )}
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <IconInfoCircle className="text-muted-foreground h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-xs">
                  Comparison between {timeframe} and previous period. Target is
                  shown for reference.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 @[300px]/kpi:flex-row @[300px]/kpi:items-end">
          <div className="flex-1 space-y-1">
            <div className="text-3xl font-semibold tabular-nums">
              {format(currentValue)}
            </div>
            <div className="flex items-center gap-1 text-sm">
              <div className="flex items-center gap-0.5">
                {isPositive ? (
                  <IconArrowUp
                    className="h-3.5 w-3.5 text-green-500 dark:text-green-400"
                    stroke={3}
                  />
                ) : (
                  <IconArrowDown
                    className="h-3.5 w-3.5 text-red-500 dark:text-red-400"
                    stroke={3}
                  />
                )}
                <span
                  className={cn(
                    "font-medium",
                    isPositive
                      ? "text-green-500 dark:text-green-400"
                      : "text-red-500 dark:text-red-400",
                  )}
                >
                  {Math.abs(percentChange).toFixed(1)}%
                </span>
              </div>
              <span className="text-muted-foreground">vs previous</span>
            </div>

            <div className="mt-2 flex items-center gap-1 text-sm">
              <div className="flex items-center gap-0.5">
                {isAboveTarget ? (
                  <IconArrowUp
                    className="h-3.5 w-3.5 text-green-500 dark:text-green-400"
                    stroke={3}
                  />
                ) : (
                  <IconArrowDown
                    className="h-3.5 w-3.5 text-red-500 dark:text-red-400"
                    stroke={3}
                  />
                )}
                <span
                  className={cn(
                    "font-medium",
                    isAboveTarget
                      ? "text-green-500 dark:text-green-400"
                      : "text-red-500 dark:text-red-400",
                  )}
                >
                  {Math.abs(comparedToTarget).toFixed(1)}%
                </span>
              </div>
              <span className="text-muted-foreground">vs target</span>
            </div>
          </div>
          <div className="h-24 w-24 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              >
                <Bar dataKey="value">
                  {chartData.map((entry, index) => {
                    let color = "var(--muted)";
                    if (index === 0) color = "var(--muted-foreground)";
                    if (index === 1) color = "var(--primary)";
                    if (index === 2) color = "var(--secondary)";
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
