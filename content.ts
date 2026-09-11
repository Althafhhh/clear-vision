// ============================================
// CLEAR VISION — ALL SITE COPY LIVES HERE
// Pulled and adapted from clearvision.lk
// Edit this file to change any text on the site.
// ============================================

const content = {
  business: {
    name: "Clear Vision",
    tagline: "Family Eye Care",
    phone1: "+94 11 272 3928",
    phone2: "0777 826 000",
    phoneRaw1: "+94112723928",
    phoneRaw2: "+94777826000",
    email: "clearvisioncare@gmail.com",
    address: "78/C, Sri Saranankara Road, Kalubowila, Dehiwala 10350, Sri Lanka",
    hours: "Mon to Sat, 8.00 AM to 6.00 PM",
    whatsapp: "https://api.whatsapp.com/send?phone=94777826000",
    mapEmbed:
      "https://www.google.com/maps?q=78/C+Sri+Saranankara+Road+Kalubowila+Dehiwala&output=embed",
  },

  nav: [
    { label: "Shop", href: "/shop" },
    { label: "New In", href: "/new-in" },
    { label: "Collections", href: "/collections" },
    { label: "Members", href: "/account/login" },
    { label: "Stores", href: "/contact" },
  ],

  brands: [
    { name: "Ray-Ban", slug: "ray-ban" },
    { name: "Dolce & Gabbana", slug: "dolce-gabbana" },
  ],

  announcements: [
    "Free Eye Test With Every Frame Purchase",
    "Glasses Ready in as Little as 2 Hours",
    "30 Day Easy Returns & Exchanges",
  ],

  footerNav: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Book an Appointment", href: "/appointment" },
  ],

  home: {
    heroEyebrow: "Sri Lanka's Eyewear Boutique",
    heroTitle: "Eyewear, Tailored for You",
    heroSubtitle:
      "A complete solution, from eye examination and prescription, to a wide selection of frames and lenses. Your glasses, ready in as little as 2 hours.",
    heroCtaPrimary: { label: "Book an Eye Test", href: "/appointment" },
    heroCtaSecondary: { label: "View Selection", href: "/shop" },

    // Full-bleed sticky heroes shown on the homepage — small collection
    // label, big title, single button. Layout modelled on the reference site.
    stickyHeroes: [
      {
        eyebrow: "FW2026 · New Arrivals",
        title: "See Clearly.\nLook Sharper.",
        cta: { label: "Shop New Arrivals", href: "/shop" },
        image: "hero-new-arrivals.jpg",
      },
      {
        eyebrow: "Designer Eyewear",
        title: "The Frames\nEveryone Wants",
        cta: { label: "Shop Designer", href: "/shop#designer-eyewear" },
        image: "hero-designer-eyewear.jpg",
      },
      {
        eyebrow: "Women's Exclusive",
        title: "Fashion,\nRedefined",
        cta: { label: "Shop Women's", href: "/shop#womens-eyewear" },
        image: "hero-womens-exclusive.jpg",
      },
    ],

    processEyebrow: "How It Works",
    processTitle: "Comprehensive, Expert, and Instant Eye Care",
    processIntro:
      "Our state-of-the-art facility provides a comprehensive eye examination, a prescription, and an extensive selection of frames, all at one place. We fabricate, tailor, and finish your eyewear, all within 2 hours.",
    process: [
      {
        step: "01",
        title: "Examination",
        text: "A thorough, professional eye examination carried out by our optometrists.",
      },
      {
        step: "02",
        title: "Prescription",
        text: "A precise prescription you can use anywhere, including abroad.",
      },
      {
        step: "03",
        title: "Fabrication",
        text: "Your frames and lenses fitted and finished, often within the same visit.",
      },
    ],

    aboutEyebrow: "Sri Lanka's #1 Glasses Boutique",
    aboutTitle: "High Quality, Affordable Frames and Lenses",
    aboutText:
      "Established in the field of eye care with a state-of-the-art facility, we provide premier, exceptional service from the moment you step into our boutique. Our speciality is total eye care, from eye testing, to writing your prescription, to fabricating and stylishly finishing your glasses. Our merchandise includes globally reputed designer eyewear, so we keep you updated with everyday's changing trends, and it all remains absolutely affordable.",
    aboutQuote:
      "We provide the complete solution: from eye examination, prescription, and a large selection of frames, to an unrivalled service. Your glasses ready within 2 hours.",

    servicesTitle: "Our Services",
    services: [
      "Eye Examinations & Testing",
      "Affordable Frames & Lenses",
      "Sunglasses & Fashion Eyewear",
      "Prescription Lenses",
      "Contact Lenses",
      "Designer Wear & Brands",
      "Frame Repairs & Spare Parts",
      "Lens Replacements & Polishing",
    ],

    categoriesTitle: "Shop by Category",
    categoriesSubtitle: "A frame and lens for every face, prescription, and budget.",

    brandsTitle: "Brands We Carry",
    brands: ["Ray-Ban", "Dolce & Gabbana"],

    ctaTitle: "Get Your Eyes Examined, Today",
    ctaText: "Limited warranty available on various frames and lenses.",
    ctaButton: { label: "Book an Appointment", href: "/appointment" },
  },

  shop: {
    title: "Shop",
    subtitle: "Frames and lenses for every style, prescription, and budget.",
    note:
      "Full pricing and live stock are confirmed in-store or by phone/WhatsApp. Call us on +94 777 826 000 for the latest availability.",
    categories: [
      {
        slug: "sunglasses",
        name: "Sunglasses",
        description: "UV-protective sunglasses in polarized and standard lenses.",
      },
      {
        slug: "designer-eyewear",
        name: "Designer Eyewear",
        description: "Globally reputed designer frames, kept current with the season's trends.",
      },
      {
        slug: "mens-eyewear",
        name: "Men's Eyewear",
        description: "Classic and contemporary frames for men.",
      },
      {
        slug: "womens-eyewear",
        name: "Women's Eyewear",
        description: "Fashion-forward frames for women.",
      },
      {
        slug: "kids-eyewear",
        name: "Kids Eyewear",
        description: "Durable, comfortable frames built for active children.",
      },
      {
        slug: "sports-eyewear",
        name: "Sports Eyewear",
        description: "Impact-resistant frames and lenses for an active lifestyle.",
      },
      {
        slug: "metal",
        name: "Metal Frames",
        description: "Lightweight, durable metal frame construction.",
      },
      {
        slug: "flexible",
        name: "Flexible Frames",
        description: "Flexible, near-indestructible frame materials for daily wear.",
      },
    ],
    // Sample listing — placeholder items until real product photos/prices are supplied.
    // NOTE TO ALTHAF: clearvision.lk's live shop page had an empty catalog (no products
    // listed under WooCommerce at time of pull). These are demo placeholders only —
    // swap in real product names, prices, and photos once the client supplies them.
    sampleProducts: [
      {
        id: "classic-aviator",
        brand: "Ray-Ban",
        name: "Classic Aviator",
        category: "Sunglasses",
        price: "Rs 6,500",
        image: "sample-sunglasses-1.jpg",
        badge: "New In",
        description:
          "A timeless double-bridge aviator with polarized lenses and full UV400 protection. Lightweight metal frame, adjustable nose pads.",
        details: "Polarized lenses · Metal frame · UV400 protection · Adjustable nose pads",
        colors: ["Gold", "Gunmetal", "Black"],
      },
      {
        id: "round-acetate",
        brand: "Dolce & Gabbana",
        name: "Round Acetate Frame",
        category: "Designer Eyewear",
        price: "Rs 12,000",
        image: "sample-designer-1.jpg",
        badge: "Most Wanted",
        description:
          "Hand-finished round acetate frame from our designer collection. A versatile everyday shape that suits most face shapes.",
        details: "Acetate frame · Spring hinges · Anti-reflective lens coating available",
        colors: ["Tortoise", "Black", "Clear"],
      },
      {
        id: "slim-metal",
        brand: "Ray-Ban",
        name: "Slim Metal Frame",
        category: "Men's Eyewear",
        price: "Rs 8,500",
        image: "sample-mens-1.jpg",
        badge: "New In",
        description:
          "A slim, minimal rectangular frame in brushed metal, built for daily wear with a barely-there feel.",
        details: "Brushed metal · Slim profile · Spring hinges",
        colors: ["Silver", "Matte Black"],
      },
      {
        id: "cat-eye",
        brand: "Dolce & Gabbana",
        name: "Cat-Eye Frame",
        category: "Women's Eyewear",
        price: "Rs 9,200",
        image: "sample-womens-1.jpg",
        badge: "Most Wanted",
        description:
          "A modern take on the classic cat-eye silhouette, finished in a lightweight acetate with a subtle two-tone edge.",
        details: "Acetate frame · Two-tone finish · Spring hinges",
        colors: ["Blush", "Black", "Amber"],
      },
      {
        id: "flexible-kids",
        brand: "Ray-Ban",
        name: "Flexible Kids Frame",
        category: "Kids Eyewear",
        price: "Rs 4,800",
        image: "sample-kids-1.jpg",
        badge: "New In",
        description:
          "Near-indestructible flexible frame built for active kids. Bends and twists without snapping.",
        details: "Flexible TR90 material · Rubberized temple tips · Scratch-resistant lenses",
        colors: ["Blue", "Pink", "Green"],
      },
      {
        id: "polarized-sports",
        brand: "Ray-Ban",
        name: "Polarized Sports Wrap",
        category: "Sports Eyewear",
        price: "Rs 7,900",
        image: "sample-sports-1.jpg",
        description:
          "A wraparound sports frame with polarized, impact-resistant lenses for an active lifestyle.",
        details: "Polarized lenses · Impact-resistant · Non-slip grip",
        colors: ["Black", "Navy"],
      },
      {
        id: "browline-classic",
        brand: "Dolce & Gabbana",
        name: "Browline Classic",
        category: "Men's Eyewear",
        price: "Rs 9,800",
        image: "sample-mens-2.jpg",
        badge: "New In",
        description:
          "A retro-inspired browline frame with a bold acetate brow and slim metal underrims.",
        details: "Acetate and metal combination · Spring hinges",
        colors: ["Black", "Tortoise"],
      },
      {
        id: "oversized-square",
        brand: "Ray-Ban",
        name: "Oversized Square Sunglasses",
        category: "Sunglasses",
        price: "Rs 7,200",
        image: "sample-sunglasses-2.jpg",
        badge: "Most Wanted",
        description:
          "An oversized square silhouette with gradient tinted lenses and full UV400 protection.",
        details: "Gradient lenses · UV400 protection · Acetate frame",
        colors: ["Black", "Havana"],
      },
    ],
  },

  about: {
    title: "About Us",
    missionEyebrow: "Our Mission",
    missionText:
      "We're dedicated to providing you with the perfect eyewear, from our exquisite collection of frames and lenses. Our collection ranges from high fashion to conservative wear, at great affordable rates. Prescription lenses, frames, contact lenses, sunglasses, children's eyewear, accessories, and an all-round eye care service, provided in our friendly atmosphere.",
    storyEyebrow: "Our Story",
    storyText:
      "With new trends and technology evolving dynamically, Clear Vision aims to stay ahead of the curve and provide you with up-to-the-minute products and services. Our facility allows us to provide you with an advanced eye examination and manufacture your glasses within a day. We're able to provide a prescription after examination, so you may even obtain eyewear should you be travelling abroad. Head over to our humble store and integrated clinic on Saranankara Road, off Hospital Road in Kalubowila, Dehiwala. We've a range of eyewear that's sure to interest you.",
    servicesTitle: "What We Offer",
    services: [
      "Comprehensive Eye Exams",
      "Complete Optical Services",
      "Contact Lens Examination",
      "Urgent Care",
    ],
  },

  contact: {
    title: "Contact Us",
    subtitle: "Visit our boutique, call, or send a message. We're happy to help.",
    formNote: "We'll get back to you as soon as possible during business hours.",
  },

  account: {
    title: "Sign In or Create an Account",
    subtitle: "Enter your email and we'll send you a verification code.",
    emailPlaceholder: "Email",
    optInLabel: "Switch on email updates and get 10% off your next order",
    termsText: "By continuing, you agree to our",
    termsLink: "Terms of Service",
  },

  wishlist: {
    title: "My Wishlist",
    emptyTitle: "Your Wishlist is Empty",
    emptyText: "Start saving frames by tapping the heart icon to keep them here.",
  },

  appointment: {
    title: "Make an Appointment",
    subtitle:
      "Book a comprehensive eye examination with our optometrists. Bring your current glasses or contact lens prescription if you have one.",
    formNote:
      "By submitting this form you agree that your details will be collected and stored for the purpose of scheduling your appointment.",
  },

  footer: {
    blurb: "Comprehensive, expert, and instant eye care solutions.",
  },
};

export default content;
