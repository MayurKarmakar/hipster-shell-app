import type { ShellAppConfig } from "@/App";
import { Button } from "@/components/ui/button";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Layout({config}: {config: ShellAppConfig}) {
  const location = useLocation();
  const navigate = useNavigate();

  function isActive(path: string): boolean {
    return location.pathname === path;
  }

  function formatLabel(componentName: string): string {
    return componentName.replace(/([A-Z])/g, ' $1').trim();
  }

  const navLinks = config.remotes.flatMap(remote =>
    remote.components.map(component => ({
      path: component.route,
      label: formatLabel(component.componentName)
    }))
  );

  const allLinks = [
    { path: "/", label: "Home" },
    ...navLinks
  ];

  function handleNavigationChange(value: string) {
    navigate(value);
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto flex h-14 sm:h-16 items-center px-3 sm:px-6 lg:px-8">
          <div className="mr-2 sm:mr-4 flex">
            <Link to="/" className="mr-3 sm:mr-6 flex items-center space-x-2">
              <span className="font-bold text-base sm:text-xl">Booking App</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-1 text-xs sm:text-sm font-medium mx-auto">
            <div className="md:hidden">
              <Select value={location.pathname} onValueChange={handleNavigationChange}>
                <SelectTrigger className="w-[140px] h-8 text-xs" size="sm">
                  <SelectValue placeholder="Navigate" />
                </SelectTrigger>
                <SelectContent>
                  {allLinks.map((link) => (
                    <SelectItem key={link.path} value={link.path} className="text-xs">
                      {link.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              <Link to="/">
                <Button variant={isActive("/") ? "default" : "ghost"} size="sm" className="h-8 px-2 sm:px-3">
                  Home
                </Button>
              </Link>
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path}>
                  <Button
                    variant={isActive(link.path) ? "default" : "ghost"}
                    size="sm"
                    className="h-8 px-2 sm:px-3"
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1 grow w-full md:max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-10">
        <Outlet />
      </main>

      <footer className="border-t py-3 sm:py-6">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-center text-xs sm:text-sm text-muted-foreground">
          Hipster Assignment - Booking app
        </div>
      </footer>
    </div>
  );
}
