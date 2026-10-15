"use client";

import { Check, Minus, Plus, X } from "lucide-react";
import { createContext, useCallback, useContext, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Sheet } from "@/components/ui/Sheet";
import { openingHours, site } from "@/data/site";
import { cn } from "@/lib/cn";

const DAYS_AHEAD = 30;
const MAX_GUESTS = 8;

const ReservationContext = createContext<{ open: () => void } | null>(null);

export function useReservation() {
  const ctx = useContext(ReservationContext);
  if (!ctx) throw new Error("useReservation must be used inside <ReservationProvider>");
  return ctx;
}

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  // A fresh form each time the dialog opens.
  const [session, setSession] = useState(0);
  const open = useCallback(() => {
    setSession((s) => s + 1);
    setIsOpen(true);
  }, []);

  return (
    <ReservationContext.Provider value={{ open }}>
      {children}
      <Sheet
        open={isOpen}
        onClose={() => setIsOpen(false)}
        labelledBy="booking-title"
        from="translateY(32px)"
        className="m-auto w-full max-w-xl max-sm:mb-0 max-sm:max-w-none"
        panelClassName="max-h-[92svh] overflow-y-auto overscroll-contain bg-stone shadow-[0_40px_120px_-30px_rgb(25_24_23/0.6)]"
      >
        {session > 0 && <BookingForm key={session} onClose={() => setIsOpen(false)} />}
      </Sheet>
    </ReservationContext.Provider>
  );
}

function upcomingDays() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return Array.from({ length: DAYS_AHEAD }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

/** Seatings every 30 minutes from opening until 90 minutes before close; today needs an hour's notice. */
function slotsFor(date: Date) {
  const hours = openingHours[date.getDay()];
  if (!hours) return [];
  const [oh, om] = hours.open.split(":").map(Number);
  const [ch, cm] = hours.close.split(":").map(Number);
  const now = new Date();
  const earliest = date.toDateString() === now.toDateString() ? now.getHours() * 60 + now.getMinutes() + 60 : 0;
  const slots: string[] = [];
  for (let t = oh * 60 + om; t <= ch * 60 + cm - 90; t += 30) {
    if (t >= earliest) slots.push(`${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`);
  }
  return slots;
}

const fmt = {
  day: new Intl.DateTimeFormat("en-GB", { weekday: "short" }),
  date: new Intl.DateTimeFormat("en-GB", { day: "numeric" }),
  month: new Intl.DateTimeFormat("en-GB", { month: "short" }),
  long: new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long" }),
};

function BookingForm({ onClose }: { onClose: () => void }) {
  const days = useMemo(upcomingDays, []);
  const [date, setDate] = useState(() => days.find((d) => slotsFor(d).length > 0) ?? days[0]);
  const slots = useMemo(() => slotsFor(date), [date]);
  const [time, setTime] = useState<string | null>(null);
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!time) return setError("Please choose a time.");
    if (!name.trim() || phone.replace(/\D/g, "").length < 7) return setError("Please add your name and a mobile number for the confirmation.");
    setError(null);
    setDone(true);
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <h2 id="booking-title" className="text-[2.75rem] italic">
          {done ? "Your table is held" : "Reserve a table"}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close booking"
          className="tap -mt-1 -mr-2 grid h-11 w-11 shrink-0 place-items-center text-ink-soft hover:text-ink"
        >
          <X size={22} strokeWidth={1.25} />
        </button>
      </div>

      {done ? (
        <div className="mt-6 animate-[fade-up_0.6s_var(--ease-silk)]">
          <div className="on-dark flex gap-4 bg-barolo p-6 text-bone">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-brass-light text-brass-light">
              <Check size={16} strokeWidth={1.5} />
            </span>
            <p>
              A table for {guests} on {fmt.long.format(date)} at {time}, in the name of {name.trim()}. We&rsquo;ll send a confirmation to {phone} within
              the hour.
            </p>
          </div>
          <p className="mt-5 text-[0.95rem] text-ink-soft">To change or cancel, call {site.phone}.</p>
          <button type="button" onClick={onClose} autoFocus className="btn mt-8">
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="mt-2 space-y-7">
          <p className="text-[0.95rem] text-ink-soft">
            Reservations open {DAYS_AHEAD} days ahead, for up to {MAX_GUESTS} guests. For the chef&rsquo;s table, please call.
          </p>

          <fieldset>
            <legend className="mb-3 text-[0.9rem] tracking-[0.02em] text-ink-soft">Date</legend>
            <div className="no-scrollbar -mx-6 flex snap-x gap-2 overflow-x-auto px-6 pb-2 sm:-mx-8 sm:px-8" role="radiogroup" aria-label="Date">
              {days.map((d) => {
                const closed = slotsFor(d).length === 0;
                const selected = d.getTime() === date.getTime();
                return (
                  <button
                    key={d.toISOString()}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    aria-label={`${fmt.long.format(d)}${closed ? ", no tables" : ""}`}
                    disabled={closed}
                    onClick={() => {
                      setDate(d);
                      setTime((t) => (t && slotsFor(d).includes(t) ? t : null));
                    }}
                    className={cn(
                      "tap flex w-[4.25rem] shrink-0 snap-start flex-col items-center border py-3 transition-colors duration-500",
                      selected ? "border-ink bg-ink text-stone" : "border-ink/15 hover:border-ink/60",
                      closed && "opacity-30",
                    )}
                  >
                    <span className="text-xs">{fmt.day.format(d)}</span>
                    <span className="font-display text-[1.65rem] leading-tight">{fmt.date.format(d)}</span>
                    <span className="text-[11px] opacity-70">{fmt.month.format(d)}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-3 text-[0.9rem] tracking-[0.02em] text-ink-soft">Time</legend>
            {slots.length === 0 ? (
              <p className="text-ink-soft">No tables remain today. Please choose another date.</p>
            ) : (
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-5" role="radiogroup" aria-label="Time">
                {slots.map((s) => (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    aria-checked={time === s}
                    onClick={() => setTime(s)}
                    className={cn(
                      "tap min-h-11 border text-[0.95rem] tabular-nums transition-colors duration-500",
                      time === s ? "border-ink bg-ink text-stone" : "border-ink/15 hover:border-ink/60",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </fieldset>

          <div className="flex items-center justify-between gap-4">
            <span id="guests-label" className="text-[0.9rem] tracking-[0.02em] text-ink-soft">
              Guests
            </span>
            <div className="flex items-center gap-1 border border-ink/15 p-1" role="group" aria-labelledby="guests-label">
              <button
                type="button"
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                disabled={guests <= 1}
                aria-label="Fewer guests"
                className="tap grid h-10 w-10 place-items-center hover:bg-ink/5 disabled:opacity-30"
              >
                <Minus size={18} />
              </button>
              <output aria-live="polite" className="w-10 text-center font-display text-[1.65rem]">
                {guests}
              </output>
              <button
                type="button"
                onClick={() => setGuests((g) => Math.min(MAX_GUESTS, g + 1))}
                disabled={guests >= MAX_GUESTS}
                aria-label="More guests"
                className="tap grid h-10 w-10 place-items-center hover:bg-ink/5 disabled:opacity-30"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-[0.9rem] tracking-[0.02em] text-ink-soft">Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="h-12 w-full border-b border-ink/30 bg-transparent px-0 text-lg focus:border-ink focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-[0.9rem] tracking-[0.02em] text-ink-soft">Mobile number</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className="h-12 w-full border-b border-ink/30 bg-transparent px-0 text-lg focus:border-ink focus:outline-none"
              />
            </label>
          </div>

          <div className="min-h-6" aria-live="assertive">
            {error && <p className="text-barolo">{error}</p>}
          </div>

          <button type="submit" className="btn btn-solid w-full [--btn-fill:var(--color-barolo)] [--btn-text:var(--color-bone)]">
            {time ? `Reserve ${time} for ${guests}` : "Reserve"}
          </button>
        </form>
      )}
    </div>
  );
}
