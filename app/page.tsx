import { Arches } from "@/components/home/Arches";
import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { Sala } from "@/components/home/Sala";
import { Signatures } from "@/components/home/Signatures";
import { Thread } from "@/components/layout/Thread";
import { JsonLd } from "@/components/ui/JsonLd";
import { openingHours, site } from "@/data/site";

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: site.name,
          description: site.description,
          url: site.url,
          telephone: site.phone,
          servesCuisine: ["Italian", "Fresh pasta"],
          priceRange: "£££",
          acceptsReservations: true,
          menu: `${site.url}/menu/`,
          address: { "@type": "PostalAddress", streetAddress: site.address.street, addressLocality: "London", postalCode: "W1K 2RN", addressCountry: "GB" },
          geo: { "@type": "GeoCoordinates", latitude: site.address.lat, longitude: site.address.lng },
          openingHoursSpecification: Object.entries(openingHours)
            .filter(([, h]) => h)
            .map(([day, h]) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: dayNames[Number(day)], opens: h!.open, closes: h!.close })),
        }}
      />
      <Thread />
      <Hero />
      <Manifesto />
      <Arches />
      <Signatures />
      <Sala />
    </>
  );
}
