import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useDemoModal } from "@/components/landing/DemoModalContext";

const navLinks = [
  { label: "Product", href: "/product" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Company", href: "/company" },
];

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const { openDemo } = useDemoModal();

  const linkClasses = (href: string) =>
    `rounded-full px-1.5 py-1 text-[0.78rem] font-medium tracking-[-0.01em] transition-colors sm:px-2 sm:py-1.5 sm:text-[0.9rem] ${
      location === href
        ? "text-foreground font-semibold"
        : "text-foreground/70 hover:text-foreground"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center">
          <img src="/logo.png" alt="" className="h-8 w-auto sm:h-9" />
        </Link>

        <nav className="hidden items-center gap-4 sm:flex lg:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClasses(link.href)}
              data-testid={`link-nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold leading-none text-primary-foreground transition-colors hover:bg-primary/90 sm:px-5"
            data-testid="button-nav-demo"
            onClick={() => setLocation("/signin")}
          >
            <span className="hidden sm:inline">Get Started Free</span>
            <span className="sm:hidden">Start Free</span>
          </Button>
        </div>

        <nav className="flex basis-full justify-center gap-4 border-t border-border/70 pt-2 text-sm font-medium tracking-[-0.01em] sm:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClasses(link.href)}
              data-testid={`link-nav-${link.label.toLowerCase()}-mobile`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
