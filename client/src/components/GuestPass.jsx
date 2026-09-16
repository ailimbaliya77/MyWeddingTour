import { RiCheckLine } from "react-icons/ri";

const inclusions = [
  "Every ceremony, feast & celebration",
  "A verified, background-checked host family",
  "On-ground concierge for attire & etiquette",
  "One upfront price — no surprise fees",
];

const GuestPass = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
            About That Baraat
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-gray-900 md:text-4xl">
            You Won't Just Watch It Pass — You'll Walk In It
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Every booking comes with your Guest Pass, covering this and
            everything else.
          </p>
        </div>

        {/* Ticket */}
        <div className="relative mx-auto flex max-w-3xl flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-[#8B2E2E] to-[#B0432E] text-white shadow-xl sm:flex-row">
          {/* Stub */}
          <div className="flex flex-col justify-center gap-2 border-b border-dashed border-white/30 p-8 sm:w-[38%] sm:border-b-0 sm:border-r">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-100">
              Admit One Guest
            </p>
            <p className="font-serif text-2xl font-bold leading-tight">
              The Guest Pass
            </p>
            <p className="mt-2 text-sm text-orange-100/90">
              Everything you need for the full celebration, in a single
              booking.
            </p>
          </div>

          {/* Perforation notches */}
          <div className="pointer-events-none absolute left-0 top-1/2 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white sm:block sm:left-[38%]" />
          <div className="pointer-events-none absolute bottom-0 left-1/2 hidden h-6 w-6 -translate-x-1/2 translate-y-1/2 rounded-full bg-white sm:hidden" />

          {/* Main */}
          <div className="flex-1 p-8">
            <ul className="space-y-4">
              {inclusions.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15">
                    <RiCheckLine className="text-sm" />
                  </span>
                  <span className="text-sm leading-relaxed text-white/95">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* barcode flourish */}
            <div className="mt-6 flex h-8 items-end gap-[3px] opacity-60">
              {[3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 1, 4, 2, 1, 3, 1, 1, 2, 1, 4].map(
                (w, i) => (
                  <span
                    key={i}
                    className="bg-white"
                    style={{ width: `${w}px`, height: "100%" }}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestPass;