"use client";

import * as React from "react";
import {
  IconDots,
  IconDownload,
  IconInfoCircle,
  IconRefresh,
} from "@tabler/icons-react";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";

import { cn } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

type AnalyticsCardProps = {
  title: string;
  description?: string;
  value: number | string;
  previousValue?: number | string;
  change?: number;
  changeDirection?: "up" | "down" | "neutral";
  timePeriod?: string;
  chartData?: { date: string; value: number }[];
  visualization?: "sparkline" | "area" | "bar" | "none";
  formatter?: (value: number | string) => string;
  footerText?: string;
  actions?: React.ReactNode;
  className?: string;
  variant?: "default" | "filled";
  accentColor?: string;
  onRefresh?: () => void;
  isLoading?: boolean;
};

export function AnalyticsCard({
  title,
  description,
  value,
  previousValue,
  change,
  changeDirection,
  timePeriod = "vs last period",
  chartData = [],
  visualization = "sparkline",
  formatter = (val) => `${val}`,
  footerText,
  actions,
  className,
  variant = "default",
  accentColor,
  onRefresh,
  isLoading = false,
}: AnalyticsCardProps) {
  // Auto-determine change direction if not provided but change is
  let derivedDirection = changeDirection;
  if (change !== undefined && changeDirection === undefined) {
    derivedDirection = change > 0 ? "up" : change < 0 ? "down" : "neutral";
  }

  // Create a custom chart color based on change direction
  const chartColor =
    (accentColor ?? derivedDirection === "up")
      ? "var(--chart-1)"
      : derivedDirection === "down"
        ? "var(--destructive)"
        : "var(--muted-foreground)";

  return (
    <Card
      className={cn(
        "@container/analytics-card",
        variant === "filled" && "bg-accent",
        className,
      )}
    >
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <CardTitle className="text-base font-semibold">{title}</CardTitle>
              {description && (
                <TooltipProvider>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <IconInfoCircle className="text-muted-foreground h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-xs">{description}</p>
                    </TooltipContent>
                  </UITooltip>
                </TooltipProvider>
              )}
            </div>
            {isLoading ? (
              <div className="bg-muted h-8 w-28 animate-pulse rounded-md"></div>
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold tabular-nums @md/analytics-card:text-3xl">
                  {formatter(value)}
                </span>
                {change !== undefined && (
                  <Badge
                    variant="outline"
                    className={cn(
                      "font-medium",
                      derivedDirection === "up" &&
                        "border-green-200 text-green-500 dark:border-green-800 dark:text-green-400",
                      derivedDirection === "down" &&
                        "border-red-200 text-red-500 dark:border-red-800 dark:text-red-400",
                    )}
                  >
                    {derivedDirection === "up" ? "+" : ""}
                    {change.toFixed(1)}%
                  </Badge>
                )}
              </div>
            )}
            {previousValue !== undefined && (
              <CardDescription>
                Previous: {formatter(previousValue)}
              </CardDescription>
            )}
          </div>
          <div className="flex gap-1">
            {onRefresh && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={onRefresh}
                disabled={isLoading}
              >
                <IconRefresh
                  className={cn(
                    "h-4 w-4",
                    isLoading && "text-muted-foreground animate-spin",
                  )}
                />
                <span className="sr-only">Refresh</span>
              </Button>
            )}
            {actions && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <IconDots className="h-4 w-4" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {actions}
                  <DropdownMenuItem>
                    <IconDownload className="mr-2 h-4 w-4" />
                    <span>Download data</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-4">
        {visualization !== "none" && chartData.length > 0 && (
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient
                    id={`colorGradient-${title}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={chartColor}
                      stopOpacity={0.2}
                    />
                    <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload?.length) {
                      return (
                        <div className="bg-background rounded-md border px-3 py-1.5 shadow-sm">
                          <p className="text-xs">
                            {new Date(
                              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                              payload[0].payload.date,
                            ).toLocaleDateString()}
                          </p>
                          <p className="text-sm font-medium">
                            {formatter(payload[0].value)}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={chartColor}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#colorGradient-${title})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
      {footerText && (
        <CardFooter className="border-t px-4 py-3">
          <p className="text-muted-foreground text-xs">{footerText}</p>
        </CardFooter>
      )}
    </Card>
  );
}
