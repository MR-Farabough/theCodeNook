import supabase from "../lib/supabaseClient";

export async function DBGetUserData(userID:string) {
  let userObj;
  let userInDB = false;
  const DBResponse = await supabase
			.from('User-data')
			.select('uuid, title, username');

  DBResponse.data?.forEach(user => {
    if (user.uuid === userID) {
      userObj = { 
        title: user.title, 
        username: user.username 
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