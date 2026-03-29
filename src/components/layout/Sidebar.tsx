"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  GraduationCap,
  FolderOpen,
  Briefcase,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Cog,
  Menu,
  X,
} from "lucide-react";
import { C } from "@/lib/forge";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

const mainNav: NavItem[] = [
  { label: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
  { label: "Notes", href: "/dashboard/notes", icon: BookOpen },
  { label: "Emploi du temps", href: "/dashboard/edt", icon: Calendar },
  { label: "Cours", href: "/dashboard/cours", icon: GraduationCap },
  { label: "Projets tuteurés", href: "/dashboard/projets", icon: FolderOpen },
  { label: "Offres", href: "/dashboard/offres", icon: Briefcase },
];

const adminNav: NavItem[] = [
  { label: "Utilisateurs", href: "/dashboard/admin/users", icon: Users },
  { label: "Paramètres", href: "/dashboard/admin/settings", icon: Settings },
];

function SidebarNavItem({
  item,
  collapsed,
}: {
  item: NavItem;
  collapsed: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      title={collapsed ? item.label : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: collapsed ? "0.625rem 0" : "0.625rem 0.875rem",
        justifyContent: collapsed ? "center" : "flex-start",
        fontSize: "0.8rem",
        fontFamily: C.sans,
        fontWeight: 600,
        letterSpacing: "0.04em",
        color: isActive ? C.primary : C.muted,
        background: isActive ? "var(--c-primary-10)" : "transparent",
        borderLeft: isActive ? `2px solid ${C.primary}` : "2px solid transparent",
        textDecoration: "none",
        transition: "color 0.15s, background 0.15s",
        whiteSpace: "nowrap",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        if (!isActive) e.currentTarget.style.color = C.primary;
      }}
      onMouseLeave={(e) => {
        if (!isActive) e.currentTarget.style.color = C.muted;
      }}
    >
      <Icon size={16} style={{ flexShrink: 0 }} />
      {!collapsed && <span>{item.label}</span>}
    </Link>
  );
}

function SidebarContent({
  collapsed,
  onCollapse,
}: {
  collapsed: boolean;
  onCollapse: (v: boolean) => void;
}) {
  return (
    <aside
      style={{
        width: collapsed ? "56px" : "240px",
        minWidth: collapsed ? "56px" : "240px",
        background: C.bgDeep,
        borderRight: `2px solid ${C.primary}`,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
        transition: "width 0.2s, min-width 0.2s",
        overflow: "hidden",
      }}
    >
      {/* En-tête logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: collapsed ? "0.875rem 0" : "0.875rem 0.75rem 0.875rem 1rem",
          borderBottom: `1px solid ${C.border}`,
          height: "56px",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: "30px",
              height: "30px",
              background: C.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Cog size={16} color="white" strokeWidth={2.5} />
          </div>
          {!collapsed && (
            <span
              style={{
                fontFamily: C.sans,
                fontSize: "1.2rem",
                color: C.secondary,
                letterSpacing: "0.1em",
                lineHeight: 1,
              }}
            >
              GMP
            </span>
          )}
        </div>
        {!collapsed && (
          <button
            onClick={() => onCollapse(true)}
            title="Réduire"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: C.muted,
              display: "flex",
              padding: "4px",
            }}
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0.5rem 0",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        {mainNav.map((item) => (
          <SidebarNavItem key={item.href} item={item} collapsed={collapsed} />
        ))}

        {/* Séparateur admin */}
        {!collapsed ? (
          <div
            style={{
              margin: "0.75rem 0 0.25rem 0.875rem",
              fontSize: "0.65rem",
              fontFamily: C.mono,
              color: C.muted,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Administration
          </div>
        ) : (
          <div
            style={{
              height: "1px",
              background: C.border,
              margin: "0.5rem 12px",
            }}
          />
        )}
        {adminNav.map((item) => (
          <SidebarNavItem key={item.href} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Pied : utilisateur + actions */}
      <div style={{ borderTop: `1px solid ${C.border}`, flexShrink: 0 }}>
        <div
          style={{
            padding: collapsed ? "0.75rem 0" : "0.75rem 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
            gap: "0.5rem",
          }}
        >
          {!collapsed && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                flex: 1,
                minWidth: 0,
              }}
            >
              {/* Avatar placeholder — à remplacer par session.user */}
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  background: C.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  color: C.bgDeep,
                  fontFamily: C.mono,
                  flexShrink: 0,
                }}
              >
                ET
              </div>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    fontFamily: C.sans,
                    color: C.secondary,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  Étudiant
                </div>
                <div
                  style={{
                    fontSize: "0.6rem",
                    fontFamily: C.mono,
                    color: C.muted,
                    letterSpacing: "0.08em",
                  }}
                >
                  ETUDIANT
                </div>
              </div>
            </div>
          )}
          <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
            <ThemeToggle />
            <button
              title="Déconnexion"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: C.muted,
                display: "flex",
                padding: "4px",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = C.primary)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = C.muted)
              }
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>

        {collapsed && (
          <button
            onClick={() => onCollapse(false)}
            title="Agrandir"
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              borderTop: `1px solid ${C.border}`,
              cursor: "pointer",
              color: C.muted,
              display: "flex",
              justifyContent: "center",
              padding: "0.5rem",
            }}
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </aside>
  );
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <SidebarContent collapsed={collapsed} onCollapse={setCollapsed} />
      </div>

      {/* Bouton mobile */}
      <button
        className="md:hidden"
        onClick={() => setMobileOpen(true)}
        style={{
          position: "fixed",
          bottom: "1.25rem",
          right: "1.25rem",
          zIndex: 100,
          width: "48px",
          height: "48px",
          background: C.primary,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `2px 2px 0 ${C.accent}`,
        }}
      >
        <Menu size={20} color="white" />
      </button>

      {/* Overlay mobile */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
          }}
          onClick={() => setMobileOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ position: "relative" }}>
            <SidebarContent collapsed={false} onCollapse={() => {}} />
            <button
              onClick={() => setMobileOpen(false)}
              style={{
                position: "absolute",
                top: "0.75rem",
                right: "-2.5rem",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "white",
                display: "flex",
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
