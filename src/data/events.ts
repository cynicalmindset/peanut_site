import { EventItem } from '../types/event';

export const EVENTS_DATA: EventItem[] = [
  {
    id: 'analog-horizons-sound-symposium',
    title: 'Analog Horizons: Modular Synthesis & Spatial Audio Symposium',
    tagline: 'An evening exploring tape loops, generative acoustics, and surround soundscapes.',
    description: 'An acoustic assembly bringing together experimental synthesists, acoustic engineers, and ambient composers for multichannel live listening sessions.',
    fullDescription: `Analog Horizons is an experimental gathering dedicated to the tactile beauty of analog voltage and multi-speaker diffusion. Held across three connected industrial galleries, attendees will experience quadraphonic performances, hands-on modular patch stations, and in-depth listening sessions guided by independent sound practitioners.

The symposium emphasizes open experimentation rather than polished industry showcases. Bring an open ear for microtonal drones, vintage tape loop manipulation, and custom-built hydrophone field recordings captured across remote coastal regions.`,
    category: 'Music',
    date: '2026-11-14',
    displayDate: 'Saturday, Nov 14, 2026',
    time: '18:00 – 23:30 IST',
    venue: 'Warehouse 04, Dockside Arts District',
    address: '42 Old Quay Road, Pier 9',
    city: 'Mumbai',
    price: '₹750 / Entry',
    capacity: 120,
    spotsRemaining: 28,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1400&q=80',
    featured: true,
    curatorNote: 'Selected as this month\'s centerpiece for its uncompromising dedication to tactile sound craft and non-commercial acoustic exploration.',
    tags: ['Modular Synth', 'Spatial Audio', 'Ambient', 'Live Performance', 'Hardware'],
    organizer: 'Sonic Guild Independent',
    schedule: [
      { time: '18:00', activity: 'Doors Open & Open Patch Bay Interaction' },
      { time: '19:15', activity: 'Keynote Listening: The Physics of Magnetic Tape Saturation', speaker: 'Elora Vane' },
      { time: '20:30', activity: 'Quadraphonic Performance in the Concrete Vault' },
      { time: '22:00', activity: 'Open Jam & Sound Dialogue' }
    ]
  },
  {
    id: 'post-digital-type-foundry-lab',
    title: 'Post-Digital Typography & Risograph Press Lab',
    tagline: 'Variable typography meets mechanical printmaking in a tactile studio setting.',
    description: 'Hands-on print workshop dissecting variable font mechanics, tactile ink layering, and large-format editorial poster production.',
    fullDescription: `Step away from pure vector rendering into the imperfect texture of vegetable-oil riso inks. This intensive one-day studio session investigates how modern digital variable typefaces translate onto physical cellulose paper stock.

Participants will design custom glyph variants using open-source type tools and immediately burn master drums on a dual-drum Risograph ME9350. You will leave with a numbered edition of 20 two-color A2 posters and a deeper tactile appreciation for print registration.`,
    category: 'Workshops',
    date: '2026-11-18',
    displayDate: 'Wednesday, Nov 18, 2026',
    time: '10:00 – 17:00 IST',
    venue: 'Monotype Studio & Press',
    address: '14 Mill Avenue, Industrial Estate',
    city: 'Bengaluru',
    price: '₹1,200 (Includes paper & inks)',
    capacity: 24,
    spotsRemaining: 6,
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    curatorNote: 'Strictly limited to 24 seats to ensure each participant spends dedicated time operating the press.',
    tags: ['Typography', 'Risograph', 'Printmaking', 'Editorial Design', 'Poster Art'],
    organizer: 'Atelier Variable',
    schedule: [
      { time: '10:00', activity: 'Coffee & Introduction to Variable Geometry' },
      { time: '11:30', activity: 'Typesetting & Vector Color Separation' },
      { time: '13:00', activity: 'Communal Lunch' },
      { time: '14:00', activity: 'Drum Master Burning & Test Proofs' },
      { time: '16:30', activity: 'Edition Signing & Archive Exchange' }
    ]
  },
  {
    id: 'kernel-craft-systems-engineering',
    title: 'Kernel & Systems Architecture Unconference',
    tagline: 'Low-overhead computing, eBPF telemetry, and memory-safe systems programming.',
    description: 'An unpretentious technical gathering for systems engineers, kernel hobbyists, and distributed systems builders.',
    fullDescription: `No vendor booths, no sponsor pitches, no corporate platitudes. The Systems Architecture Unconference is a focused gathering for engineers who care deeply about cache lines, eBPF tracing, deterministic execution runtimes, and building robust local-first software.

Format follows open-space technology: morning lightning deep-dives followed by breakout whiteboard sessions and collaborative code inspections.`,
    category: 'Technology',
    date: '2026-11-21',
    displayDate: 'Saturday, Nov 21, 2026',
    time: '09:30 – 18:00 IST',
    venue: 'The Foundational Lab',
    address: '88 Cybernetics Way, Sector 5',
    city: 'Hyderabad',
    price: 'Free with RSVP',
    capacity: 90,
    spotsRemaining: 19,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    curatorNote: 'Peer-reviewed participant talk submissions ensure high signal-to-noise technical discussions.',
    tags: ['Rust', 'Linux Kernel', 'eBPF', 'Systems', 'Open Source'],
    organizer: 'Localhost Systems Group',
    schedule: [
      { time: '09:30', activity: 'Arrival & Morning Board Voting for Topics' },
      { time: '10:15', activity: 'Tracing the Socket Buffer: eBPF Deep Dive' },
      { time: '11:45', activity: 'Async Rust State Machines Under the Microscope' },
      { time: '14:00', activity: 'Breakout Whiteboard Rooms (3 Tracks)' },
      { time: '17:00', activity: 'Open Benchmarking & Retrospective' }
    ]
  },
  {
    id: 'vernacular-architecture-colloquium',
    title: 'Vernacular Earth & Stone Colloquium',
    tagline: 'Traditional climate-responsive masonry, rammed earth, and lime plastering.',
    description: 'Master artisans and contemporary sustainable architects discuss earth-building techniques and passive thermal cooling.',
    fullDescription: `As modern construction grapples with embedded carbon and excessive HVAC loads, indigenous building methods provide tested blueprints for resilient shelter. This colloquium gathers traditional masons, structural researchers, and practicing architects to examine rammed earth walls, surkhi mortar, and vaulted mud-brick arches.

Includes a live outdoor demonstration of stabilized compressed earth block (SCEB) compression and natural lime slaking.`,
    category: 'Cultural',
    date: '2026-11-27',
    displayDate: 'Friday, Nov 27, 2026',
    time: '14:00 – 20:00 IST',
    venue: 'Centre for Built Ecology',
    address: 'Plot 31, Green Heritage Enclave',
    city: 'New Delhi',
    price: '₹400 / Delegate',
    capacity: 75,
    spotsRemaining: 14,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    curatorNote: 'An essential look into building traditions that endure centuries without petroleum-based binders.',
    tags: ['Architecture', 'Vernacular', 'Earth Construction', 'Sustainability', 'Craft'],
    organizer: 'Heritage & Ecology Collective',
    schedule: [
      { time: '14:00', activity: 'Welcome & Thermal Performance of Earth Walls' },
      { time: '15:30', activity: 'Live Field Demo: Soil Testing & Rammed Earth Compaction' },
      { time: '17:30', activity: 'Tea & Material Archive Viewing' },
      { time: '18:30', activity: 'Roundtable: Building Codes & Earth Standards' }
    ]
  },
  {
    id: 'shadow-and-lens-cinematography',
    title: 'Shadow & Celluloid: 16mm Film Screening & Lens Clinic',
    tagline: 'An evening celebrating photochemical film grain, vintage prime lenses, and projection craft.',
    description: 'Rare archive 16mm short film screenings followed by hands-on optical testing of vintage cinema glass on optical collimators.',
    fullDescription: `In an era of clean high-resolution digital sensors, the organic texture of photochemical grain and vintage lens aberrations carries unmistakable soul. Shadow & Celluloid is an intimate gathering for cinematographers, directors of photography, and cinephiles.

We will project three restored archival short films on an original Bauer 16mm optical sound projector, followed by a technical teardown of historic Cooke Speed Panchros and Soviet anamorphic adapters.`,
    category: 'Cultural',
    date: '2026-12-03',
    displayDate: 'Thursday, Dec 03, 2026',
    time: '19:00 – 22:30 IST',
    venue: 'Cine-Archive Screening Room',
    address: '19 Film Colony Road, Bandra West',
    city: 'Mumbai',
    price: '₹550 / Ticket',
    capacity: 50,
    spotsRemaining: 8,
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    curatorNote: 'Film prints projected directly from the private vaults of independent collectors.',
    tags: ['Cinema', '16mm Film', 'Optics', 'Archival', 'Visual Storytelling'],
    organizer: 'Celluloid Preservation Guild',
    schedule: [
      { time: '19:00', activity: 'Curator Intro & 16mm Projector Threading' },
      { time: '19:30', activity: 'Screening: 3 Archival Avant-Garde Shorts' },
      { time: '20:45', activity: 'Lens Collimation & Aberration Bench Demonstration' },
      { time: '21:45', activity: 'Open Conversation over Filtered Coffee' }
    ]
  },
  {
    id: 'night-gravel-cycling-expedition',
    title: 'Midnight Ridge: Night Gravel & Navigation Ride',
    tagline: 'A self-supported 45km night gravel ride across rugged ridge lines and fire trails.',
    description: 'Community endurance ride under the stars. Navigational GPS checkpoints, self-reliant pace, and hot tea at the summit.',
    fullDescription: `Leave city tarmac behind. Midnight Ridge is a non-competitive, self-supported night endurance cycle that traverses gravel ridgelines, forest tracks, and unpaved farm lanes.

Participants ride in small bonded pelotons with mandatory front luminaire requirements (minimum 800 lumens) and offline GPX navigation. We assemble at midnight, roll out quietly, and reconvene at a high dawn overlook for warm spiced tea and fresh bread.`,
    category: 'Sports',
    date: '2026-12-05',
    displayDate: 'Saturday, Dec 05, 2026',
    time: '23:30 – 06:30 IST',
    venue: 'Ridge Basecamp & Trailhead',
    address: 'Foothill Checkpoint 2, Outskirts',
    city: 'Pune',
    price: '₹350 / Rider',
    capacity: 60,
    spotsRemaining: 21,
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    curatorNote: 'Helmets, redundant lighting, and puncture repair kits are strictly verified at ride check-in.',
    tags: ['Cycling', 'Gravel Ride', 'Night Ride', 'Endurance', 'Outdoors'],
    organizer: 'Midnight Peloton Union',
    schedule: [
      { time: '23:30', activity: 'Equipment & Lumen Scrutiny' },
      { time: '00:15', activity: 'Neutralized Rollout' },
      { time: '02:45', activity: 'Checkpoint Mid-Ridge Water Refill' },
      { time: '05:30', activity: 'Sunrise Summit Gathering & Brews' }
    ]
  },
  {
    id: 'urban-foraging-and-wild-ferments',
    title: 'Edible Flora: Urban Foraging & Wild Fermentation Walk',
    tagline: 'Discover wild edible greens, indigenous herbs, and spontaneous fermentation cultures.',
    description: 'An educational walking foraging excursion through semi-wild ravines, followed by an introductory lactic fermentation workshop.',
    fullDescription: `Cities are vibrant ecosystems teeming with wild edible weeds, medicinals, and natural yeasts often dismissed as urban neglect. Led by an ethnobotanist and culinary fermenter, this walking excursion teaches identification, ethical foraging rules, and seasonal gathering ethics.

After gathering samples, we retreat to a kitchen garden to prepare wild salt-brined lacto-ferments and botanical vinegars you will take home in glass jars.`,
    category: 'Community',
    date: '2026-12-12',
    displayDate: 'Saturday, Dec 12, 2026',
    time: '07:30 – 12:30 IST',
    venue: 'Ravine Biodiversity Sanctuary',
    address: 'Gate 4, Nature Trail Head',
    city: 'Bengaluru',
    price: '₹850 (Includes fermentation kit)',
    capacity: 20,
    spotsRemaining: 3,
    image: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    curatorNote: 'Strictly small group to safeguard delicate ecological flora from soil trampling.',
    tags: ['Botany', 'Foraging', 'Fermentation', 'Ecology', 'Culinary'],
    organizer: 'Wild Earth Guild',
    schedule: [
      { time: '07:30', activity: 'Trailhead Briefing & Safety Guidelines' },
      { time: '08:00', activity: 'Identification Walk: Edibles vs Look-alikes' },
      { time: '10:30', activity: 'Sterilization, Brining & Jar Packing' },
      { time: '12:00', activity: 'Wild Infusion Tasting & Q&A' }
    ]
  },
  {
    id: 'generative-shaders-creative-code',
    title: 'GLSL & Mathematical Poetry: Creative Coding Atelier',
    tagline: 'Fragment shaders, raymarching, and procedural generative aesthetics.',
    description: 'An intensive technical art masterclass exploring real-time GPU graphics, signed distance functions, and generative motion graphics.',
    fullDescription: `Move beyond canned UI transitions into the mathematically pure realm of GPU fragment shaders. In this hands-on coding workshop, we dissect how mathematical formulas translate directly into light, refraction, and hypnotic procedural geometry.

Participants will write raw GLSL using WebGL frameworks, manipulate coordinates, create organic noise maps, and render interactive visuals that react in real-time.`,
    category: 'Technology',
    date: '2026-12-19',
    displayDate: 'Saturday, Dec 19, 2026',
    time: '13:00 – 19:00 IST',
    venue: 'Media Arts Incubator',
    address: '77 Silicon Terrace, 3rd Floor',
    city: 'Bengaluru',
    price: '₹600 / Participant',
    capacity: 40,
    spotsRemaining: 11,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    curatorNote: 'Laptop required with modern browser supporting WebGL2. Basic JavaScript/C familiarity recommended.',
    tags: ['Creative Coding', 'GLSL', 'Shaders', 'WebGL', 'Generative Art'],
    organizer: 'Creative Code India',
    schedule: [
      { time: '13:00', activity: 'Understanding the GPU Pipeline & Normalized Coordinates' },
      { time: '14:30', activity: 'Simplex Noise, Domain Warping, and Color Palettes' },
      { time: '16:00', activity: 'Signed Distance Fields (SDFs) and Raymarching' },
      { time: '18:00', activity: 'Live Shader Showcase & Gallery Export' }
    ]
  }
];

export const CATEGORIES_LIST = [
  'All',
  'Technology',
  'Music',
  'Workshops',
  'Cultural',
  'Sports',
  'Community'
] as const;

