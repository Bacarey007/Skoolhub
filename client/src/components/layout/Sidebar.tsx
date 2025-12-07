import { LayoutDashboard, Calendar, GraduationCap, Users, Settings, LogOut, School, Laptop } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

const NAVIGATION = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Events", icon: Calendar, href: "/events" },
  { name: "CBT Exams", icon: Laptop, href: "/exams" },
  { name: "Students", icon: Users, href: "/students" },
  { name: "Academics", icon: GraduationCap, href: "/academics" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="h-screen w-64 border-r bg-sidebar flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3 border-b border-sidebar-border">
        <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
          <School className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-display font-bold text-lg leading-tight text-sidebar-foreground">skoolhub</h1>
          <p className="text-xs text-muted-foreground">School Admin</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {NAVIGATION.map((item) => {
          const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
          return (
            <Link key={item.name} href={item.href}>
              <a
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </a>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-sm font-medium text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground transition-colors">
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
