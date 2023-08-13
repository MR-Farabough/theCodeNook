import supabase from "../lib/supabaseClient";
import { errorThrow } from "./errorThrow";

export async function getUserStatus() {
  try {
    const results = await supabase.auth.getUser();
    return results.data.user;
  } catch (error) {
    errorThrow(`
    Error fetching user status:
    
    ${error}
    `);
    return null;
  }
};
