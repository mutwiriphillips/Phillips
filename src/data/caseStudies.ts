export interface CaseStudy {
  title: string;
  client: string;
  stats: { label: string; value: string }[];
  challenge: string;
  approach: string[];
  outcome: string;
  skills: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    title: "Automated Multi-Outlet Inventory Reporting",
    client: "Tropical Group — 4-outlet hospitality group, Nairobi",
    stats: [
      { label: "Outlets covered", value: "4" },
      { label: "Manual steps", value: "0" },
      { label: "Report sheets", value: "6" },
      { label: "Cadence", value: "Daily" },
    ],
    challenge:
      "Four outlets, four independently structured spreadsheets — different column layouts, different header positions, and no outlet calculating total purchase value on its own. Getting one trustworthy, group-wide number meant manually opening four files and reconciling them by hand, every single reporting cycle.",
    approach: [
      "Built schema-agnostic parsing that auto-detects each outlet's header row and adapts to its column layout on the fly — buy price sits in a different column at almost every outlet.",
      "Engineered a new standardized metric, Purchases (KES) = Qty × Buy Price, present in none of the source files, so leadership could finally compare outlets like-for-like.",
      "Consolidated everything into a five-plus-sheet master workbook — Executive Dashboard, Outlet Comparison, All Items Master, Purchases Summary, Top Movers — built on live formulas, not hardcoded totals, so it recalculates as inputs change.",
      "Validated every report with a headless recalculation pass before it ever reached a stakeholder, and closed the loop with an auto-generated, branded email summary and file delivery — zero manual handling.",
    ],
    outcome:
      "A recurring multi-file, manual reconciliation task became a single automated run — a same-day, group-wide view of stock and purchase spend across all four outlets, with a full formula audit trail.",
    skills: [
      "Data engineering",
      "Spreadsheet automation",
      "API integration",
      "Workflow automation",
      "Financial reporting",
    ],
  },
];
