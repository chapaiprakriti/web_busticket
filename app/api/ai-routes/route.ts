import { NextRequest, NextResponse } from "next/server";

const KNOWN_ROUTES = [
  { from: "kathmandu", to: "pokhara", distances: ["150 km", "200 km"], buses: ["Express", "Luxury", "Standard"], time: "6-8 hours" },
  { from: "kathmandu", to: "chitwan", distances: ["120 km", "170 km"], buses: ["Express", "Standard"], time: "4-5 hours" },
  { from: "kathmandu", to: "bhairahawa", distances: ["180 km", "240 km"], buses: ["Express", "Luxury", "Standard"], time: "7-9 hours" },
  { from: "kathmandu", to: "biratnagar", distances: ["400 km", "450 km"], buses: ["Express", "Luxury"], time: "10-12 hours" },
  { from: "kathmandu", to: "dharan", distances: ["480 km", "520 km"], buses: ["Express", "Luxury"], time: "12-14 hours" },
  { from: "kathmandu", to: "hile", distances: ["520 km", "580 km"], buses: ["Express"], time: "14-16 hours" },
  { from: "kathmandu", to: "janakpur", distances: ["250 km", "300 km"], buses: ["Express", "Luxury", "Standard"], time: "6-8 hours" },
  { from: "kathmandu", to: "lumbini", distances: ["300 km", "350 km"], buses: ["Express", "Standard"], time: "7-9 hours" },
  { from: "kathmandu", to: "nepalgunj", distances: ["550 km", "600 km"], buses: ["Express", "Luxury"], time: "14-16 hours" },
  { from: "pokhara", to: "chitwan", distances: ["180 km", "220 km"], buses: ["Express", "Standard"], time: "5-7 hours" },
  { from: "pokhara", to: "bhairahawa", distances: ["280 km", "340 km"], buses: ["Express", "Luxury"], time: "7-9 hours" },
  { from: "chitwan", to: "bhairahawa", distances: ["200 km", "260 km"], buses: ["Express", "Standard"], time: "5-7 hours" },
  { from: "biratnagar", to: "dharan", distances: ["120 km", "160 km"], buses: ["Express", "Standard"], time: "3-4 hours" },
  { from: "biratnagar", to: "hile", distances: ["100 km", "140 km"], buses: ["Express"], time: "3-5 hours" },
];

function getRouteSuggestions(from: string, to: string, date: string): { from: string; to: string; date: string; reason: string }[] {
  const f = from.toLowerCase().trim();
  const t = to.toLowerCase().trim();

  if (f === t) {
    return [
      { from, to, date, reason: "Origin and destination are the same. Please choose different locations." },
    ];
  }

  const matchedRoutes = KNOWN_ROUTES.filter(
    (route) =>
      (route.from === f && route.to === t) ||
      (route.from === t && route.to === f)
  );

  if (matchedRoutes.length === 0) {
    const suggestions: { from: string; to: string; date: string; reason: string }[] = [
      { from, to, date, reason: "Route not in our database yet, but you can still try searching directly." },
    ];

    if (!f.includes("kathmandu")) {
      suggestions.push({ from, to: "Kathmandu", date, reason: "Kathmandu is a major hub with many connecting routes." });
    }
    if (!t.includes("kathmandu")) {
      suggestions.push({ from: "Kathmandu", to, date, reason: "Kathmandu is a major hub with many connecting routes." });
    }
    if (!f.includes("pokhara")) {
      suggestions.push({ from, to: "Pokhara", date, reason: "Pokhara is a popular destination with multiple daily connections." });
    }

    return suggestions;
  }

  return matchedRoutes.map((route) => {
    const bestBus = route.buses.includes("Luxury") ? "Luxury" : route.buses[0];
    return {
      from: route.from === f ? route.from : route.to,
      to: route.to === t ? route.to : route.from,
      date,
      reason: `${bestBus} bus available, approx. ${route.time} travel time (${route.distances[0]}).`,
    };
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { from, to, date } = body as {
      from?: string;
      to?: string;
      date?: string;
    };

    if (!from || !to) {
      return NextResponse.json(
        { suggestions: [], error: "From and to fields are required." },
        { status: 400 }
      );
    }

    const suggestions = getRouteSuggestions(
      from.trim(),
      to.trim(),
      date || new Date().toISOString().split("T")[0]
    );

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("AI routes error:", error);
    return NextResponse.json(
      { suggestions: [], error: "An error occurred." },
      { status: 500 }
    );
  }
}