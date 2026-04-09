import { createClient } from "@/lib/supabase/server";
import type { NotificationPreferences } from "@/app/types/notifications";

const DEFAULTS: NotificationPreferences = {
  emailEnabled: false,
  oneWeekReminder: false,
  oneMonthReminder: false,
  oneYearReminder: false,
};

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("users")
    .select("email_enabled, one_week_reminder, one_month_reminder, one_year_reminder")
    .eq("id", user.id)
    .single();

  if (error || !data) {
    return Response.json({ preferences: DEFAULTS });
  }

  return Response.json({
    preferences: {
      emailEnabled: data.email_enabled,
      oneWeekReminder: data.one_week_reminder,
      oneMonthReminder: data.one_month_reminder,
      oneYearReminder: data.one_year_reminder,
    },
  });
}

export async function PUT(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  let body: NotificationPreferences;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { emailEnabled, oneWeekReminder, oneMonthReminder, oneYearReminder } = body;
  if (
    typeof emailEnabled !== "boolean" ||
    typeof oneWeekReminder !== "boolean" ||
    typeof oneMonthReminder !== "boolean" ||
    typeof oneYearReminder !== "boolean"
  ) {
    return Response.json({ error: "All fields must be booleans" }, { status: 400 });
  }

  const { error } = await supabase.from("users").upsert(
    {
      id: user.id,
      email: user.email,
      email_enabled: emailEnabled,
      one_week_reminder: oneWeekReminder,
      one_month_reminder: oneMonthReminder,
      one_year_reminder: oneYearReminder,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ ok: true });
}
