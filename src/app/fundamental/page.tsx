
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { navItems } from "@/lib/heat-treatment-data";
import Link from "next/link";
import { Atom, Database, List } from "lucide-react";

export default function FundamentalPage() {
  const fundamentalFeatures = [
      { href: "/alloy-database", label: "Alloy Database", icon: Database, description: "A searchable database of common steel alloys." },
      { href: "/glossary", label: "Glossary of Terms", icon: List, description: "A searchable glossary of common terms." },
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        <section className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 via-background to-background p-8">
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <Atom className="h-10 w-10 text-primary" />
              <h1 className="text-4xl font-bold tracking-tight">
                Fundamental Concepts
              </h1>
            </div>
            <p className="max-w-3xl text-lg text-muted-foreground text-justify">
              Explore the core concepts of metallurgy, including a comprehensive alloy database and a glossary of essential terms.
            </p>
          </div>
          <div className="absolute inset-0 z-0 bg-grid-slate-100/[0.03] bg-[bottom_1px_center] [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]"></div>
        </section>

        <section>
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
            Explore Our Fundamental Resources
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {fundamentalFeatures.map((feature) => (
              <Link key={feature.href} href={feature.href} className="block h-full">
                <Card className="group h-full transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10">
                  <CardHeader className="flex flex-row items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <feature.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-grow">
                      <CardTitle className="text-xl">{feature.label}</CardTitle>
                      <CardDescription className="mt-2 text-justify">
                        {feature.description || `Explore ${feature.label.toLowerCase()} and expand your knowledge.`}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
