import supabase from "../lib/supabaseClient";

export async function getUserStatus() {
  try {
    const results = await supabase.auth.getUser();
    return results.data.user;
  } catch (error) {
    console.error("Error fetching user status:", error);
    return null;
  }
};
