import supabase from "../lib/supabaseClient";
import { errorThrow } from "./errorThrow";

export const DBGetNewsletter = async () => {
  const DBReturn = await supabase
    .from('Newsletters')
    .select('title, article, signature')
    
  if (!DBReturn.error) {
    console.log('Newsletter retrevial completed')
    return DBReturn.data
  } else  {
    return errorThrow(`
    Could not retrieve Newsletter data
    ${DBReturn.error.message}
    `)
  }
}