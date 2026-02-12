"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface InboxNotification {
  id: string;
  type: string;
  title: string;
  message: string;
  actionUrl?: string;
  actionLabel?: string;
  priority: "high" | "medium" | "low";
  icon: string;
  color: string;
  count?: number;
}

const colorClasses: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
    badge: "bg-orange-500",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    badge: "bg-blue-500",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-700",
    badge: "bg-purple-500",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    badge: "bg-red-500",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    badge: "bg-green-500",
  },
};

export default function NotificationInbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<InboxNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchNotifications();

    // Refresh notifications every 2 minutes
    const interval = setInterval(fetchNotifications, 120000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications/inbox");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-stone-500 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition-colors"
        aria-label="Notifications"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>

        {/* Notification Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-50">
          {/* Header */}
          <div className="px-4 py-3 bg-stone-50 border-b border-stone-200">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-stone-900">Notifications</h3>
              {notifications.length > 0 && (
                <span className="text-xs text-stone-500">
                  {notifications.length} notification{notifications.length > 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="p-4 space-y-3">
                <div className="animate-pulse h-16 bg-stone-100 rounded-xl"></div>
                <div className="animate-pulse h-16 bg-stone-100 rounded-xl"></div>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center">
                <span className="text-4xl mb-2 block">✨</span>
                <p className="text-stone-500 text-sm">
                  Aucune notification pour le moment
                </p>
                <p className="text-stone-400 text-xs mt-1">
                  Tu es a jour !
                </p>
              </div>
            ) : (
              <div className="p-2 space-y-2">
                {notifications.map((notification) => {
                  const colors = colorClasses[notification.color] || colorClasses.blue;

                  return (
                    <Link
                      key={notification.id}
                      href={notification.actionUrl || "/dashboard"}
                      onClick={handleNotificationClick}
                      className={`block p-3 rounded-xl border ${colors.bg} ${colors.border} hover:shadow-md transition-all`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{notification.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className={`font-semibold text-sm ${colors.text}`}>
                              {notification.title}
                            </h4>
                            {notification.priority === "high" && (
                              <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full uppercase">
                                Urgent
                              </span>
                            )}
                          </div>
                          <p className="text-stone-600 text-sm mt-0.5 leading-snug">
                            {notification.message}
                          </p>
                          {notification.actionLabel && (
                            <span className={`inline-flex items-center gap-1 mt-2 text-xs font-medium ${colors.text}`}>
                              {notification.actionLabel}
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                              </svg>
                            </span>
                          )}
                        </div>
                        {notification.count && (
                          <span className={`${colors.badge} text-white text-xs font-bold px-2 py-1 rounded-full`}>
                            {notification.count}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-3 bg-stone-50 border-t border-stone-200">
              <Link
                href="/dashboard"
                onClick={handleNotificationClick}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Voir le tableau de bord
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
