import Reveal from "./Reveal";
import { LEAD_DAYS, MIN_QTY } from "@/lib/rules";

const steps = [
  { title: "Book your date", text: `Pick your event date at least ${LEAD_DAYS} days ahead so we can plan your batch.` },
  { title: "Set your quantities", text: `Choose items, ${MIN_QTY} minimum each. Orders of 50 or more pieces get an automatic discount.` },
  { title: "Pay upfront, we deliver", text: "Pay in full to lock the date. We bake fresh and deliver in your chosen window." },
];

export default function HowItWorks() {
  return (
    <section id="how" className="mx-4 my-16 rounded-[34px] bg-g2 px-8 py-16">
      <div className="mx-auto max-w-[1160px]">
        <Reveal><h2 className="text-[clamp(2.2rem,5vw,3.6rem)]">Planned ahead, delivered fresh</h2></Reveal>
        <div className="mt-9 grid gap-9 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1} className="border-t border-ink pt-4">
              <h3 className="mb-2 text-2xl">{s.title}</h3>
              <p className="text-mut">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
