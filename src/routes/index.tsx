import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  LockKeyhole,
  Menu,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";

import productAsset from "@/assets/therma-balaclava.png.asset.json";
import { Button } from "@/components/ui/button";
import { formatPrice, store } from "@/data/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Heat-Reactive Thermal Balaclava — THERMA" },
      { name: "description", content: "Technical, low-profile cold-weather coverage with a thermochromic heat-reactive finish." },
      { property: "og:title", content: "Heat-Reactive Thermal Balaclava — THERMA" },
      { property: "og:description", content: "Technical cold-weather coverage that changes appearance as surface temperature shifts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Storefront,
});

type CartItem = {
  quantity: number;
  size: string;
  color: string;
};

const CART_KEY = "therma-cart-v1";

function Storefront() {
  const { brand, product, faq, policies } = store;
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<string>(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0].id);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [discount, setDiscount] = useState("");
  const [discountNote, setDiscountNote] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem(CART_KEY);
    if (!saved) return;
    try {
      setCart(JSON.parse(saved) as CartItem);
    } catch {
      window.localStorage.removeItem(CART_KEY);
    }
  }, []);

  useEffect(() => {
    if (cart) window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
    else window.localStorage.removeItem(CART_KEY);
  }, [cart]);

  useEffect(() => {
    document.body.style.overflow = cartOpen || menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen, menuOpen]);

  const selectedColor = useMemo(
    () => product.colors.find((item) => item.id === color) ?? product.colors[0],
    [color, product.colors],
  );

  const cartTotal = product.price * (cart?.quantity ?? 0);

  const addToCart = (open = true) => {
    setCart((current) => ({
      size,
      color: selectedColor.name,
      quantity: (current?.size === size && current?.color === selectedColor.name ? current.quantity : 0) + quantity,
    }));
    if (open) setCartOpen(true);
  };

  const scrollToProduct = () => document.getElementById("product")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-accent px-4 py-2 text-center text-[11px] font-bold uppercase tracking-widest text-accent-foreground">
        {brand.announcement}
      </div>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto grid h-16 max-w-[1440px] grid-cols-[auto_1fr_auto] items-center px-4 sm:px-8">
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu /></Button>
          <a href="#top" className="font-display text-3xl font-extrabold leading-none md:justify-self-start">{brand.name}</a>
          <nav className="hidden justify-self-center md:flex md:items-center md:gap-8" aria-label="Main navigation">
            <a className="nav-link" href="#product">Shop</a>
            <a className="nav-link" href="#technology">Technology</a>
            <a className="nav-link" href="#faq">FAQ</a>
            <a className="nav-link" href={`mailto:${brand.contactEmail}`}>Contact</a>
          </nav>
          <Button variant="ghost" size="icon" className="relative justify-self-end" aria-label={`Open cart with ${cart?.quantity ?? 0} items`} onClick={() => setCartOpen(true)}>
            <ShoppingBag />
            {(cart?.quantity ?? 0) > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[9px] font-bold text-accent-foreground">{cart?.quantity}</span>}
          </Button>
        </div>
      </header>

      <main id="top">
        <section className="mx-auto grid min-h-[calc(100svh-96px)] max-w-[1440px] lg:grid-cols-[0.86fr_1.14fr]">
          <div className="flex flex-col justify-center px-5 py-12 sm:px-10 lg:px-14 lg:py-16">
            <div className="mb-8 flex items-center gap-3"><span className="h-px w-8 bg-accent" /><span className="eyebrow">{product.eyebrow}</span></div>
            <h1 className="max-w-2xl font-display text-[clamp(4rem,9vw,8.5rem)] font-extrabold uppercase leading-[0.76]">COLD<br /><span className="text-accent">CHANGES.</span><br />SO DO YOU.</h1>
            <p className="mt-8 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">{product.description}</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button size="lg" className="h-14 rounded-sm px-8 text-xs font-bold uppercase tracking-widest" onClick={scrollToProduct}>Shop now <ArrowDown /></Button>
              <span className="text-xs font-semibold text-muted-foreground">{product.trustLine}</span>
            </div>
          </div>
          <div className="relative min-h-[56svh] overflow-hidden bg-product md:min-h-[650px] lg:min-h-0">
            <span className="absolute right-4 top-5 z-10 font-mono text-[10px] uppercase text-muted-foreground">THERMAL MAP / ACTIVE</span>
            <div className="absolute left-4 top-4 z-10 rounded-sm border border-foreground/20 bg-background/70 px-3 py-2 backdrop-blur"><span className="block font-mono text-[9px] uppercase text-muted-foreground">Surface response</span><span className="font-display text-xl font-bold">DYNAMIC</span></div>
            <img src={productAsset.url} alt={`${product.name} in Ash Reactive`} className="h-full w-full object-cover object-center mix-blend-multiply" fetchPriority="high" />
            <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 border border-foreground/15 bg-background/85 backdrop-blur">
              {["Heat reactive", "4-way stretch", "Flat seams"].map((item, index) => <div key={item} className="border-r border-foreground/15 p-3 last:border-0"><span className="font-mono text-[9px] text-accent">0{index + 1}</span><p className="mt-1 text-[10px] font-bold uppercase">{item}</p></div>)}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-foreground py-3 text-background" aria-label="Product features">
          <div className="ticker"><span>THERMOCHROMIC FABRIC</span><i /> <span>COLD-WEATHER LAYER</span><i /> <span>TECHNICAL STRETCH</span><i /> <span>MULTI-POSITION FIT</span><i /></div>
        </section>

        <section className="section-shell py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div><p className="eyebrow">The problem / The system</p><h2 className="section-title mt-5">{product.problemHeading}</h2><p className="mt-6 max-w-lg leading-7 text-muted-foreground">{product.problemCopy}</p></div>
            <div className="grid gap-px overflow-hidden rounded border border-border bg-border sm:grid-cols-3">
              {product.quickBenefits.map((benefit, index) => <article key={benefit.title} className="bg-background p-6 sm:min-h-64"><span className="font-mono text-xs text-accent">0{index + 1}</span><h3 className="mt-20 font-display text-2xl font-bold uppercase sm:mt-24">{benefit.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{benefit.text}</p></article>)}
            </div>
          </div>
        </section>

        <section id="product" className="scroll-mt-24 border-y border-border bg-secondary py-20 sm:py-28">
          <div className="section-shell grid gap-12 lg:grid-cols-2 lg:gap-20">
            <ProductGallery imageUrl={productAsset.url} productName={product.name} />
            <div className="self-center">
              <p className="eyebrow">{product.badge} / Series 01</p>
              <h2 className="mt-4 max-w-xl font-display text-5xl font-extrabold uppercase leading-[0.88] sm:text-7xl">{product.name}</h2>
              <div className="mt-5 flex items-baseline gap-3"><span className="text-2xl font-bold">{formatPrice(product.price)}</span><span className="text-sm text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span></div>
              <p className="mt-6 max-w-xl leading-7 text-muted-foreground">{product.description}</p>
              <div className="mt-8">
                <div className="flex items-center justify-between"><span className="option-label">Color</span><span className="text-xs text-muted-foreground">{selectedColor.name}</span></div>
                <div className="mt-3 flex gap-3">{product.colors.map((item) => <Button key={item.id} type="button" variant="outline" className={`h-12 rounded-sm px-4 ${color === item.id ? "ring-2 ring-foreground ring-offset-2" : ""}`} onClick={() => setColor(item.id)} aria-pressed={color === item.id}><span className={`h-5 w-5 rounded-full border border-border ${item.swatch}`} />{item.name}</Button>)}</div>
              </div>
              <div className="mt-7"><span className="option-label">Size</span><div className="mt-3 grid grid-cols-2 gap-3">{product.sizes.map((item) => <Button key={item} type="button" variant={size === item ? "default" : "outline"} className="h-12 rounded-sm" onClick={() => setSize(item)} aria-pressed={size === item}>{item}</Button>)}</div></div>
              <div className="mt-7 flex gap-3">
                <div className="grid h-14 grid-cols-3 items-center rounded-sm border border-border bg-background">
                  <Button variant="ghost" size="icon" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus /></Button><span className="min-w-8 text-center text-sm font-bold">{quantity}</span><Button variant="ghost" size="icon" aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)}><Plus /></Button>
                </div>
                <Button className="h-14 flex-1 rounded-sm text-xs font-bold uppercase tracking-widest" onClick={() => addToCart()}>Add to cart — {formatPrice(product.price * quantity)}</Button>
              </div>
              <Button variant="outline" className="mt-3 h-14 w-full rounded-sm text-xs font-bold uppercase tracking-widest" onClick={() => { addToCart(false); setCartOpen(true); }}>Buy now <ArrowRight /></Button>
              <div className="mt-6 divide-y divide-border border-y border-border text-sm">
                <details className="group py-4"><summary className="flex cursor-pointer list-none justify-between font-semibold">Shipping <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" /></summary><p className="pt-3 leading-6 text-muted-foreground">{product.shipping}</p></details>
                <details className="group py-4"><summary className="flex cursor-pointer list-none justify-between font-semibold">Returns <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" /></summary><p className="pt-3 leading-6 text-muted-foreground">{product.returns}</p></details>
              </div>
            </div>
          </div>
        </section>

        <section id="technology" className="scroll-mt-20 bg-foreground py-20 text-background sm:py-28">
          <div className="section-shell"><p className="eyebrow text-accent">How it works</p><div className="mt-6 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]"><h2 className="section-title">BUILT TO<br />RESPOND.</h2><div className="divide-y divide-background/20 border-y border-background/20">{product.steps.map((step) => <article key={step.number} className="grid grid-cols-[48px_1fr] gap-5 py-7 sm:grid-cols-[70px_180px_1fr]"><span className="font-mono text-xs text-accent">{step.number}</span><h3 className="font-display text-2xl font-bold uppercase">{step.title}</h3><p className="col-start-2 text-sm leading-6 text-background/65 sm:col-start-3">{step.text}</p></article>)}</div></div></div>
        </section>

        <section className="section-shell py-20 sm:py-28">
          <div className="flex items-end justify-between gap-8"><div><p className="eyebrow">System advantages</p><h2 className="section-title mt-4">ONE LAYER.<br />SIX DETAILS.</h2></div><span className="hidden font-mono text-xs text-muted-foreground sm:block">THERMA / SPEC 01—06</span></div>
          <div className="mt-12 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">{product.benefits.map((benefit) => <article key={benefit.code} className="min-h-56 border-b border-r border-border p-6 transition-colors hover:bg-secondary"><span className="grid h-10 w-10 place-items-center rounded-full border border-accent font-mono text-xs text-accent">{benefit.code}</span><h3 className="mt-12 font-display text-2xl font-bold uppercase">{benefit.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{benefit.text}</p></article>)}</div>
        </section>

        <section className="section-shell pb-20 sm:pb-28">
          <div className="relative grid min-h-[620px] overflow-hidden rounded bg-product lg:grid-cols-2">
            <img src={productAsset.url} alt="Heat-reactive balaclava demonstration placeholder" className="h-full min-h-[380px] w-full object-cover mix-blend-multiply lg:absolute lg:inset-0" loading="lazy" />
            <div className="relative col-start-2 flex flex-col justify-end bg-foreground/90 p-7 text-background sm:p-12 lg:m-8 lg:min-h-[540px] lg:bg-foreground/92">
              <span className="eyebrow text-accent">{product.demo.label}</span><h2 className="section-title mt-5">{product.demo.title}</h2><p className="mt-5 max-w-md leading-7 text-background/65">{product.demo.text}</p><Button variant="outline" className="mt-8 h-12 w-fit rounded-sm border-background/30 bg-transparent text-background hover:bg-background hover:text-foreground" disabled>Demo coming soon</Button>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-secondary py-20">
          <div className="section-shell"><div className="grid gap-6 sm:grid-cols-3">{product.reviewPlaceholders.map((review, index) => <article key={index} className="rounded border border-dashed border-border bg-background p-6"><span className="eyebrow text-muted-foreground">Placeholder / not a verified review</span><h3 className="mt-8 font-display text-2xl font-bold uppercase">{review.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{review.body}</p></article>)}</div></div>
        </section>

        <section id="faq" className="section-shell scroll-mt-20 py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]"><div><p className="eyebrow">Support / Product</p><h2 className="section-title mt-4">FAQ.</h2></div><div className="border-t border-border">{faq.map((item, index) => <div key={item.question} className="border-b border-border"><Button variant="ghost" className="h-auto w-full justify-between whitespace-normal rounded-none px-0 py-6 text-left text-base font-semibold hover:bg-transparent" onClick={() => setActiveFaq(activeFaq === index ? null : index)} aria-expanded={activeFaq === index}><span>{item.question}</span><Plus className={`shrink-0 transition-transform ${activeFaq === index ? "rotate-45" : ""}`} /></Button>{activeFaq === index && <p className="max-w-2xl pb-6 pr-10 text-sm leading-7 text-muted-foreground">{item.answer}</p>}</div>)}</div></div>
        </section>

        <section className="bg-accent px-5 py-20 text-accent-foreground sm:py-28"><div className="mx-auto max-w-5xl text-center"><p className="eyebrow">Winter changes fast</p><h2 className="mt-5 font-display text-[clamp(3.5rem,9vw,8rem)] font-extrabold uppercase leading-[0.82]">READY TO<br />REACT?</h2><p className="mx-auto mt-7 max-w-lg leading-7">Technical coverage. Dynamic finish. One streamlined cold-weather layer.</p><Button className="mt-8 h-14 rounded-sm bg-foreground px-10 text-xs font-bold uppercase tracking-widest text-background hover:bg-foreground/90" onClick={scrollToProduct}>Shop the balaclava <ArrowRight /></Button></div></section>
      </main>

      <footer className="bg-foreground px-5 pb-28 pt-16 text-background sm:px-8 sm:pb-10"><div className="mx-auto max-w-[1340px]"><div className="grid gap-12 border-b border-background/20 pb-14 md:grid-cols-[1.5fr_1fr_1fr]"><div><div className="font-display text-5xl font-extrabold">{brand.name}</div><p className="mt-4 max-w-sm text-sm leading-6 text-background/60">{brand.tagline}</p></div><div><p className="footer-label">Navigate</p><div className="mt-5 grid gap-3 text-sm"><a href="#product">Shop</a><a href="#faq">FAQ</a><a href={`mailto:${brand.contactEmail}`}>Contact</a></div></div><div><p className="footer-label">Information</p><div className="mt-5 grid gap-3 text-sm text-background/75"><span>{policies.shipping}</span><span>{policies.returns}</span><span>{policies.privacy}</span><span>{policies.terms}</span></div></div></div><div className="flex flex-col gap-2 pt-6 font-mono text-[10px] uppercase text-background/40 sm:flex-row sm:justify-between"><span>© 2026 THERMA</span><span>Built for colder pursuits</span></div></div></footer>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background p-3 shadow-2xl md:hidden"><Button className="h-13 w-full rounded-sm text-xs font-bold uppercase tracking-widest" onClick={() => addToCart()}>Add to cart · {formatPrice(product.price)}</Button></div>

      {menuOpen && <div className="fixed inset-0 z-50 bg-foreground text-background md:hidden"><div className="flex h-16 items-center justify-between border-b border-background/20 px-4"><span className="font-display text-3xl font-extrabold">{brand.name}</span><Button variant="ghost" size="icon" className="text-background hover:bg-background/10 hover:text-background" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></Button></div><nav className="grid p-5 text-5xl font-display font-bold uppercase"><a className="border-b border-background/20 py-5" href="#product" onClick={() => setMenuOpen(false)}>Shop</a><a className="border-b border-background/20 py-5" href="#technology" onClick={() => setMenuOpen(false)}>Technology</a><a className="border-b border-background/20 py-5" href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a><a className="py-5" href={`mailto:${brand.contactEmail}`}>Contact</a></nav></div>}

      {cartOpen && <><button className="fixed inset-0 z-50 cursor-default bg-overlay" aria-label="Close cart" onClick={() => setCartOpen(false)} /><aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-background shadow-2xl" aria-label="Shopping cart"><div className="grid h-20 grid-cols-[1fr_auto] items-center border-b border-border px-5"><div><span className="eyebrow">Your bag</span><h2 className="font-display text-2xl font-bold uppercase">Cart ({cart?.quantity ?? 0})</h2></div><Button variant="ghost" size="icon" onClick={() => setCartOpen(false)} aria-label="Close cart"><X /></Button></div>{cart ? <div className="flex flex-1 flex-col overflow-y-auto"><div className="grid grid-cols-[110px_1fr] gap-4 border-b border-border p-5"><div className="aspect-square overflow-hidden rounded bg-product"><img src={productAsset.url} alt={product.name} className="h-full w-full object-cover mix-blend-multiply" /></div><div className="min-w-0"><h3 className="font-display text-xl font-bold uppercase leading-none">{product.shortName}</h3><p className="mt-2 text-xs text-muted-foreground">{cart.color} / {cart.size}</p><div className="mt-5 flex items-center justify-between"><div className="flex items-center rounded-sm border border-border"><Button variant="ghost" size="icon" onClick={() => setCart({ ...cart, quantity: Math.max(1, cart.quantity - 1) })} aria-label="Decrease cart quantity"><Minus /></Button><span className="w-7 text-center text-xs font-bold">{cart.quantity}</span><Button variant="ghost" size="icon" onClick={() => setCart({ ...cart, quantity: cart.quantity + 1 })} aria-label="Increase cart quantity"><Plus /></Button></div><span className="font-semibold">{formatPrice(cartTotal)}</span></div><Button variant="ghost" size="sm" className="mt-2 h-7 px-0 text-xs text-muted-foreground" onClick={() => setCart(null)}><Trash2 /> Remove</Button></div></div><div className="mt-auto border-t border-border p-5"><label htmlFor="discount" className="option-label">Discount code</label><div className="mt-2 flex gap-2"><input id="discount" value={discount} onChange={(event) => setDiscount(event.target.value)} placeholder="Enter code" className="h-11 min-w-0 flex-1 rounded-sm border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" /><Button variant="outline" className="h-11 rounded-sm" onClick={() => setDiscountNote(discount ? "Code will be validated at checkout." : "Enter a code first.")}>Apply</Button></div>{discountNote && <p className="mt-2 text-xs text-muted-foreground">{discountNote}</p>}<div className="mt-6 flex justify-between font-bold"><span>Subtotal</span><span>{formatPrice(cartTotal)}</span></div><p className="mt-2 text-xs text-muted-foreground">Shipping and taxes calculated at checkout.</p><Button className="mt-5 h-14 w-full rounded-sm text-xs font-bold uppercase tracking-widest" onClick={() => setDiscountNote("Checkout provider ready to connect.")}><LockKeyhole /> Secure checkout</Button></div></div> : <div className="grid flex-1 place-items-center p-8 text-center"><div><ShoppingBag className="mx-auto h-8 w-8 text-muted-foreground" /><h3 className="mt-5 font-display text-3xl font-bold uppercase">Your bag is empty</h3><p className="mt-2 text-sm text-muted-foreground">Add the THERMA layer when you’re ready.</p><Button className="mt-6 rounded-sm" onClick={() => { setCartOpen(false); scrollToProduct(); }}>Shop now</Button></div></div>}</aside></>}
    </div>
  );
}

function ProductGallery({ imageUrl, productName }: { imageUrl: string; productName: string }) {
  const [view, setView] = useState(0);
  const views = [
    { label: "Front", className: "scale-100" },
    { label: "Detail", className: "scale-[1.55] translate-y-10" },
    { label: "Profile", className: "scale-100 -translate-x-8" },
  ];
  return <div><div className="aspect-[4/5] overflow-hidden rounded bg-product"><img src={imageUrl} alt={`${productName} — ${views[view].label} view`} className={`h-full w-full object-cover mix-blend-multiply transition-transform duration-500 ${views[view].className}`} /></div><div className="mt-3 grid grid-cols-3 gap-3">{views.map((item, index) => <Button key={item.label} variant="outline" className={`h-auto aspect-square overflow-hidden rounded p-0 ${view === index ? "ring-2 ring-foreground ring-offset-2" : ""}`} onClick={() => setView(index)} aria-label={`View ${item.label.toLowerCase()} image`}><img src={imageUrl} alt="" className={`h-full w-full object-cover mix-blend-multiply ${item.className}`} /></Button>)}</div></div>;
}
