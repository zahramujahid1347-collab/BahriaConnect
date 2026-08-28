import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Eyebrow } from "@/components/section-heading";
import CategoryBrowser from "@/components/category-browser";
import { ServiceIcon } from "@/components/icons";
import { getCategory } from "@/lib/data";
import { getProvidersByCategorySlug } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  return {
    title: cat ? cat.name : "Service",
    description: cat?.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  const list = await getProvidersByCategorySlug(category);

  if (!cat) {
    return (
      <>
        <Navbar />
        <main className="mx-auto w-full max-w-6xl px-4 py-20 text-center sm:px-6">
          <h1 className="font-display text-3xl font-bold text-ink">
            Service not found
          </h1>
          <p className="mt-2 text-slate-gray">
            That category doesn’t exist yet.
          </p>
          <Link
            href="/services"
            className="btn mt-6 border-0 bg-ink font-display font-semibold text-paper"
          >
            Browse all services
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-fog/60 bg-card">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
            <div className="breadcrumbs text-sm text-slate-gray">
              <ul>
                <li>
                  <Link href="/services">Services</Link>
                </li>
                <li>{cat.name}</li>
              </ul>
            </div>

            <div className="mt-2 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-box bg-ink text-paper">
                <ServiceIcon name={cat.icon} className="h-8 w-8" />
              </span>
              <div>
                <Eyebrow>{cat.group}</Eyebrow>
                <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                  {cat.name}
                </h1>
              </div>
            </div>
            <p className="mt-3 max-w-2xl text-lg text-slate-gray">
              {cat.description}
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
          {list.length > 0 ? (
            <CategoryBrowser category={cat} providers={list} />
          ) : (
            <div className="rounded-box border border-dashed border-fog bg-card p-12 text-center">
              <p className="font-display text-lg font-bold text-ink">
                Providers are being vetted in this category.
              </p>
              <p className="mt-1 text-slate-gray">
                Check back soon — management approves new providers regularly.
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
