import {
  Smartphone, Share2, Database, Building2, FileText, Landmark, Wallet,
  Contact, Plane, Home as HomeIcon, ShieldCheck, GraduationCap, MapPinned,
  Ship, Receipt,
  type LucideIcon,
} from "lucide-react";

export interface BizService {
  icon: LucideIcon;
  title: string;
  desc: string;
  docs: string[];
}

export const bizServices: BizService[] = [
  {
    icon: Smartphone, title: "Web Design",
    desc: "Fast, mobile-first sites that turn visits into calls and orders.",
    docs: ["Branding assets (logo, colors) if available", "List of pages/features wanted", "Reference sites you like (optional)"],
  },
  {
    icon: Smartphone, title: "Mobile App Design",
    desc: "Customer or staff apps for ordering, bookings, and loyalty.",
    docs: ["App concept & feature list", "Branding assets (logo, colors)", "Target platforms (iOS/Android/both)"],
  },
  {
    icon: Share2, title: "Social Media Setup",
    desc: "Business pages built, branded, and scheduled — not left dormant.",
    docs: ["Business name & KRA PIN (for verified pages)", "Logo/profile images", "Platforms to set up"],
  },
  {
    icon: Database, title: "Database Management",
    desc: "Customers, stock, and sales in one clean, searchable system.",
    docs: ["Current data source (spreadsheets, paper records, etc.)", "What you need to track", "Number of staff who'll need access"],
  },
  {
    icon: Building2, title: "Company Registration",
    desc: "Full incorporation, filed and followed up until you're live.",
    docs: ["National ID copies of all directors", "KRA PIN of all directors", "Proposed company name(s)", "Nature of business"],
  },
  {
    icon: FileText, title: "Business Registration",
    desc: "Sole proprietorship and business name registration, done right.",
    docs: ["National ID", "KRA PIN", "Proposed business name(s)"],
  },
  {
    icon: Landmark, title: "Sacco Registration",
    desc: "From constitution to certificate — sacco registration handled.",
    docs: ["List of founding members & IDs", "Draft sacco constitution (if any)", "Proposed sacco name"],
  },
  {
    icon: Wallet, title: "Payroll Management",
    desc: "Salaries, statutory deductions, and payslips, every month, on time.",
    docs: ["List of employees & KRA PINs", "Salary structure", "NSSF/NHIF numbers if already registered"],
  },
  {
    icon: Plane, title: "Airport Bookings",
    desc: "Flight and cargo bookings for your team and shipments, managed for you.",
    docs: ["Traveler ID/passport details", "Travel dates & destinations", "Preferred airline (if any)"],
  },
  {
    icon: Ship, title: "Port Clearance",
    desc: "Import/export clearance and customs documentation, handled end-to-end.",
    docs: ["Bill of lading", "Commercial invoice", "KRA PIN"],
  },
  {
    icon: Receipt, title: "KRA Compliance",
    desc: "VAT, PAYE, and tax filings tracked and kept current, month to month.",
    docs: ["KRA PIN", "iTax login details", "Recent income/expense records"],
  },
];

export interface ServiceItem {
  name: string;
  docs: string[];
}

export interface CitizenCategory {
  icon: LucideIcon;
  title: string;
  items: ServiceItem[];
}

export const citizenCategories: CitizenCategory[] = [
  {
    icon: Contact,
    title: "Identity & Civil Registration",
    items: [
      { name: "National ID application / replacement", docs: ["Birth certificate", "Parent's ID (if first ID)", "2 passport photos"] },
      { name: "Birth certificate", docs: ["Notification of birth", "Parents' ID copies"] },
      { name: "Marriage certificate", docs: ["ID copies of both parties", "Notice of intention to marry"] },
      { name: "KRA PIN registration", docs: ["National ID", "Active phone number & email"] },
    ],
  },
  {
    icon: Plane,
    title: "Travel & Mobility",
    items: [
      { name: "ePassport application", docs: ["National ID", "Birth certificate", "Passport photo (eCitizen spec)"] },
      { name: "Driving licence application", docs: ["National ID", "Medical certificate", "NTSA test pass slip"] },
      { name: "Vehicle registration/transfer", docs: ["Logbook", "ID of buyer & seller", "Sale agreement"] },
      { name: "Airport booking assistance", docs: ["National ID or passport", "Travel itinerary", "Payment confirmation"] },
    ],
  },
  {
    icon: HomeIcon,
    title: "Property & Housing",
    items: [
      { name: "Land search (Ardhisasa)", docs: ["Title deed number or parcel number", "ID"] },
      { name: "Title deed application", docs: ["Land search result", "Sale agreement / succession docs"] },
      { name: "Boma Yangu registration", docs: ["National ID", "KRA PIN"] },
    ],
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Clearance",
    items: [
      { name: "Police clearance (Good Conduct)", docs: ["National ID", "Fingerprint slip"] },
      { name: "NHIF / SHA registration", docs: ["National ID", "KRA PIN"] },
      { name: "NSSF registration & statement", docs: ["National ID", "Employer details"] },
      { name: "KRA compliance & tax returns filing", docs: ["KRA PIN", "iTax login details", "Income records"] },
    ],
  },
  {
    icon: Ship,
    title: "Port & Customs Clearance",
    items: [
      { name: "Import Declaration Form (IDF) & port clearance", docs: ["Bill of lading", "Commercial invoice", "KRA PIN", "National ID"] },
      { name: "Motor vehicle import clearance", docs: ["Import declaration", "Original logbook/title (foreign)", "KRA PIN", "NTSA inspection booking"] },
    ],
  },
  {
    icon: GraduationCap,
    title: "Education & Family",
    items: [
      { name: "KUCCPS placement", docs: ["KCSE index number", "National ID"] },
      { name: "KNEC certificate verification", docs: ["Index number", "Year of exam"] },
    ],
  },
  {
    icon: MapPinned,
    title: "County-Level Services",
    items: [
      { name: "Single Business Permit", docs: ["National ID", "KRA PIN", "Premises location"] },
      { name: "Land rates clearance", docs: ["Parcel number", "Previous rates receipt"] },
      { name: "County trade/health/fire licence", docs: ["Business permit", "Premises inspection"] },
    ],
  },
];
