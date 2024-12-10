// app/components/layout/Sidebar.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  Cloud,
  Send,
  BarChart2,
  Calendar,
  Share2,
  Users2,
  Music2,
  LayoutGrid,
  MessageSquare,
  Settings,
  Newspaper,
  Contact,
  LogOut,
  UserCog,
  BookOpen,
  FileText,
  BellRing,
} from "lucide-react";
import { User } from "@/app/types/auth";

type BadgeVariant = "danger" | "success" | "warning" | "new";

interface NavSection {
  title?: string;
  items: NavItem[];
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles: string[];
  badge?: {
    value: number | string;
    variant: "danger" | "success" | "warning" | "new";
  };
}

const navigation: NavSection[] = [
  {
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: Home,
        roles: ["superadmin", "employee", "accountant", "artist"],
      },
    ],
  },
  {
    title: "Gestion Label",
    items: [
      {
        label: "Cloud",
        href: "/dashboard/cloud",
        icon: Cloud,
        roles: ["superadmin", "employee", "artist"],
        badge: {
          value: "NEW",
          variant: "new",
        },
      },
      {
        label: "Distribution",
        href: "/dashboard/distribution",
        icon: Send,
        roles: ["superadmin", "employee"],
      },
      {
        label: "Analytique",
        href: "/dashboard/analytics",
        icon: BarChart2,
        roles: ["superadmin", "employee", "accountant"],
      },
      {
        label: "Agenda",
        href: "/dashboard/calendar",
        icon: Calendar,
        roles: ["superadmin", "employee", "artist"],
        badge: {
          value: 3,
          variant: "warning",
        },
      },
    ],
  },
  {
    title: "Social & Marketing",
    items: [
      {
        label: "Réseaux Sociaux",
        href: "/dashboard/social",
        icon: Share2,
        roles: ["superadmin", "employee"],
      },
      {
        label: "Messagerie",
        href: "/dashboard/messages",
        icon: MessageSquare,
        roles: ["superadmin", "employee", "artist"],
        badge: {
          value: 5,
          variant: "danger",
        },
      },
    ],
  },
  {
    title: "Administration",
    items: [
      {
        label: "Utilisateurs",
        href: "/dashboard/users",
        icon: UserCog,
        roles: ["superadmin"],
      },
      {
        label: "Nos Artistes",
        href: "/dashboard/artists",
        icon: Music2,
        roles: ["superadmin", "employee"],
      },
      {
        label: "CRM",
        href: "/dashboard/crm",
        icon: LayoutGrid,
        roles: ["superadmin", "employee"],
      },
    ],
  },
  {
    title: "Site Web",
    items: [
      {
        label: "Sliders",
        href: "/dashboard/sliders",
        icon: LayoutGrid,
        roles: ["superadmin"],
      },
      {
        label: "Services",
        href: "/dashboard/services",
        icon: BookOpen,
        roles: ["superadmin"],
      },
      {
        label: "News",
        href: "/dashboard/news",
        icon: Newspaper,
        roles: ["superadmin"],
      },
      {
        label: "Contact",
        href: "/dashboard/contact",
        icon: Contact,
        roles: ["superadmin"],
      },
      {
        label: "Paramètres",
        href: "/dashboard/settings",
        icon: Settings,
        roles: ["superadmin"],
      },
    ],
  },
];

interface SidebarProps {
  user: User | null;
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function Sidebar({
  user,
  isOpen,
  isMobile,
  onClose,
  onLogout,
}: SidebarProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getBadgeStyles = (badge?: NavItem["badge"]) => {
    if (!badge) return "";

    const baseStyles = "px-2 py-0.5 text-xs rounded-full";
    switch (badge.variant) {
      case "danger":
        return `${baseStyles} bg-red-500/10 text-red-500`;
      case "success":
        return `${baseStyles} bg-emerald-500/10 text-emerald-500`;
      case "warning":
        return `${baseStyles} bg-yellow-500/10 text-yellow-500`;
      case "new":
        return `${baseStyles} bg-blue-500/10 text-blue-500`;
      default:
        return `${baseStyles} bg-zinc-500/10 text-zinc-500`;
    }
  };

  if (!mounted) return null;

  const filteredNavigation = navigation
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) => user && item.roles.includes(user.role)
      ),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Overlay */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
          )}

          {/* Sidebar */}
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 left-0 w-72 bg-zinc-900 border-r border-zinc-800 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-zinc-800">
              <Link
                href="/dashboard"
                className="flex items-center gap-2"
                onClick={() => isMobile && onClose()}
              >
                <Image
                  src="/images/logo.png"
                  alt="BraizeRecords"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <span
                  style={{ fontFamily: "'Netflix Sans', sans-serif" }}
                  className="text-xl font-bold text-white"
                >
                  Braize<span className="text-red-500">Records</span>
                </span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-6">
              {filteredNavigation.map((section, idx) => (
                <div key={idx} className="space-y-1">
                  {section.title && (
                    <div className="px-3 mb-2">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        {section.title}
                      </h4>
                    </div>
                  )}
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => isMobile && onClose()}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
                          isActive
                            ? "bg-red-500 text-white"
                            : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          <span className="text-sm font-medium">
                            {item.label}
                          </span>
                        </div>
                        {item.badge && (
                          <span className={getBadgeStyles(item.badge)}>
                            {item.badge.value}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </nav>

            {/* User Section */}
            {user && (
              <div className="border-t border-zinc-800 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {user.name[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-zinc-400 truncate">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </p>
                  </div>
                  <button
                    onClick={onLogout}
                    className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                    title="Se déconnecter"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
