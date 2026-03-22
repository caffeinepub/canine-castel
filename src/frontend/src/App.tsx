import { CheckCircle, Clock, MapPin, Menu, Phone, Star, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Breeds", href: "#breeds" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const PRODUCTS = [
  {
    name: "Dog Food",
    image: "/assets/generated/product-dog-food.dim_400x400.jpg",
    desc: "Premium brands like Pedigree & more. Nutritious and delicious!",
    startingPrice: 299,
  },
  {
    name: "Cat Food",
    image: "/assets/generated/product-cat-food.dim_400x400.jpg",
    desc: "Complete nutrition for your feline companion.",
    startingPrice: 249,
  },
  {
    name: "Collars & Leashes",
    image: "/assets/generated/product-collars.dim_400x400.jpg",
    desc: "Durable, comfortable, and stylish options for every pet.",
    startingPrice: 199,
  },
  {
    name: "Pet Accessories",
    image: "/assets/generated/product-accessories.dim_400x400.jpg",
    desc: "Toys, bowls, beds and everything in between.",
    startingPrice: 149,
  },
  {
    name: "Grooming Products",
    image: "/assets/generated/product-grooming.dim_400x400.jpg",
    desc: "Keep your pet clean, healthy and looking great.",
    startingPrice: 349,
  },
];

const BREEDS = [
  {
    name: "Golden Retriever",
    image: "/assets/generated/breed-golden-retriever.dim_400x400.jpg",
    traits: "Friendly, loyal, great with families",
  },
  {
    name: "Labrador",
    image: "/assets/generated/breed-labrador.dim_400x400.jpg",
    traits: "Playful, gentle, easy to train",
  },
  {
    name: "German Shepherd",
    image: "/assets/generated/breed-german-shepherd.dim_400x400.jpg",
    traits: "Intelligent, protective, versatile",
  },
  {
    name: "Beagle",
    image: "/assets/generated/breed-beagle.dim_400x400.jpg",
    traits: "Curious, cheerful, great for apartments",
  },
  {
    name: "Pomeranian",
    image: "/assets/generated/breed-pomeranian.dim_400x400.jpg",
    traits: "Lively, fluffy, low maintenance",
  },
  {
    name: "Shih Tzu",
    image: "/assets/generated/breed-shih-tzu.dim_400x400.jpg",
    traits: "Affectionate, calm, great companion",
  },
  {
    name: "Husky",
    image: "/assets/generated/breed-husky.dim_400x400.jpg",
    traits: "Energetic, striking, playful",
  },
  {
    name: "Rottweiler",
    image: "/assets/generated/breed-rottweiler.dim_400x400.jpg",
    traits: "Strong, loyal, confident",
  },
];

const SERVICES = [
  {
    icon: "🐾",
    title: "Pet Care Guidance",
    desc: "Expert advice on diet, health & raising happy pets. Our owner personally guides you through every step.",
    highlight: true,
  },
  {
    icon: "✅",
    title: "Quality Products",
    desc: "We stock only trusted brands. No compromise on your pet's health and nutrition.",
    highlight: false,
  },
  {
    icon: "💰",
    title: "Affordable Pricing",
    desc: "Best prices in Nagpur. Premium products without burning your pocket.",
    highlight: false,
  },
  {
    icon: "🤝",
    title: "Helpful Support",
    desc: "Friendly, patient staff always ready to answer your questions and help you choose.",
    highlight: false,
  },
];

const WHY_US = [
  "Trusted by local pet owners in Nagpur",
  "Expert guidance for raising healthy pets",
  "Wide variety of products for all pets",
  "Friendly and approachable service",
];

const REVIEWS = [
  {
    name: "Rahul Sharma",
    stars: 5,
    text: "The owner is very helpful and patient. Gave me complete guidance on what food to buy for my new puppy. Highly recommend!",
  },
  {
    name: "Priya Gupta",
    stars: 5,
    text: "Good quality products at reasonable prices. The dog food I got for my Labrador is excellent. Will definitely come back.",
  },
  {
    name: "Amit Verma",
    stars: 4,
    text: "Very reasonable prices compared to other pet stores in Nagpur. Found everything I needed in one place.",
  },
  {
    name: "Sunita Rawat",
    stars: 5,
    text: "Best pet store nearby. The staff is so friendly and the products are genuine. My pets are happy!",
  },
];

const GALLERY = [
  {
    src: "/assets/generated/gallery-dog1.dim_500x400.jpg",
    alt: "Happy golden retriever",
  },
  {
    src: "/assets/generated/gallery-cat1.dim_500x400.jpg",
    alt: "Cute tabby cat",
  },
  {
    src: "/assets/generated/gallery-store.dim_500x400.jpg",
    alt: "Pets at Home store",
  },
  {
    src: "/assets/generated/gallery-dogs-park.dim_500x400.jpg",
    alt: "Dogs playing in park",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function StarRating({ count, total = 5 }: { count: number; total?: number }) {
  return (
    <span
      className="flex gap-0.5"
      aria-label={`${count} out of ${total} stars`}
    >
      {Array.from({ length: total }, (_, i) => i).map((i) => (
        <Star
          key={`star-${i}`}
          className={`w-4 h-4 ${
            i < count
              ? "fill-[#F2C94C] text-[#F2C94C]"
              : "fill-none text-gray-300"
          }`}
        />
      ))}
    </span>
  );
}

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    for (const el of els) observer.observe(el);
    return () => observer.disconnect();
  }, []);
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "border-b border-gray-100"
      }`}
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2 group"
          data-ocid="nav.link"
        >
          <span className="text-2xl">🐾</span>
          <span
            className="font-bold text-xl tracking-tight"
            style={{ color: "#2E7D6B" }}
          >
            Pets at Home
          </span>
        </a>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-6"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-[#2E7D6B] transition-colors duration-200 relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-[#2E7D6B] after:transition-all hover:after:w-full"
              data-ocid="nav.link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="tel:08888845088"
          className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-md"
          style={{ backgroundColor: "#2E7D6B" }}
          data-ocid="nav.button"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          type="button"
          data-ocid="nav.toggle"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base font-medium text-gray-700 hover:text-[#2E7D6B] py-1"
              onClick={handleNavClick}
              data-ocid="nav.link"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:08888845088"
            className="mt-2 flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: "#2E7D6B" }}
            data-ocid="nav.button"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[85vh] flex items-center justify-center text-center overflow-hidden"
    >
      {/* Background */}
      <img
        src="/assets/generated/hero-pet-store.dim_1400x700.jpg"
        alt="Pets at Home store"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.38)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight animate-fade-in-up">
          Quality Care &amp; Supplies for Your Pets
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 mb-8 animate-fade-in-up-delay-1">
          Trusted pet store in Nagpur for food, accessories &amp; expert
          guidance
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-2">
          <a
            href="tel:08888845088"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg"
            style={{ backgroundColor: "#2E7D6B" }}
            data-ocid="hero.primary_button"
          >
            <Phone className="w-5 h-5" />
            Call Now
          </a>
          <a
            href="https://maps.google.com/?q=330+Mangalwari+Mahal+Nagpur+Maharashtra+440032"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white border-2 border-white transition-all duration-200 hover:bg-white hover:text-gray-900"
            data-ocid="hero.secondary_button"
          >
            <MapPin className="w-5 h-5" />
            Get Directions
          </a>
        </div>
        <p className="mt-6 text-gray-300 text-sm animate-fade-in-up-delay-3">
          📞 088888 45088&nbsp;&nbsp;|&nbsp;&nbsp;📍 Mahal, Nagpur
        </p>
      </div>
    </section>
  );
}

// ─── Quick Info Bar ───────────────────────────────────────────────────────────

function QuickInfoBar() {
  return (
    <div style={{ backgroundColor: "#E8F5F1" }} className="py-4">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm font-medium">
          <a
            href="tel:08888845088"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            style={{ color: "#2E7D6B" }}
            data-ocid="info.button"
          >
            <Phone className="w-4 h-4 flex-shrink-0" />
            088888 45088
          </a>
          <span className="hidden sm:block text-gray-300">|</span>
          <span className="flex items-center gap-2 text-gray-700 text-center sm:text-left">
            <MapPin
              className="w-4 h-4 flex-shrink-0"
              style={{ color: "#2E7D6B" }}
            />
            330, Mangalwari, Mahal, Nagpur, Maharashtra 440032
          </span>
          <span className="hidden sm:block text-gray-300">|</span>
          <span className="flex items-center gap-2 text-gray-700">
            <Clock
              className="w-4 h-4 flex-shrink-0"
              style={{ color: "#2E7D6B" }}
            />
            Open till 10 PM
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Products ─────────────────────────────────────────────────────────────────

function Products() {
  const ref = useRef<HTMLElement>(null);
  return (
    <section id="products" className="py-16 sm:py-20 bg-white" ref={ref}>
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Our Products
          </h2>
          <p className="text-gray-500 text-lg">
            Everything your pet needs, at the best prices
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, i) => (
            <div
              key={product.name}
              className="bg-white rounded-2xl shadow-card card-hover overflow-hidden border border-gray-100 reveal flex flex-col"
              style={{ transitionDelay: `${i * 0.08}s` }}
              data-ocid={`products.item.${i + 1}`}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-gray-900 text-lg mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm mb-3">{product.desc}</p>
                {/* Pricing badge */}
                <span
                  className="inline-block self-start px-3 py-1 rounded-full text-xs font-semibold mb-4"
                  style={{ backgroundColor: "#FEF3C7", color: "#92400E" }}
                >
                  Starting from ₹{product.startingPrice}
                </span>
                {/* Action buttons */}
                <div className="flex gap-2 mt-auto">
                  <a
                    href="tel:08888845088"
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: "#2E7D6B" }}
                    data-ocid={`products.item.${i + 1}`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call Now
                  </a>
                  <a
                    href="tel:08888845088"
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border-2 hover:bg-[#2E7D6B] hover:text-white"
                    style={{ borderColor: "#2E7D6B", color: "#2E7D6B" }}
                    data-ocid={`products.item.${i + 1}`}
                  >
                    💬 Enquire
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Dog Breeds ───────────────────────────────────────────────────────────────

function DogBreeds() {
  return (
    <section
      id="breeds"
      className="py-16 sm:py-20"
      style={{ backgroundColor: "#F3F5F7" }}
    >
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Popular Dog Breeds
          </h2>
          <p className="text-gray-500 text-lg">
            Find your perfect companion — enquire for pricing and availability
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {BREEDS.map((breed, i) => (
            <div
              key={breed.name}
              className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden flex flex-col card-hover reveal"
              style={{ transitionDelay: `${i * 0.07}s` }}
              data-ocid={`breeds.item.${i + 1}`}
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={breed.image}
                  alt={breed.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-bold text-gray-900 text-base mb-1">
                  {breed.name}
                </h3>
                <p className="text-gray-400 text-xs mb-3 leading-relaxed">
                  {breed.traits}
                </p>
                {/* Price on request badge */}
                <span
                  className="inline-block self-start px-2.5 py-0.5 rounded-full text-xs font-semibold mb-3"
                  style={{ backgroundColor: "#FEF3C7", color: "#92400E" }}
                >
                  Price on Request
                </span>
                {/* Buttons */}
                <div className="flex gap-2 mt-auto">
                  <a
                    href="tel:08888845088"
                    className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-xs font-semibold text-white transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: "#2E7D6B" }}
                    data-ocid={`breeds.item.${i + 1}`}
                  >
                    <Phone className="w-3 h-3" />
                    Call Now
                  </a>
                  <a
                    href="tel:08888845088"
                    className="flex-1 flex items-center justify-center px-2 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border-2 hover:bg-[#2E7D6B] hover:text-white"
                    style={{ borderColor: "#2E7D6B", color: "#2E7D6B" }}
                    data-ocid={`breeds.item.${i + 1}`}
                  >
                    Enquire Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section-level CTA */}
        <div
          className="mt-12 text-center py-8 px-6 rounded-2xl reveal"
          style={{ backgroundColor: "#E8F5F1" }}
        >
          <p className="text-gray-700 font-medium text-base mb-5">
            Looking for a specific breed? Call us or enquire below.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:08888845088"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-md text-sm"
              style={{ backgroundColor: "#2E7D6B" }}
              data-ocid="breeds.primary_button"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
            <a
              href="tel:08888845088"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 border-2 hover:bg-[#2E7D6B] hover:text-white"
              style={{ borderColor: "#2E7D6B", color: "#2E7D6B" }}
              data-ocid="breeds.secondary_button"
            >
              💬 Enquire Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section id="services" className="py-16 sm:py-20 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            How We Help You
          </h2>
          <p className="text-gray-500 text-lg">
            Dedicated to the wellbeing of your furry family members
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className={`bg-white rounded-2xl p-6 shadow-card card-hover border reveal ${
                s.highlight
                  ? "border-2 lg:col-span-1 ring-2 ring-offset-1"
                  : "border-gray-100"
              }`}
              style={{
                transitionDelay: `${i * 0.08}s`,
                ...(s.highlight
                  ? { borderColor: "#F2C94C", ringColor: "#F2C94C" }
                  : {}),
              }}
              data-ocid={`services.item.${i + 1}`}
            >
              {s.highlight && (
                <div
                  className="text-xs font-semibold px-2 py-0.5 rounded-full inline-block mb-3 text-white"
                  style={{ backgroundColor: "#F2C94C", color: "#3d2f00" }}
                >
                  Our Specialty
                </div>
              )}
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                {s.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────

function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20" style={{ backgroundColor: "#F3F5F7" }}>
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Why Pet Owners Trust Us
          </h2>
          <p className="text-gray-500 text-lg">
            Serving Nagpur with care, since day one
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_US.map((point, i) => (
            <div
              key={point}
              className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-white shadow-card border border-gray-100 card-hover reveal"
              style={{ transitionDelay: `${i * 0.08}s` }}
              data-ocid={`why.item.${i + 1}`}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#E8F5F1" }}
              >
                <CheckCircle className="w-6 h-6" style={{ color: "#2E7D6B" }} />
              </div>
              <p className="text-gray-700 font-medium text-sm leading-relaxed">
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Reviews ──────────────────────────────────────────────────────────────────

function Reviews() {
  return (
    <section id="reviews" className="py-16 sm:py-20 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            What Our Customers Say
          </h2>
          <p className="text-gray-500 text-lg">
            Real reviews from real pet lovers in Nagpur
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review, i) => (
            <div
              key={review.name}
              className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 card-hover flex flex-col gap-3 reveal"
              style={{ transitionDelay: `${i * 0.08}s` }}
              data-ocid={`reviews.item.${i + 1}`}
            >
              <StarRating count={review.stars} />
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="font-bold text-gray-900 text-sm">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

function Gallery() {
  return (
    <section className="py-16 sm:py-20" style={{ backgroundColor: "#F3F5F7" }}>
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Our Happy Pets &amp; Store
          </h2>
          <p className="text-gray-500 text-lg">A peek inside Pets at Home</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {GALLERY.map((img, i) => (
            <div
              key={img.src}
              className="gallery-img aspect-[5/4] reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
              data-ocid={`gallery.item.${i + 1}`}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section className="py-16 sm:py-20" style={{ backgroundColor: "#2E7D6B" }}>
      <div className="max-w-container mx-auto px-4 sm:px-6 text-center reveal">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Visit Pets at Home Today
        </h2>
        <p className="text-green-100 text-lg mb-8 max-w-lg mx-auto">
          Come visit us or give us a call &mdash; we&apos;d love to help your
          pets thrive.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:08888845088"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold bg-white transition-all duration-200 hover:shadow-lg"
            style={{ color: "#2E7D6B" }}
            data-ocid="cta.primary_button"
          >
            <Phone className="w-5 h-5" />
            Call Now
          </a>
          <a
            href="https://maps.google.com/?q=330+Mangalwari+Mahal+Nagpur+Maharashtra+440032"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white border-2 border-white transition-all duration-200 hover:bg-white"
            style={{ "--hover-color": "#2E7D6B" } as React.CSSProperties}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#2E7D6B";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "white";
            }}
            data-ocid="cta.secondary_button"
          >
            <MapPin className="w-5 h-5" />
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" style={{ backgroundColor: "#F3F5F7" }}>
      <div className="max-w-container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Col 1 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🐾</span>
              <span className="font-bold text-xl" style={{ color: "#2E7D6B" }}>
                Pets at Home
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
              Your trusted pet store in Nagpur. Quality products &amp; expert
              care for your beloved pets.
            </p>
            <a
              href="tel:08888845088"
              className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity"
              style={{ color: "#2E7D6B" }}
              data-ocid="footer.button"
            >
              <Phone className="w-4 h-4" />
              088888 45088
            </a>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Visit Us</h4>
            <div className="flex items-start gap-2 text-gray-500 text-sm mb-3">
              <MapPin
                className="w-4 h-4 mt-0.5 flex-shrink-0"
                style={{ color: "#2E7D6B" }}
              />
              <span>330, Mangalwari, Mahal, Nagpur, Maharashtra 440032</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Clock
                className="w-4 h-4 flex-shrink-0"
                style={{ color: "#2E7D6B" }}
              />
              <span>Open till 10 PM daily</span>
            </div>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-500 text-sm hover:text-[#2E7D6B] transition-colors"
                  data-ocid="footer.link"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <span>&copy; {year} Pets at Home. All rights reserved.</span>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 transition-colors"
          >
            Built with love using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main>
        <Hero />
        <QuickInfoBar />
        <Products />
        <DogBreeds />
        <Services />
        <WhyChooseUs />
        <Reviews />
        <Gallery />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
