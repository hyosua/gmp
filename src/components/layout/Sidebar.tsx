"use client";

import { useState, useTransition } from "react";
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
  Loader2,
} from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

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
      className={[
        "flex items-center gap-3 font-sans font-semibold text-[0.8rem] tracking-[0.04em] no-underline transition-colors duration-150 overflow-hidden whitespace-nowrap border-l-2",
        collapsed ? "py-[0.625rem] px-0 justify-center" : "py-[0.625rem] px-[0.875rem] justify-start",
        isActive
          ? "text-primary border-primary bg-[var(--c-primary-10)]"
          : "text-muted border-transparent hover:text-primary",
      ].join(" ")}
    >
      <Icon size={16} className="shrink-0" />
      {!collapsed && <span>{item.label}</span>}
    </Link>
  );
}

function SidebarContent({
  collapsed,
  onCollapse,
  session,
}: {
  collapsed: boolean;
  onCollapse: (v: boolean) => void;
  session: Session | null;
}) {
  const [isPending, startTransition] = useTransition();
  const user = session?.user;
  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '??';

  const handleLogout = () => {
    startTransition(async () => {
      await signOut({ callbackUrl: '/' });
    });
  };

  return (
    <aside
      className="bg-bg-deep border-r-2 border-primary flex flex-col h-screen sticky top-0 overflow-hidden transition-[width,min-width] duration-200"
      style={{ width: collapsed ? "56px" : "240px", minWidth: collapsed ? "56px" : "240px" }}
    >
      {/* En-tête logo */}
      <div
        className={[
          "flex items-center border-b border-border h-14 shrink-0",
          collapsed ? "justify-center py-[0.875rem] px-0" : "justify-between py-[0.875rem] pl-4 pr-3",
        ].join(" ")}
      >
        <div className="flex items-center gap-3">
          <div className="w-[30px] h-[30px] bg-primary flex items-center justify-center shrink-0">
            <Cog size={16} color="white" strokeWidth={2.5} />
          </div>
          {!collapsed && (
            <span className="font-sans text-[1.2rem] text-secondary tracking-[0.1em] leading-none">
              GMP
            </span>
          )}
        </div>
        {!collapsed && (
          <button
            onClick={() => onCollapse(true)}
            title="Réduire"
            className="bg-transparent border-none cursor-pointer text-muted flex p-1 hover:text-primary transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 flex flex-col gap-[2px]">
        {mainNav.map((item) => (
          <SidebarNavItem key={item.href} item={item} collapsed={collapsed} />
        ))}

        {/* Séparateur admin */}
        {!collapsed ? (
          <div className="mt-3 mb-1 ml-[0.875rem] text-[0.65rem] font-mono text-muted tracking-[0.1em] uppercase">
            Administration
          </div>
        ) : (
          <div className="h-px bg-border mx-3 my-2" />
        )}
        {adminNav.map((item) => (
          <SidebarNavItem key={item.href} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Pied : utilisateur + actions */}
      <div className="border-t border-border shrink-0">
        <div
          className={[
            "flex items-center gap-2",
            collapsed ? "py-3 px-0 justify-center" : "py-3 px-4 justify-between",
          ].join(" ")}
        >
          {!collapsed && (
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="w-7 h-7 bg-primary flex items-center justify-center text-[0.65rem] font-bold text-bg-deep font-mono shrink-0">
                {initials}
              </div>
              <div className="min-w-0">
                <div className="text-[0.75rem] font-semibold font-sans text-secondary overflow-hidden text-ellipsis whitespace-nowrap">
                  {user?.name || "Utilisateur"}
                </div>
                <div className="text-[0.6rem] font-mono text-muted tracking-[0.08em]">
                  {user?.role || "RÔLE"}
                </div>
              </div>
            </div>
          )}
          <div className="flex gap-[2px] items-center">
            <ThemeToggle />
            <button
              title="Déconnexion"
              onClick={handleLogout}
              disabled={isPending}
              className="bg-transparent border-none cursor-pointer text-muted flex p-1 transition-colors hover:text-primary"
            >
              {isPending ? <Loader2 size={14} className="animate-spin" /> : <LogOut size={14} />}
            </button>
          </div>
        </div>

        {collapsed && (
          <button
            onClick={() => onCollapse(false)}
            title="Agrandir"
            className="w-full bg-transparent border-none border-t border-border cursor-pointer text-muted flex justify-center py-2 hover:text-primary transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </aside>
  );
}

export function Sidebar({ session }: { session: Session | null }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <SidebarContent collapsed={collapsed} onCollapse={setCollapsed} session={session} />
      </div>

      {/* Bouton mobile */}
      <button
        className="md:hidden fixed bottom-5 right-5 z-[100] w-12 h-12 bg-primary border-none cursor-pointer flex items-center justify-center shadow-[2px_2px_0_var(--c-accent)]"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={20} color="white" />
      </button>

      {/* Overlay mobile */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-[99] bg-black/60 flex"
          onClick={() => setMobileOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="relative">
            <SidebarContent collapsed={false} onCollapse={() => {}} session={session} />
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-3 -right-10 bg-transparent border-none cursor-pointer text-white flex"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
