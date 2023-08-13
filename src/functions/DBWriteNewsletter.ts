import supabase from '../lib/supabaseClient';
import { errorThrow } from './errorThrow';

export async function writeToNewsletterDB(newsletterObj:{title: string, article: string, signature: string}) {
  const writeToNewsletterDB = await supabase.from('Newsletters')
    .insert(newsletterObj)

  if (writeToNewsletterDB.error === null) {
    console.log('Successfully Added Newsletter')
  } else {
    errorThrow(`
    Unsuccessful write to DB
    ${writeToNewsletterDB.error.message}
    `)
  }
};