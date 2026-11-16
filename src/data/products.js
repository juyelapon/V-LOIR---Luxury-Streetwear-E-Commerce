/**
 * VÉLOIR — Master Luxury Streetwear Catalog (AW26 — 12 Curated Pieces)
 * Categories: Tops, Bottoms, Footwear
 */

export const CATEGORIES = ['All', 'Tops', 'Bottoms', 'Footwear'];

export const products = [
  {
    id: 'vlr-001',
    name: '600GSM Boxy Heavy Hoodie',
    price: 295,
    category: 'Tops',
    tag: 'DROP 04 // FEATURED',
    featured: true,
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: '100% Organic Loopback French Terry (600 GSM)',
    fit: 'Boxy Cropped / Drop Shoulder',
    care: 'Cold wash inside out. Lay flat to dry. Do not tumble dry.',
    image:
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
    ],
    description:
      'Architectural heavyweight hoodie milled from custom 600 GSM combed cotton. Features a structured double-layer hood without drawcords, exaggerated dropped shoulders, and tonal matte-rubber branding across the spine.',
  },
  {
    id: 'vlr-002',
    name: 'Tactical Baggy Cargo Jeans',
    price: 360,
    category: 'Bottoms',
    tag: 'BESTSELLER',
    featured: true,
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: '14oz Japanese Washed Denim & Ripstop Panels',
    fit: 'Oversized Wide Stack',
    care: 'Machine wash cold separately. Hang dry in shade.',
    image:
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=85',
    ],
    description:
      'Wide-silhouette cargo denim engineered with eight gusseted bellows pockets, concealed hardware snaps, and articulated knee pleats. Stone-washed in obsidian charcoal for an authentic lived-in archive patina.',
  },
  {
    id: 'vlr-003',
    name: 'Retro 4 "Noir Concrete" Sneakers',
    price: 540,
    category: 'Footwear',
    tag: 'LIMITED ARCHIVE',
    featured: true,
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Full-Grain Nubuck, Mesh Cage & Sculpted Air Sole',
    fit: 'True to Size (S: US 8 / M: US 9 / L: US 10 / XL: US 11)',
    care: 'Spot clean nubuck with dry suede brush. Store with cedar shoe trees.',
    image:
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=1200&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1200&q=85',
    ],
    description:
      'Iconic court-inspired silhouette reimagined through a brutalist monochrome lens. Built with matte Italian nubuck, ballistic mesh quarters, speckled concrete midsoles, and debossed VÉLOIR heel tabs.',
  },
  {
    id: 'vlr-004',
    name: 'Obsidian Drop-Shoulder Tee',
    price: 145,
    category: 'Tops',
    tag: 'ESSENTIAL',
    featured: true,
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: '320 GSM Heavyweight Jersey Cotton',
    fit: 'Relaxed Drop Shoulder',
    care: 'Cold gentle wash. Steam only, do not iron print.',
    image:
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=85',
    ],
    description:
      'Cut from dense 320 GSM dry-hand jersey with a thick 1.2-inch ribbed mock-neck collar. Enzyme-washed for deep carbon blacks and finished with high-density puff-ink typography across the chest.',
  },
  {
    id: 'vlr-005',
    name: 'Monolith Leather Moto Jacket',
    price: 890,
    category: 'Tops',
    tag: 'ATELIER SERIES',
    featured: false,
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Full-Grain Calfskin Leather & Cupro Lining',
    fit: 'Structured Cropped Boxy',
    care: 'Specialist leather dry clean only. Store on wide wooden hanger.',
    image:
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
    ],
    description:
      'Constructed in Milan from drum-dyed calfskin leather with custom brushed gunmetal Riri zippers. Designed with wide moto lapels, articulated elbows, and clean minimal seaming.',
  },
  {
    id: 'vlr-006',
    name: 'Acid-Wash Oversized Archive Tee',
    price: 165,
    category: 'Tops',
    tag: 'NEW SEASON',
    featured: false,
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: '300 GSM Pigment-Dyed Cotton',
    fit: 'Oversized Elongated',
    care: 'Wash cold with like colors. Pigment dye naturally evolves with wear.',
    image:
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85',
    ],
    description:
      'Individually mineral-washed for a distinct slate gradient on every garment. Features raw-edge reverse stitching along the shoulders and an architectural boxy drape.',
  },
  {
    id: 'vlr-007',
    name: 'Distressed Wide-Leg Selvedge Denim',
    price: 410,
    category: 'Bottoms',
    tag: 'DENIM ARCHIVE',
    featured: false,
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: '15oz Kurabo Japanese Selvedge',
    fit: 'Ultra-Wide Baggy',
    care: 'Spot clean or hand soak cold. Avoid frequent washing.',
    image:
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=85',
    ],
    description:
      'Cut with an exaggerated puddle hem designed to stack effortlessly over chunky sneakers. Hand-abraded whisker distressing paired with oxidized silver rivets and black leather patch.',
  },
  {
    id: 'vlr-008',
    name: 'Nylon Parachute Utility Trousers',
    price: 310,
    category: 'Bottoms',
    tag: 'TECH LUXE',
    featured: false,
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Water-Repellent Japanese Tech Nylon',
    fit: 'Balloon Taper with Cinch Hem',
    care: 'Cold machine wash. Line dry only. Do not iron.',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=85',
    ],
    description:
      'Lightweight technical parachute pants featuring dual-toggle bungee cuffs, magnetic storm-flap pockets, and subtle sheen finish engineered for kinetic street layering.',
  },
  {
    id: 'vlr-009',
    name: 'Aero-Sculpt High Court Sneakers',
    price: 485,
    category: 'Footwear',
    tag: 'RUNWAY DROP',
    featured: false,
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Tumbled Italian Calfskin & Vibram® Outsole',
    fit: 'True to Size (S: US 8 / M: US 9 / L: US 10 / XL: US 11)',
    care: 'Wipe with damp microfiber cloth. Apply neutral leather balm seasonally.',
    image:
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=1200&q=85',
    ],
    description:
      'High-collar luxury basketball silhouette featuring padded ankle armor, tonal waxed cotton laces, and a custom brutalist-tread Vibram rubber sole unit.',
  },
  {
    id: 'vlr-010',
    name: 'Concrete Low-Profile Runner',
    price: 430,
    category: 'Footwear',
    tag: 'FW26 FOOTWEAR',
    featured: false,
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Technical Knit, Suede Overlays & TPU Shank',
    fit: 'True to Size (S: US 8 / M: US 9 / L: US 10 / XL: US 11)',
    care: 'Brush suede overlays gently. Air dry away from direct heat.',
    image:
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1200&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85',
    ],
    description:
      'Sculptural low-top runner combining breathable ballistic knit with raw-cut suede overlays and an aggressive split outsole engineered for urban endurance.',
  },
  {
    id: 'vlr-011',
    name: 'Architectural Wool Cargo Trouser',
    price: 390,
    category: 'Bottoms',
    tag: 'TAILORED STREET',
    featured: false,
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: '420 GSM Virgin Wool Gabardine',
    fit: 'Relaxed Pleated Wide Leg',
    care: 'Dry clean only. Press with damp cloth on low heat.',
    image:
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=85',
    ],
    description:
      'Precision-tailored virgin wool trousers fused with concealed side cargo gussets and matte horn buttons. Bridges runway suiting with utilitarian street proportion.',
  },
  {
    id: 'vlr-012',
    name: 'Monochrome Lug-Sole Studio Boot',
    price: 620,
    category: 'Footwear',
    tag: 'ATELIER FOOTWEAR',
    featured: false,
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Vegetable-Tanned Horsehide & Goodyear Storm Welt',
    fit: 'True to Size (S: US 8 / M: US 9 / L: US 10 / XL: US 11)',
    care: 'Condition leather monthly. Store in provided organic dust bags.',
    image:
      'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85',
    ],
    description:
      'Heavy-gauge combat boot anchored on a 50mm stacked commando lug sole. Crafted in Tuscany with waxed cotton speed-lace hardware and gusseted waterproof tongue.',
  },
];
