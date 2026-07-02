import { ShieldCheck, Sparkles, Truck, Zap } from "lucide-react";
import { storefrontBenefits } from "@/lib/site";

const icons = [ShieldCheck, Sparkles, Zap, Truck];

export function BenefitsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {storefrontBenefits.map((benefit, index) => {
        const Icon = icons[index] ?? Sparkles;

        return (
          <div key={benefit.title} className="surface rounded-[1.75rem] p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/15 text-cyan">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-xl text-white">{benefit.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{benefit.description}</p>
          </div>
        );
      })}
    </div>
  );
}
