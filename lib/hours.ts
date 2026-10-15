import { openingHours, site } from "@/data/site";

export type OpenStatus = { isOpen: boolean; label: string };

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** Weekday and minutes since midnight in the restaurant's time zone, wherever the visitor is. */
function localClock(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: site.timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday")),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export function getOpenStatus(date = new Date()): OpenStatus {
  const { day, minutes } = localClock(date);
  const today = openingHours[day];

  if (today) {
    const open = toMinutes(today.open);
    const close = toMinutes(today.close);
    if (minutes >= open && minutes < close) {
      return close - minutes <= 45
        ? { isOpen: true, label: `Last orders, kitchen closes at ${today.close}` }
        : { isOpen: true, label: `Open now until ${today.close}` };
    }
    if (minutes < open) return { isOpen: false, label: `Opens today at ${today.open}` };
  }
  for (let offset = 1; offset <= 7; offset++) {
    const next = (day + offset) % 7;
    const hours = openingHours[next];
    if (hours) return { isOpen: false, label: `Closed now, opens ${offset === 1 ? "tomorrow" : weekdays[next]} at ${hours.open}` };
  }
  return { isOpen: false, label: "Closed" };
}
