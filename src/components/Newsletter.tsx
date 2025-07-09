import { Mail } from "lucide-react";
import { Button } from "./ui/button";

export default function Newsletter() {
  return (
    <section className="p-4 md:p-8">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-foreground">
          Stay in the Loop
        </h2>
        <p className="text-muted-foreground mb-6">
          Get updates on new products, exclusive offers, and trends.
        </p>
        <form className="flex flex-col sm:flex-row gap-1 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 px-4 py-2 rounded-md border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
          />
          <Button type="submit" variant="default" className="px-6" size="lg">
            <Mail className="h-4 w-4" />
            Subscribe
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-4">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
