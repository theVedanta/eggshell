'use client';

import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Search, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

function generateBreadcrumbs(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = [];

  // Always include home
  breadcrumbs.push({ label: 'Home', href: '/' });

  // Generate breadcrumbs based on path segments
  let currentPath = '';
  for (let i = 0; i < segments.length; i++) {
    currentPath += `/${segments[i]}`;
    let label = segments[i];

    // Format labels nicely
    if (label === 'category') {
      label = 'Categories';
    } else if (label === 'product') {
      label = 'Product';
    } else if (label === 'cart') {
      label = 'Shopping Cart';
    } else if (label === 'checkout') {
      label = 'Checkout';
    } else if (label === 'brands') {
      label = 'Brands';
    } else {
      // Capitalize and replace dashes with spaces
      label = label.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    breadcrumbs.push({
      label,
      href: currentPath,
      isLast: i === segments.length - 1
    });
  }

  return breadcrumbs;
}

export function Layout({ children }: LayoutProps) {
  const { state } = useCart();
  const pathname = usePathname();
  const breadcrumbs = useMemo(() => generateBreadcrumbs(pathname), [pathname]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />

          {/* Breadcrumbs */}
          <div className="flex-1">
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => (
                  <div key={breadcrumb.href} className="flex items-center">
                    {index > 0 && <BreadcrumbSeparator />}
                    <BreadcrumbItem>
                      {breadcrumb.isLast ? (
                        <BreadcrumbPage className="font-medium">
                          {breadcrumb.label}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link href={breadcrumb.href} className="hover:text-foreground transition-colors">
                            {breadcrumb.label}
                          </Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/search">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Link>
            </Button>

            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/cart">
                <ShoppingCart className="h-4 w-4" />
                {state.itemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                  >
                    {state.itemCount}
                  </Badge>
                )}
                <span className="sr-only">Shopping cart</span>
              </Link>
            </Button>

            <Button variant="ghost" size="icon" asChild>
              <Link href="/profile">
                <User className="h-4 w-4" />
                <span className="sr-only">User profile</span>
              </Link>
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 min-h-0">
          <div className="container-wide mx-auto px-4 py-6">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t bg-muted/50 py-8 mt-auto">
          <div className="container-wide mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Eggshell Store</h3>
                <p className="text-sm text-muted-foreground">
                  Your destination for modern fashion and premium lifestyle products.
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex aspect-square size-6 items-center justify-center rounded bg-primary text-primary-foreground">
                    <ShoppingCart className="size-3" />
                  </div>
                  <span className="text-sm font-medium">Modern Fashion</span>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Shop</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/category/apparel" className="text-muted-foreground hover:text-foreground transition-colors">
                      Apparel
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/footwear" className="text-muted-foreground hover:text-foreground transition-colors">
                      Footwear
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/accessories" className="text-muted-foreground hover:text-foreground transition-colors">
                      Accessories
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/jewellery" className="text-muted-foreground hover:text-foreground transition-colors">
                      Jewellery
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Account</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/orders" className="text-muted-foreground hover:text-foreground transition-colors">
                      Order History
                    </Link>
                  </li>
                  <li>
                    <Link href="/wishlist" className="text-muted-foreground hover:text-foreground transition-colors">
                      Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link href="/cart" className="text-muted-foreground hover:text-foreground transition-colors">
                      Shopping Cart
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Support</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
                      Shipping Info
                    </Link>
                  </li>
                  <li>
                    <Link href="/returns" className="text-muted-foreground hover:text-foreground transition-colors">
                      Returns
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <Separator className="my-8" />

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © 2024 Eggshell Store. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
