import { Check, User } from "lucide-react";
import { Card, Eyebrow, Pill } from "./ui";
import { caseStudies } from "../data/caseStudies";

const founderSkills = [
  "Python (openpyxl, pandas)",
  "Workflow automation",
  "Google Drive & Gmail API integration",
  "Data normalization",
  "Formula validation & QA",
];

export function CaseStudies() {
  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-16">
      <Eyebrow tone="teal">Proof of work</Eyebrow>
      <h2 className="font-display text-3xl mb-6 text-ink dark:text-[#EDE9DD]">Case studies</h2>

      <div className="space-y-6">
        {caseStudies.map((cs) => (
          <Card key={cs.title}>
            <div className="grid lg:grid-cols-[1fr_auto] gap-6 mb-6">
              <div>
                <h3 className="font-display text-2xl mb-1 text-ink dark:text-[#EDE9DD]">{cs.title}</h3>
                <p className="text-sm text-[#6B6153] dark:text-[#9AA3B5]">{cs.client}</p>
              </div>
              <div className="grid grid-cols-4 lg:flex gap-4 lg:gap-6 flex-shrink-0">
                {cs.stats.map((s) => (
                  <div key={s.label} className="text-center lg:text-left">
                    <p className="font-display text-2xl text-teal">{s.value}</p>
                    <p className="text-[11px] uppercase tracking-wide text-[#6B6153] dark:text-[#9AA3B5]">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-2 text-clay">The challenge</p>
                <p className="text-sm text-[#6B6153] dark:text-[#9AA3B5]">{cs.challenge}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-2 text-teal">The approach</p>
                <ul className="space-y-2">
                  {cs.approach.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-sm text-[#6B6153] dark:text-[#9AA3B5]">
                      <Check size={14} className="mt-1 flex-shrink-0 text-teal" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-xl p-4 mb-5 bg-teal-soft dark:bg-teal/15">
              <p className="text-sm text-teal">
                <strong>Outcome:</strong> {cs.outcome}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {cs.skills.map((s) => (
                <Pill key={s} tone="teal">
                  {s}
                </Pill>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-6 flex flex-col sm:flex-row gap-5 items-start">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-teal-soft dark:bg-teal/20">
          <User size={20} className="text-teal" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider mb-1 text-teal">Behind DigitizeBiz</p>
          <p className="text-sm mb-3 text-[#6B6153] dark:text-[#9AA3B5]">
            DigitizeBiz is built and run by a developer specializing in data and reporting
            automation — designing systems that connect cloud storage, spreadsheets, and delivery
            into a single unattended pipeline, comfortable turning inconsistent, real-world data
            into reporting leadership can actually trust.
          </p>
          <div className="flex flex-wrap gap-2">
            {founderSkills.map((s) => (
              <Pill key={s} tone="clay">
                {s}
              </Pill>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}
