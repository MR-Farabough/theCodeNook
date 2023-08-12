export function NewsletterInputValidation(title:string, article:string, signature:string) {
  return title.length > 3 && article.length > 50 && signature.length > 3 ? true : false
}