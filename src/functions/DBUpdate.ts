import supabase from "../lib/supabaseClient"
import { errorThrow } from "./errorThrow"

export async function DBUpdate(userObj:{ title: string, username: string }, userID:string) {
  const DBUpdate = await supabase
    .from('User-data')
    .update(userObj)
    .eq('uuid', userID)

  if (DBUpdate.error === null) {
    return console.log('USER UPDATED')
  } else {
    return errorThrow(`${DBUpdate.error}`)
  }
}