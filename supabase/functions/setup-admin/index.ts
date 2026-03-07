import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Create admin user
  const { data: user, error: createError } = await supabase.auth.admin.createUser({
    email: "admin@ironfit.local",
    password: "admin1234",
    email_confirm: true,
  });

  if (createError && !createError.message.includes("already")) {
    return new Response(JSON.stringify({ error: createError.message }), { status: 400 });
  }

  const userId = user?.user?.id;
  if (userId) {
    await supabase.from("user_roles").upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });
  }

  return new Response(JSON.stringify({ success: true, message: "Admin account created" }), {
    headers: { "Content-Type": "application/json" },
  });
});
