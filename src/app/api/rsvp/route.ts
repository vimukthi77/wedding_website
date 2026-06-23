import { NextResponse } from "next/server";

interface RSVPPayload {
  name?: string;
  guests?: string;
  attendance?: "yes" | "no" | "maybe";
  message?: string;
}

// Google Apps Script web app that appends each RSVP to a Google Sheet.
// Override with env GOOGLE_SHEET_WEBAPP_URL if you redeploy the script.
const SHEET_URL =
  process.env.GOOGLE_SHEET_WEBAPP_URL ||
  "https://script.google.com/macros/s/AKfycbwg0pBIEaGuNt63MUqBwJ4sX-kyQzZvM6LYfsHL7JAyaE0DWLpgS_h8ArqFhYPju5d1/exec";

async function saveToSheet(data: RSVPPayload): Promise<boolean> {
  try {
    // The Apps Script doPost does JSON.parse(e.postData.contents), so we must
    // send a raw JSON body (not form-encoded).
    const body = JSON.stringify({
      name: data.name ?? "",
      guests: data.guests ?? "",
      attendance: data.attendance ?? "",
      message: data.message ?? "",
      timestamp: new Date().toISOString(),
    });

    const res = await fetch(SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      redirect: "follow",
    });

    const text = await res.text();

    // Apps Script returns HTTP 200 even on a script error, rendering an HTML
    // error page. Treat any HTML/error response as a failure.
    const looksLikeError =
      /<!doctype html|errorMessage|SyntaxError|TypeError|ReferenceError/i.test(
        text
      );

    if (!res.ok || looksLikeError) {
      console.error("[RSVP] Google Sheet rejected:", text.slice(0, 200));
      return false;
    }
    return true;
  } catch (err) {
    console.error("[RSVP] Google Sheet error:", err);
    return false;
  }
}

export async function POST(request: Request) {
  let data: RSVPPayload;
  try {
    data = (await request.json()) as RSVPPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!data.name || !data.attendance) {
    return NextResponse.json(
      { error: "Name and attendance are required" },
      { status: 400 }
    );
  }

  console.log("[RSVP]", {
    name: data.name,
    guests: data.guests || "—",
    attendance: data.attendance,
    message: data.message || "—",
    at: new Date().toISOString(),
  });

  // Store the RSVP in the Google Sheet.
  const savedToSheet = await saveToSheet(data);

  return NextResponse.json({ success: true, savedToSheet });
}
