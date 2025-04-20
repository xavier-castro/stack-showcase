"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, Circle, X } from "lucide-react";

import { cn } from "~/lib/utils";

const timelineVariants = cva("grid", {
  variants: {
    positions: {
      left: "[&>li]:grid-cols-[0_min-content_1fr]",
      right: "[&>li]:grid-cols-[1fr_min-content]",
      center: "[&>li]:grid-cols-[1fr_min-content_1fr]",
    },
  },
  defaultVariants: {
    positions: "left",
  },
});

interface TimelineProps
  extends React.HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof timelineVariants> {}

const Timeline = React.forwardRef<HTMLUListElement, TimelineProps>(
  ({ children, className, positions, ...props }, ref) => {
    return (
      <ul
        className={cn(timelineVariants({ positions }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </ul>
    );
  }
);
Timeline.displayName = "Timeline";

export interface TimelineItemStatus {
  id: string;
  label: string;
  date: Date;
  status: "pending" | "in-progress" | "completed" | "error";
  description?: string;
}

const timelineItemVariants = cva("grid items-center gap-x-2", {
  variants: {
    status: {
      pending: "text-muted-foreground",
      "in-progress": "text-primary",
      completed: "text-primary",
      error: "text-destructive",
    },
  },
  defaultVariants: {
    status: "pending",
  },
});

interface TimelineItemProps
  extends React.HTMLAttributes<HTMLLIElement>,
    Omit<VariantProps<typeof timelineItemVariants>, "status"> {
  status?: "pending" | "in-progress" | "completed" | "error";
}

const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, status = "pending", ...props }, ref) => (
    <li
      className={cn(timelineItemVariants({ status }), className)}
      ref={ref}
      {...props}
    />
  )
);
TimelineItem.displayName = "TimelineItem";

const timelineDotVariants = cva(
  "col-start-2 col-end-3 row-start-1 row-end-1 flex size-5 items-center justify-center rounded-full border border-current",
  {
    variants: {
      status: {
        pending: "[&>*]:hidden",
        "in-progress":
          "[&>*:not(.lucide-circle)]:hidden [&>.lucide-circle]:fill-current [&>.lucide-circle]:text-current",
        completed:
          "bg-primary [&>*:not(.lucide-check)]:hidden [&>.lucide-check]:text-background",
        error:
          "border-destructive bg-destructive [&>*:not(.lucide-x)]:hidden [&>.lucide-x]:text-background",
        custom: "[&>*:not(:nth-child(4))]:hidden [&>*:nth-child(4)]:block",
      },
    },
    defaultVariants: {
      status: "pending",
    },
  }
);

interface TimelineDotProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof timelineDotVariants>, "status"> {
  status?: "pending" | "in-progress" | "completed" | "error" | "custom";
  customIcon?: React.ReactNode;
}

const TimelineDot = React.forwardRef<HTMLDivElement, TimelineDotProps>(
  ({ className, status = "pending", customIcon, ...props }, ref) => (
    <div
      role="status"
      className={cn(
        "timeline-dot",
        timelineDotVariants({ status }),
        className
      )}
      ref={ref}
      {...props}
    >
      <Circle className="size-2.5" />
      <Check className="size-3" />
      <X className="size-3" />
      {customIcon}
    </div>
  )
);
TimelineDot.displayName = "TimelineDot";

const timelineContentVariants = cva(
  "row-start-2 row-end-2 pb-8 text-muted-foreground",
  {
    variants: {
      side: {
        right: "col-start-3 col-end-4 mr-auto text-left",
        left: "col-start-1 col-end-2 ml-auto text-right",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

interface TimelineContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineContentVariants> {}

const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ className, side, ...props }, ref) => (
    <div
      className={cn(timelineContentVariants({ side }), className)}
      ref={ref}
      {...props}
    />
  )
);
TimelineContent.displayName = "TimelineContent";

const timelineHeadingVariants = cva(
  "row-start-1 row-end-1 line-clamp-1 max-w-full truncate",
  {
    variants: {
      side: {
        right: "col-start-3 col-end-4 mr-auto text-left",
        left: "col-start-1 col-end-2 ml-auto text-right",
      },
      variant: {
        primary: "text-base font-medium text-primary",
        secondary: "text-sm font-light text-muted-foreground",
      },
    },
    defaultVariants: {
      side: "right",
      variant: "primary",
    },
  }
);

interface TimelineHeadingProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof timelineHeadingVariants> {}

const TimelineHeading = React.forwardRef<
  HTMLParagraphElement,
  TimelineHeadingProps
>(({ className, side, variant, ...props }, ref) => (
  <p
    role="heading"
    aria-level={variant === "primary" ? 2 : 3}
    className={cn(timelineHeadingVariants({ side, variant }), className)}
    ref={ref}
    {...props}
  />
));
TimelineHeading.displayName = "TimelineHeading";

interface TimelineLineProps extends React.HTMLAttributes<HTMLHRElement> {
  done?: boolean;
}

const TimelineLine = React.forwardRef<HTMLHRElement, TimelineLineProps>(
  ({ className, done = false, ...props }, ref) => {
    return (
      <hr
        role="separator"
        aria-orientation="vertical"
        className={cn(
          "col-start-2 col-end-3 row-start-2 row-end-2 mx-auto flex h-full min-h-16 w-0.5 justify-center rounded-full",
          done ? "bg-primary" : "bg-muted",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
TimelineLine.displayName = "TimelineLine";

interface TimelineDateProps extends React.HTMLAttributes<HTMLDivElement> {
  date: Date;
}

const TimelineDate = React.forwardRef<HTMLDivElement, TimelineDateProps>(
  ({ className, date, ...props }, ref) => {
    return (
      <div
        className={cn(
          "col-start-2 col-end-3 row-start-1 row-end-1 mt-1 flex items-center justify-center text-xs text-muted-foreground",
          className
        )}
        ref={ref}
        {...props}
      >
        <time dateTime={date.toISOString()}>
          {date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
          })}
        </time>
      </div>
    );
  }
);
TimelineDate.displayName = "TimelineDate";

// Main component that renders the interactive timeline
export function InteractiveTimeline({
  items,
  className,
  positions = "left",
}: {
  items: TimelineItemStatus[];
  className?: string;
  positions?: "left" | "right" | "center";
}) {
  return (
    <Timeline positions={positions} className={className}>
      {items.map((item, index) => (
        <TimelineItem key={item.id} status={item.status}>
          <TimelineHeading side={positions === "left" ? "left" : "right"}>
            {item.label}
          </TimelineHeading>
          <TimelineDot status={item.status} />
          {index < items.length - 1 && <TimelineLine done={item.status === "completed"} />}
          <TimelineContent side={positions === "left" ? "right" : "left"}>
            {item.description}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

export {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineHeading,
  TimelineLine,
  TimelineDate,
};