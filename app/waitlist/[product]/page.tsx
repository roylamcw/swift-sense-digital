import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import LeadForm from "../../components/LeadForm";
import { waitlistProducts } from "../../lib/product-catalog";
import "../../home.css";

type Props = { params: Promise<{ product: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return waitlistProducts.map((product) => ({ product: product.slug }));
}

async function readProduct(params: Props["params"]) {
  const { product: slug } = await params;
  const product = waitlistProducts.find((entry) => entry.slug === slug);
  if (!product) notFound();
  return product;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await readProduct(params);
  const title = `${product.name} — Join the waitlist`;
  const description = `From ${product.price}. ${product.description} Register your interest; no launch date or access is confirmed.`;
  return {
    title,
    description,
    alternates: { canonical: `/waitlist/${product.slug}` },
    openGraph: { title, description, url: `/waitlist/${product.slug}` },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function WaitlistPage({ params }: Props) {
  const product = await readProduct(params);
  return (
    <div className="ssd-site waitlist-page">
      <a href="#main-content" className="skip-link">Skip to registration</a>
      <header className="site-header">
        <div className="frame header-inner">
          <Link href="/" className="wordmark" aria-label="Swift Sense Digital home">
            <Image src="/images/ssd-brand-mark.webp" width={34} height={40} alt="" />
            <span>Swift Sense<small>DIGITAL</small></span>
          </Link>
          <Link href="/#products" className="text-link">All products <span aria-hidden="true">↗</span></Link>
        </div>
      </header>
      <main id="main-content" className="contact-section section">
        <div className="frame contact-layout">
          <div className="contact-copy">
            <p className="eyebrow">In development / Waitlist open</p>
            <h1>{product.name}</h1>
            <p className="waitlist-page-price">From {product.price}</p>
            <p>{product.description}</p>
            <p className="contact-note">Register your interest and we’ll contact you about availability. This is not a purchase or confirmation of access. No launch date is confirmed.</p>
            <div className="contact-routes"><a href="mailto:chunwai@swiftsensedigital.com">Questions? Email CW <span aria-hidden="true">↗</span></a></div>
          </div>
          <div className="contact-form-panel">
            <p className="eyebrow">Your next step</p>
            <h2 className="waitlist-form-title">Register for the waitlist.</h2>
            <LeadForm key={product.slug} fixedServiceInterest={product.serviceInterest} />
          </div>
        </div>
      </main>
      <footer className="site-footer"><div className="frame footer-bottom"><p>© 2026 Swift Sense Digital</p><nav aria-label="Footer navigation"><Link href="/">Home</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></nav></div></footer>
    </div>
  );
}
