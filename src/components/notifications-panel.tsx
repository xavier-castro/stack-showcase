"use client";

import * as React from "react";
import {
  IconBell,
  IconBellOff,
  IconCheck,
  IconDots,
  IconShield,
  IconTrash,
  IconUser,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

type NotificationType =
  | "message"
  | "mention"
  | "follow"
  | "like"
  | "comment"
  | "system"
  | "security";

type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  description?: string;
  timestamp: Date | string;
  read: boolean;
  user?: {
    name: string;
    avatar?: string;
  };
  link?: string;
};

type NotificationsPanelProps = {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDelete: (id: string) => void;
  onDeleteAll: () => void;
  onNotificationClick?: (notification: Notification) => void;
  className?: string;
};

export function NotificationsPanel({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onDeleteAll,
  onNotificationClick,
  className,
}: NotificationsPanelProps) {
  const [activeTab, setActiveTab] = React.useState("all");

  const filteredNotifications = React.useMemo(() => {
    if (activeTab === "all") return notifications;
    if (activeTab === "unread") return notifications.filter((n) => !n.read);
    return notifications.filter((n) => n.type === activeTab);
  }, [notifications, activeTab]);

  const unreadCount = React.useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  const notificationsByType = React.useMemo(() => {
    return notifications.reduce<Record<string, number>>((acc, notification) => {
      if (!acc[notification.type]) {
        acc[notification.type] = 0;
      }
      acc[notification.type]++;
      return acc;
    }, {});
  }, [notifications]);

  return (
    <div
      className={cn(
        "flex h-full w-full max-w-sm flex-col overflow-hidden rounded-md border shadow-xl",
        className,
      )}
    >
      <div className="bg-card flex items-center justify-between border-b p-4">
        <div className="space-y-0.5">
          <h3 className="font-semibold tracking-tight">Notifications</h3>
          <p className="text-muted-foreground text-sm">
            You have {unreadCount} unread notifications
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <IconDots className="h-4 w-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={onMarkAllAsRead}>
              <IconCheck className="mr-2 h-4 w-4" />
              <span>Mark all as read</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={onDeleteAll}
              className="text-destructive"
            >
              <IconTrash className="mr-2 h-4 w-4" />
              <span>Clear all</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1"
      >
        <div className="bg-card border-b p-4 pt-0">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="text-xs">
              All
              {notifications.length > 0 && (
                <Badge className="ml-1 px-1" variant="secondary">
                  {notifications.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread" className="text-xs">
              Unread
              {unreadCount > 0 && (
                <Badge className="ml-1 px-1" variant="secondary">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="message" className="text-xs">
              Messages
              {notificationsByType.message > 0 && (
                <Badge className="ml-1 px-1" variant="secondary">
                  {notificationsByType.message}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="system" className="text-xs">
              System
              {(notificationsByType.system || 0) +
                (notificationsByType.security || 0) >
                0 && (
                <Badge className="ml-1 px-1" variant="secondary">
                  {(notificationsByType.system || 0) +
                    (notificationsByType.security || 0)}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value={activeTab}
          className="flex-1 overflow-y-auto p-0 data-[state=inactive]:hidden"
        >
          {filteredNotifications.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center">
              <div className="bg-muted mb-4 rounded-full p-3">
                <IconBellOff className="text-muted-foreground h-6 w-6" />
              </div>
              <h3 className="font-medium">No notifications</h3>
              <p className="text-muted-foreground text-sm">
                {activeTab === "all"
                  ? "You don't have any notifications yet."
                  : activeTab === "unread"
                    ? "You don't have any unread notifications."
                    : `You don't have any ${activeTab} notifications.`}
              </p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              <div className="divide-y">
                {filteredNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={onMarkAsRead}
                    onDelete={onDelete}
                    onClick={() => onNotificationClick?.(notification)}
                  />
                ))}
              </div>
            </AnimatePresence>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

type NotificationItemProps = {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  onClick?: () => void;
};

function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
  onClick,
}: NotificationItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, overflow: "hidden" }}
      transition={{ duration: 0.2 }}
      className={cn(
        "hover:bg-muted/50 relative flex cursor-pointer gap-4 p-4",
        !notification.read && "bg-accent/20",
      )}
      onClick={() => {
        if (!notification.read) {
          onMarkAsRead(notification.id);
        }
        onClick?.();
      }}
    >
      <div className="flex-shrink-0">
        {notification.user ? (
          <Avatar>
            <AvatarImage
              src={notification.user.avatar}
              alt={notification.user.name}
            />
            <AvatarFallback>
              {notification.user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-full">
            {getNotificationIcon(notification.type)}
          </div>
        )}
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm leading-tight font-medium">
          {notification.title}
        </p>
        {notification.description && (
          <p className="text-muted-foreground line-clamp-1 text-xs">
            {notification.description}
          </p>
        )}
        <p className="text-muted-foreground text-xs">
          {formatTimeAgo(
            typeof notification.timestamp === "string"
              ? new Date(notification.timestamp)
              : notification.timestamp,
          )}
        </p>
      </div>
      {!notification.read && (
        <div className="bg-primary absolute top-4 right-4 h-2 w-2 rounded-full"></div>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={(e) => e.stopPropagation()}
          >
            <IconDots className="h-4 w-4" />
            <span className="sr-only">More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px]">
          {!notification.read ? (
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onMarkAsRead(notification.id);
              }}
            >
              <IconCheck className="mr-2 h-4 w-4" />
              <span>Mark as read</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                // This would need an additional handler to mark as unread
              }}
            >
              <IconBell className="mr-2 h-4 w-4" />
              <span>Mark as unread</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(notification.id);
            }}
          >
            <IconTrash className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
}

function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case "message":
    case "mention":
    case "comment":
      return <IconBell className="h-5 w-5 text-blue-500" />;
    case "follow":
    case "like":
      return <IconUser className="h-5 w-5 text-purple-500" />;
    case "security":
      return <IconShield className="h-5 w-5 text-red-500" />;
    case "system":
    default:
      return <IconBell className="text-muted-foreground h-5 w-5" />;
  }
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return "just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
  } else {
    return date.toLocaleDateString();
  }
}
