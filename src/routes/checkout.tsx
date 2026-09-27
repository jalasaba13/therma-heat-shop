import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, Check, CreditCard, LockKeyhole, PackageCheck, ShieldCheck } from "lucide-react";

import productAsset from "@/assets/therma-balaclava.png.asset.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { readCart, type CartItem } from "@/lib/cart";
import { formatPrice, store } from "@/data/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout — THERMA" },
      { name: "description", content: "Complete your THERMA order in a secure, streamlined checkout." },
      { property: "og:title", content: "Secure Checkout — THERMA" },
      { property: "og:description", content: "Complete your THERMA order in a secure, streamlined checkout." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

type FieldName = "email" | "firstName" | "lastName" | "address" | "city" | "postalCode" | "phone" | "country";

const fieldClass = "h-13 rounded-sm bg-background px-4 text-base shadow-none transition-[border-color,box-shadow] focus-visible:ring-2";

function CheckoutPage() {
  const { brand, product, checkout, policies } = store;
  const [cart, setCart] = useState<CartItem | null>(null);
  const [shippingId, setShippingId] = useState(checkout.shippingMethods[0].id);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [confirmation, setConfirmation] = useState("");

  useEffect(() => setCart(readCart()), []);

  const shipping = checkout.shippingMethods.find((method) => method.id === shippingId) ?? checkout.shippingMethods[0];
  const subtotal = product.price * (cart?.quantity ?? 0);
  const total = subtotal + shipping.price;

  const fields = useMemo(() => [
    { name: "email" as const, label: "Email", type: "email", autoComplete: "email", span: true },
    { name: "firstName" as const, label: "First name", autoComplete: "given-name" },
    { name: "lastName" as const, label: "Last name", autoComplete: "family-name" },
    { name: "address" as const, label: "Address", autoComplete: "street-address", span: true },
    { name: "city" as const, label: "City", autoComplete: "address-level2" },
    { name: "postalCode" as const, label: "Postal code", autoComplete: "postal-code" },
    { name: "phone" as const, label: "Phone", type: "tel", autoComplete: "tel", span: true },
  ], []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors: Partial<Record<FieldName, string>> = {};
    fields.forEach(({ name }) => {
      const value = String(data.get(name) ?? "").trim();
      if (!value) nextErrors[name] = "This field is required.";
      if (name === "email" && value && !/^\S+@\S+\.\S+$/.test(value)) nextErrors[name] = "Enter a valid email address.";
    });
    if (!String(data.get("country") ?? "")) nextErrors.country = "Select a country.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setConfirmation("");
      document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }
    setConfirmation(checkout.demoConfirmation);
  };

  return (
    <main className="page-enter min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/95">
        <div className="mx-auto grid h-20 max-w-[1320px] grid-cols-[auto_1fr_auto] items-center px-5 sm:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase"><ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">Return to store</span></Link>
          <Link to="/" className="justify-self-center font-display text-3xl font-extrabold">{brand.name}</Link>
          <span className="inline-flex items-center gap-2 justify-self-end text-xs font-semibold text-muted-foreground"><LockKeyhole className="h-4 w-4" /> Secure</span>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1320px] lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.72fr)]">
        <form id="checkout-form" onSubmit={submit} noValidate className="order-2 px-5 py-10 sm:px-8 sm:py-14 lg:order-1 lg:border-r lg:border-border lg:px-12 xl:px-20">
          <div className="mb-10 flex items-start justify-between gap-5">
            <div><p className="eyebrow">Checkout / 01</p><h1 className="mt-3 font-display text-5xl font-extrabold uppercase leading-none sm:text-6xl">{checkout.title}</h1></div>
            <span className="rounded-sm border border-accent bg-accent/10 px-3 py-2 text-[10px] font-bold uppercase text-accent-foreground">Demo mode</span>
          </div>

          <CheckoutSection number="01" title={checkout.contactHeading}>
            <Field field={fields[0]} error={errors.email} />
          </CheckoutSection>

          <CheckoutSection number="02" title={checkout.deliveryHeading}>
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.slice(1).map((field) => <Field key={field.name} field={field} error={errors[field.name]} />)}
              <div className="sm:col-span-2"><Label htmlFor="country">Country</Label><select id="country" name="country" defaultValue="" aria-invalid={Boolean(errors.country)} className={`${fieldClass} mt-2 w-full border border-input outline-none ${errors.country ? "border-destructive" : ""}`}><option value="" disabled>Select country</option>{checkout.countries.map((country) => <option key={country}>{country}</option>)}</select>{errors.country && <p className="mt-1 text-xs text-destructive">{errors.country}</p>}</div>
            </div>
            <div className="mt-8 space-y-3"><Label>Shipping method</Label>{checkout.shippingMethods.map((method) => <label key={method.id} className={`grid cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-3 rounded-sm border p-4 transition-colors ${shippingId === method.id ? "border-foreground bg-secondary" : "border-border"}`}><input type="radio" name="shipping" value={method.id} checked={shippingId === method.id} onChange={() => setShippingId(method.id)} className="accent-current" /><span><span className="block text-sm font-bold">{method.name}</span><span className="text-xs text-muted-foreground">{method.estimate}</span></span><span className="text-sm font-semibold">{method.price === 0 ? "Free" : formatPrice(method.price)}</span></label>)}</div>
          </CheckoutSection>

          <CheckoutSection number="03" title={checkout.paymentHeading}>
            <div className="rounded-sm border border-dashed border-border bg-secondary p-5"><div className="flex items-center gap-3"><CreditCard className="h-5 w-5 text-accent" /><span className="text-sm font-bold">{checkout.paymentMethods.join(" · ")}</span></div><p className="mt-3 text-sm leading-6 text-muted-foreground">{checkout.paymentNote}</p></div>
          </CheckoutSection>

          {confirmation && <div role="status" className="mt-6 flex gap-3 rounded-sm border border-accent bg-accent/10 p-4 text-sm leading-6"><Check className="mt-0.5 h-4 w-4 shrink-0" />{confirmation}</div>}
          <Button type="submit" disabled={!cart} className="mt-6 h-14 w-full rounded-sm text-xs font-bold uppercase">{checkout.submitLabel} · {formatPrice(total)}</Button>
          <div className="mt-5 grid gap-3 text-xs text-muted-foreground sm:grid-cols-3"><span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Secure form</span><span className="flex items-center gap-2"><PackageCheck className="h-4 w-4" /> {policies.returns}</span><span className="flex items-center gap-2"><LockKeyhole className="h-4 w-4" /> No charge today</span></div>
        </form>

        <aside className="order-1 border-b border-border bg-secondary px-5 py-8 sm:px-8 lg:order-2 lg:border-b-0 lg:px-10 lg:py-14 xl:px-14">
          <div className="lg:sticky lg:top-8"><div className="flex items-center justify-between"><p className="eyebrow">Order summary</p><span className="font-mono text-xs text-muted-foreground">{cart?.quantity ?? 0} ITEM</span></div>
          {cart ? <><div className="mt-6 grid grid-cols-[96px_minmax(0,1fr)_auto] items-center gap-4 border-y border-border py-5"><div className="relative aspect-square overflow-hidden rounded-sm bg-product"><img src={productAsset.url} alt={product.name} width="480" height="600" className="h-full w-full object-cover mix-blend-multiply" /><span className="absolute right-1 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-foreground px-1 text-[10px] font-bold text-background">{cart.quantity}</span></div><div className="min-w-0"><h2 className="font-display text-xl font-bold uppercase leading-none">{product.shortName}</h2><p className="mt-2 text-xs text-muted-foreground">{cart.color} / {cart.size}</p></div><span className="text-sm font-bold">{formatPrice(subtotal)}</span></div><dl className="space-y-4 py-6 text-sm"><div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div><div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping.price === 0 ? "Free" : formatPrice(shipping.price)}</dd></div><div className="flex justify-between"><dt className="text-muted-foreground">Discount</dt><dd>—</dd></div><div className="flex justify-between border-t border-border pt-5 text-lg font-bold"><dt>Total</dt><dd>{formatPrice(total)} EUR</dd></div></dl></> : <div className="mt-6 border-y border-border py-10 text-center"><p className="font-display text-2xl font-bold uppercase">Your bag is empty</p><Link to="/" className="mt-4 inline-block text-sm font-bold underline">Return to store</Link></div>}
          <p className="border-t border-border pt-5 text-xs leading-5 text-muted-foreground">{product.shipping} {product.returns}</p></div>
        </aside>
      </div>
    </main>
  );
}

function CheckoutSection({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return <section className="border-t border-border py-8"><div className="mb-6 flex items-center gap-4"><span className="font-mono text-xs text-accent">{number}</span><h2 className="font-display text-2xl font-bold uppercase">{title}</h2></div>{children}</section>;
}

function Field({ field, error }: { field: { name: FieldName; label: string; type?: string; autoComplete?: string; span?: boolean }; error?: string }) {
  return <div className={field.span ? "sm:col-span-2" : ""}><Label htmlFor={field.name}>{field.label}</Label><Input id={field.name} name={field.name} type={field.type} autoComplete={field.autoComplete} aria-invalid={Boolean(error)} className={`${fieldClass} mt-2 ${error ? "border-destructive" : ""}`} />{error && <p className="mt-1 text-xs text-destructive">{error}</p>}</div>;
}