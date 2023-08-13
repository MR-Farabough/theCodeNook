import supabase from "../lib/supabaseClient";
import { errorThrow } from "./errorThrow";

export async function DBUserInsert(newUser:{
  user_id: string,
  title: string,
  username: string,
}) {
  const userInsert = await supabase.from('User-data').insert({
    uuid: newUser.user_id,
    title: newUser.title,
    username: newUser.username,
  });
  if (userInsert.error === null) {
    return 'USER ADDED'
  } else {
    return errorThrow(`${userInsert.error.message}`)
  }
}