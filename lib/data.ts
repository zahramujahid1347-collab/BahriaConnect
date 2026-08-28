import type { ServiceCategory } from "./types";

export const categories: ServiceCategory[] = [
  {
    slug: "maids",
    name: "Maids & Domestic Help",
    icon: "home",
    description: "Trusted maids and domestic helpers for daily household support.",
    group: "Domestic",
  },
  {
    slug: "cleaning",
    name: "Cleaning Services",
    icon: "sparkle",
    description: "Deep cleaning, regular upkeep, and move-in/move-out cleaning.",
    group: "Domestic",
  },
  {
    slug: "cooks",
    name: "Cooks",
    icon: "chef",
    description: "Home cooks for daily meals, meal prep, and special occasions.",
    group: "Domestic",
  },
  {
    slug: "plumbers",
    name: "Plumbing",
    icon: "wrench",
    description: "Leaks, blockages, installations, and full plumbing repairs.",
    group: "Maintenance",
  },
  {
    slug: "electricians",
    name: "Electrical",
    icon: "bolt",
    description: "Wiring, fixtures, load issues, and certified electrical work.",
    group: "Maintenance",
  },
  {
    slug: "carpenters",
    name: "Carpentry",
    icon: "hammer",
    description: "Furniture repair, custom woodwork, doors, and fittings.",
    group: "Maintenance",
  },
  {
    slug: "painters",
    name: "Painting",
    icon: "roller",
    description: "Interior and exterior painting with clean, careful finishing.",
    group: "Maintenance",
  },
  {
    slug: "ac-technicians",
    name: "AC & Cooling",
    icon: "snowflake",
    description: "AC installation, servicing, gas refills, and repair.",
    group: "Technical",
  },
  {
    slug: "appliance-repair",
    name: "Appliance Repair",
    icon: "washer",
    description: "Fridge, washing machine, oven, and appliance repairs.",
    group: "Technical",
  },
  {
    slug: "gardeners",
    name: "Gardening & Landscaping",
    icon: "leaf",
    description: "Garden upkeep, lawn care, planting, and landscaping.",
    group: "Outdoor",
  },
  {
    slug: "handymen",
    name: "Handyman",
    icon: "tools",
    description: "Small fixes, furniture assembly, and general odd jobs.",
    group: "Maintenance",
  },
];

export const categoryGroups = [
  "Domestic",
  "Maintenance",
  "Technical",
  "Outdoor",
] as const;

export const residentPrecincts = [
  "Precinct 1",
  "Precinct 2",
  "Precinct 4",
  "Precinct 6",
  "Precinct 8",
  "Precinct 10",
  "Precinct 11 A",
  "Precinct 11 B",
  "Precinct 12 (Ali Block)",
  "Precinct 15",
  "Precinct 19",
  "Precinct 27",
  "Precinct 31",
  "Precinct 35 A",
  "Precinct 35 B",
];

export function getCategory(slug: string): ServiceCategory | undefined {
  return categories.find((c) => c.slug === slug);
}
