"use client";

import * as React from "react";
import {
  IconBell,
  IconCalendarEvent,
  IconCheck,
  IconClock,
  IconFile,
  IconFileText,
  IconInfoCircle,
  IconMail,
  IconMessageCircle,
  IconUser,
} from "@tabler/icons-react";

import { cn } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

type TimelineEvent = {
  id: string;
  title: string;
  description?: string;
  timestamp: Date | string;
  type:
    | "message"
    | "notification"
    | "user"
    | "document"
    | "calendar"
    | "info"
    | "email"
    | "task"
    | "custom";
  status?: "pending" | "in-progress" | "completed" | "cancelled";
  user?: {
    name: string;
    avatar?: string;
    email?: string;
  };
  link?: string;
  isUnread?: boolean;
  customIcon?: React.ReactNode;
  meta?: Record<string, any>;
};

type TimelineProps = {
  events: TimelineEvent[];
  onEventClick?: (event: TimelineEvent) => void;
  className?: string;
  showDateDividers?: boolean;
  isInteractive?: boolean;
};

export function Timeline({
  events,
  onEventClick,
  className,
  showDateDividers = true,
  isInteractive = true,
}: TimelineProps) {
  // Sort events chronologically
  const sortedEvents = React.useMemo(() => {
    return [...events].sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return dateB - dateA; // Newest first
    });
  }, [events]);

  // Group events by date
  const groupedEvents = React.useMemo(() => {
    if (!showDateDividers) return { [""]: sortedEvents };

    return sortedEvents.reduce<Record<string, TimelineEvent[]>>(
      (groups, event) => {
        const date = new Date(event.timestamp);
        const dateStr = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        if (!groups[dateStr]) {
          groups[dateStr] = [];
        }
        groups[dateStr].push(event);
        return groups;
      },
      {},
    );
  }, [sortedEvents, showDateDividers]);

  return (
    <div className={cn("relative flex flex-col gap-2", className)}>
      {Object.entries(groupedEvents).map(([date, dateEvents], dateIndex) => (
        <React.Fragment key={date || dateIndex}>
          {date && (
            <div className="bg-background/95 sticky top-0 z-10 -mx-4 px-4 py-2 backdrop-blur">
              <div className="text-muted-foreground font-medium">{date}</div>
            </div>
          )}
          <div className="relative border-l border-dashed pt-2 pb-2 pl-6">
            {dateEvents.map((event, eventIndex) => (
              <TimelineItem
                key={event.id}
                event={event}
                isLast={eventIndex === dateEvents.length - 1}
                onClick={() => onEventClick?.(event)}
                isInteractive={isInteractive}
              />
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

type TimelineItemProps = {
  event: TimelineEvent;
  isLast: boolean;
  onClick: () => void;
  isInteractive: boolean;
};

function TimelineItem({
  event,
  isLast,
  onClick,
  isInteractive,
}: TimelineItemProps) {
  const time = new Date(event.timestamp).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div
      className={cn(
        "group relative -ml-6 pb-8 last:pb-0",
        isInteractive && "cursor-pointer",
        event.isUnread && "bg-accent/20",
      )}
      onClick={isInteractive ? onClick : undefined}
    >
      <div className="absolute top-0 left-0 flex size-12 items-center justify-center">
        <div
          className={cn(
            "group bg-background relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border",
            getTimelineItemStyle(event.type).iconContainerClass,
          )}
        >
          {renderEventIcon(event)}
        </div>
      </div>
      <div className="ml-12 space-y-1">
        <div className="flex items-center gap-2">
          <div className="font-medium">{event.title}</div>
          {event.status && (
            <Badge
              variant="outline"
              className={cn(
                getTimelineItemStyle(event.type).badgeClass,
                getStatusStyle(event.status).badgeClass,
              )}
            >
              {event.status.replace("-", " ")}
            </Badge>
          )}
          {event.isUnread && (
            <div className="bg-primary ml-1 size-2 rounded-full" />
          )}
        </div>
        {event.description && (
          <div className="text-muted-foreground text-sm">
            {event.description}
          </div>
        )}
        <div className="text-muted-foreground flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <IconClock className="h-3.5 w-3.5" />
            <span>{time}</span>
          </div>
          {event.user && (
            <div className="flex items-center gap-1.5">
              <Avatar className="h-4 w-4">
                <AvatarImage src={event.user.avatar} alt={event.user.name} />
                <AvatarFallback className="text-[8px]">
                  {event.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span>{event.user.name}</span>
            </div>
          )}
        </div>
        {event.link && (
          <div className="pt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                window.open(event.link, "_blank");
              }}
            >
              View details
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function renderEventIcon(event: TimelineEvent) {
  if (event.customIcon) {
    return event.customIcon;
  }

  switch (event.type) {
    case "message":
      return <IconMessageCircle className="h-3.5 w-3.5" />;
    case "notification":
      return <IconBell className="h-3.5 w-3.5" />;
    case "user":
      return <IconUser className="h-3.5 w-3.5" />;
    case "document":
      return <IconFile className="h-3.5 w-3.5" />;
    case "calendar":
      return <IconCalendarEvent className="h-3.5 w-3.5" />;
    case "info":
      return <IconInfoCircle className="h-3.5 w-3.5" />;
    case "email":
      return <IconMail className="h-3.5 w-3.5" />;
    case "task":
      return <IconFileText className="h-3.5 w-3.5" />;
    default:
      return <IconInfoCircle className="h-3.5 w-3.5" />;
  }
}

function getTimelineItemStyle(type: TimelineEvent["type"]) {
  switch (type) {
    case "message":
      return {
        iconContainerClass: "border-blue-200 text-blue-500",
        badgeClass: "border-blue-200 text-blue-500",
      };
    case "notification":
      return {
        iconContainerClass: "border-orange-200 text-orange-500",
        badgeClass: "border-orange-200 text-orange-500",
      };
    case "user":
      return {
        iconContainerClass: "border-indigo-200 text-indigo-500",
        badgeClass: "border-indigo-200 text-indigo-500",
      };
    case "document":
      return {
        iconContainerClass: "border-sky-200 text-sky-500",
        badgeClass: "border-sky-200 text-sky-500",
      };
    case "calendar":
      return {
        iconContainerClass: "border-purple-200 text-purple-500",
        badgeClass: "border-purple-200 text-purple-500",
      };
    case "info":
      return {
        iconContainerClass: "border-gray-200 text-gray-500",
        badgeClass: "border-gray-200 text-gray-500",
      };
    case "email":
      return {
        iconContainerClass: "border-blue-200 text-blue-500",
        badgeClass: "border-blue-200 text-blue-500",
      };
    case "task":
      return {
        iconContainerClass: "border-green-200 text-green-500",
        badgeClass: "border-green-200 text-green-500",
      };
    default:
      return {
        iconContainerClass: "border-gray-200 text-gray-500",
        badgeClass: "border-gray-200 text-gray-500",
      };
  }
}

function getStatusStyle(status: string) {
  switch (status) {
    case "completed":
      return {
        badgeClass: "border-green-200 text-green-500",
      };
    case "pending":
      return {
        badgeClass: "border-yellow-200 text-yellow-500",
      };
    case "in-progress":
      return {
        badgeClass: "border-blue-200 text-blue-500",
      };
    case "cancelled":
      return {
        badgeClass: "border-red-200 text-red-500",
      };
    default:
      return {
        badgeClass: "border-gray-200 text-gray-500",
      };
  }
}
