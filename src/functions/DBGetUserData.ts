import supabase from "../lib/supabaseClient";

export async function DBGetUserData(userID:string) {
  let userObj;
  let userInDB = false;
  const DBResponse = await supabase
			.from('User-data')
			.select('uuid, title, username, articles');

  DBResponse.data?.forEach(user => {
    if (user.uuid === userID) {
      userObj = { 
        uuid: user.uuid,
        title: user.title, 
        username: user.username,
        articles: user.articles
      }
      userInDB = true
    }
  })
  
  let returnVal = {
    count:DBResponse.count,
    data: userObj,
    error: DBResponse.error,
    status: DBResponse.status,
    statusText: DBResponse.statusText
  }
  return !userInDB ? false : returnVal
}