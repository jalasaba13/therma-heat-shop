export const store = {
  brand: {
    name: "THERMA",
    tagline: "Reactive protection for colder pursuits.",
    announcement: "Complimentary EU shipping on orders over €50",
    contactEmail: "support@therma.example",
  },
  product: {
    id: "thermal-balaclava-01",
    name: "Heat-Reactive Thermal Balaclava",
    shortName: "Thermal Balaclava",
    badge: "NEW / 01",
    eyebrow: "Thermochromic performance layer",
    headline: "COLD CHANGES. SO DO YOU.",
    description:
      "A close-fitting cold-weather layer with thermochromic fabric that shifts appearance as surface temperature changes.",
    price: 64,
    compareAtPrice: 78,
    currency: "EUR",
    colors: [
      { id: "ash-reactive", name: "Ash Reactive", swatch: "bg-swatch-ash" },
      { id: "void-reactive", name: "Void Reactive", swatch: "bg-swatch-void" },
    ],
    sizes: ["S/M", "L/XL"],
    trustLine: "Fast dispatch · Secure checkout · 30-day returns",
    shipping: "Dispatches within 1–2 business days. Delivery estimates appear at checkout.",
    returns: "Return unworn items in original condition within 30 days of delivery.",
    problemHeading: "Still layering bulky gear against the cold?",
    problemCopy:
      "THERMA creates a streamlined barrier for exposed skin without adding a loose, distracting outer layer.",
    quickBenefits: [
      { title: "Adaptive surface", text: "Thermochromic print responds visibly to changing surface temperature." },
      { title: "Low-profile fit", text: "Designed to sit close under helmets, goggles, and jacket collars." },
      { title: "Full coverage", text: "Extended neck and face panels help reduce exposed areas in cold conditions." },
    ],
    steps: [
      { number: "01", title: "Pull on", text: "Position the opening around the eyes or lower it below the chin." },
      { number: "02", title: "Layer up", text: "Add your helmet, goggles, or outer shell over the low-profile silhouette." },
      { number: "03", title: "Watch it react", text: "The print shifts as the fabric’s surface temperature changes." },
    ],
    benefits: [
      { code: "TR", title: "Heat-reactive finish", text: "A dynamic thermochromic treatment makes every wear look different." },
      { code: "4W", title: "Four-way stretch", text: "Flexible construction supports a close fit without rigid seams." },
      { code: "FL", title: "Flat-seam build", text: "Streamlined seams reduce unnecessary bulk beneath winter equipment." },
      { code: "MC", title: "Multi-position coverage", text: "Wear it as a full face layer, open-face hood, or neck gaiter." },
      { code: "DR", title: "Quick-drying feel", text: "Technical fabric is designed for active cold-weather layering." },
      { code: "UR", title: "Unrestricted profile", text: "The shaped panel construction keeps the silhouette clean and close." },
    ],
    demo: {
      label: "FIELD TEST / VIDEO PLACEHOLDER",
      title: "SEE THE SHIFT",
      text: "Product demonstration footage coming soon. Replace this placeholder with approved field-test video.",
    },
    reviewPlaceholders: [
      { title: "Customer review placeholder", body: "Replace this text with a verified customer review after launch." },
      { title: "Customer review placeholder", body: "Replace this text with a verified customer review after launch." },
      { title: "Customer review placeholder", body: "Replace this text with a verified customer review after launch." },
    ],
  },
  faq: [
    { question: "What is the Heat-Reactive Thermal Balaclava?", answer: "It is a close-fitting cold-weather face and neck layer made with thermochromic fabric that changes appearance as its surface temperature shifts." },
    { question: "How does the heat-reactive finish work?", answer: "Temperature-sensitive pigments in the print respond to surface heat. The exact pattern and speed of change vary with temperature and conditions." },
    { question: "How long does shipping take?", answer: "Orders dispatch within 1–2 business days. Your estimated delivery window is shown at checkout based on destination." },
    { question: "What is your return policy?", answer: "Unworn products in original condition can be returned within 30 days of delivery." },
    { question: "Can I wear it with a helmet?", answer: "The low-profile construction is designed to layer beneath most ski, snowboard, cycling, and training helmets. Fit varies by helmet and head shape." },
    { question: "How do I contact support?", answer: "Email support@therma.example. Replace this placeholder address with your live support inbox before launch." },
  ],
  policies: {
    shipping: "Shipping Policy",
    returns: "Returns & Refunds",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
  },
} as const;

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IE", { style: "currency", currency: store.product.currency }).format(value);
