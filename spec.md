# Canine Castel

## Current State
Fully built website with Navbar, Hero, QuickInfoBar, Products (5 categories, no pricing), Services, WhyChooseUs, Reviews, Gallery, FinalCTA, Footer.

## Requested Changes (Diff)

### Add
- Pricing labels ("Starting from ₹XXX") on each product card with realistic prices per category
- "Call Now" and "Enquire" CTA buttons on product cards
- A new Dog Breeds section (after Products, before Services) showing popular breeds with images, "Price on Request" / "Enquire Now" label, and enquiry CTA buttons
- Breeds section nav link added to navbar

### Modify
- Products section: add pricing badge and action buttons to each card
- NAV_LINKS: add "Breeds" link pointing to #breeds

### Remove
- Nothing removed

## Implementation Plan
1. Update PRODUCTS data to include `startingPrice` (number, INR) for each product
2. Update product cards: show "Starting from ₹XXX" badge in gold/amber, add row of "Call Now" (tel link) and "Enquire" (tel link or mailto) buttons below
3. Add BREEDS data array with name and Unsplash/generated image per breed (Golden Retriever, Labrador, German Shepherd, Beagle, Pomeranian, Shih Tzu, Husky, Rottweiler)
4. Generate breed images using generate_image tool
5. Build DogBreeds section component with grid layout, breed image, name, "Price on Request" tag, and "Enquire Now" + "Call Now" buttons
6. Insert DogBreeds between Products and Services in App layout
7. Add #breeds anchor to nav
