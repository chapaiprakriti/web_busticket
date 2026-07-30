import { NextRequest, NextResponse } from "next/server";

function getAIReply(userMessage: string): string {
  const msg = userMessage.toLowerCase().trim();

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("good morning") || msg.includes("good evening") || msg.includes("good afternoon")) {
    return "Hello! Welcome to Seat Sathi. I can help you with route information, schedules, fares, bookings, and travel tips. What would you like to know?";
  }

  if (msg.includes("route") || msg.includes("bus route") || msg.includes("available route")) {
    return "Seat Sathi offers bus routes across Nepal including Kathmandu-Pokhara, Kathmandu-Chitwan, Kathmandu-Bhairahawa, and many more intercity routes. You can search routes on our home page by entering your origin, destination, and travel date.";
  }

  if (msg.includes("schedule") || msg.includes("timing") || msg.includes("departure") || msg.includes("bus timing") || msg.includes("when does")) {
    return "Bus schedules vary by route. Typically, buses depart early morning (5:00 AM) and run until evening (7:00 PM). For specific schedules, please search a route on our booking page or check with our support team.";
  }

  if (msg.includes("fare") || msg.includes("price") || msg.includes("cost") || msg.includes("ticket price") || msg.includes("how much")) {
    return "Fares depend on the route, distance, and bus type. Budget options start from affordable rates while premium and luxury buses cost more. You can see exact fares when you search a route.";
  }

  if (msg.includes("book") || msg.includes("booking") || msg.includes("reserve") || msg.includes("how to book") || msg.includes("sign up") || msg.includes("register") || msg.includes("order")) {
    return "To book a bus ticket: 1) Search your route, 2) Select a date, 3) Choose available seats, 4) Proceed to payment, and 5) Confirm your booking. You can also log in and book from your dashboard.";
  }

  if (msg.includes("cancel") || msg.includes("refund") || msg.includes("cancel booking")) {
    return "Cancellations are allowed up to 2 hours before departure. Refunds are processed back to your original payment method within 5-7 business days.";
  }

  if (msg.includes("support") || msg.includes("help") || msg.includes("contact") || msg.includes("issue") || msg.includes("problem") || msg.includes("complaint")) {
    return "You can reach our support team at support@seatsathi.com or call +977 9800000000. We're available 24/7 to help with any booking issues or questions.";
  }

  if (msg.includes("location") || msg.includes("address") || msg.includes("office") || msg.includes("branch")) {
    return "Seat Sathi HQ is located in Kathmandu, Nepal. We serve bus routes across the entire country. Visit our website or app to find the nearest booking location.";
  }

  if (msg.includes("thank")) {
    return "You're welcome! Is there anything else I can help you with today? Ask me about routes, schedules, fares, or bookings.";
  }

  if (msg.includes("by") || msg.includes("goodbye") || msg.includes("bye") || msg.includes("see you")) {
    return "Goodbye! Have a safe and pleasant journey with Seat Sathi. Come back anytime for assistance!";
  }

  if (msg.includes("what") && msg.includes("you do")) {
    return "I'm Seat Sathi's AI assistant. I can help you with: \u2022 Route information \u2022 Bus schedules \u2022 Fare estimates \u2022 Booking assistance \u2022 Cancellation & refund info \u2022 Travel tips \u2022 Route planning Just ask me anything!";
  }

  return "I'm Seat Sathi's AI travel assistant! I can help you with route information, schedules, fares, bookings, cancellations, and travel tips. What would you like to know? Try asking: 'What routes are available?', 'How do I book?', or 'What are the fares?'";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body as { message?: string };

    if (!message || !message.trim()) {
      return NextResponse.json(
        { reply: "Please enter a message." },
        { status: 400 }
      );
    }

    const reply = getAIReply(message.trim());
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("AI chat error:", error);
    return NextResponse.json(
      { reply: "Sorry, something went wrong. Please try again." },
      { status: 500 }
    );
  }
}