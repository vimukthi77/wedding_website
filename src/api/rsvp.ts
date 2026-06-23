// Client-side RSVP helper.
// Posts to the secure Next.js route handler at /api/rsvp, which sends the
// email server-side (keeps any API key off the client).

export interface RSVPData {
  name: string;
  guests: string;
  attendance: "yes" | "no" | "maybe";
  message: string;
}

export const sendRSVPEmail = async (
  data: RSVPData
): Promise<{ success: boolean; error?: string }> => {
  try {
    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      return { success: false, error: body.error || "Failed to submit RSVP" };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};
