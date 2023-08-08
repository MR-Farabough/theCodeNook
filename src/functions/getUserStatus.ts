import supabase from "../lib/supabaseClient";

export const getUserStatus = async () => {
  try {
    const results = await supabase.auth.getUser();
    return results.data.user;
  } catch (error) {
    console.error("Error fetching user status:", error);
    return null;
  }
};
