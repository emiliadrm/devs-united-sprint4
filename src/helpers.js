export function getProfileForUID(profiles = [], uid) {
  if (uid == null || uid === '') { // javascript convierte los tipos cuando se usa ==, undefined == null, null == undefined, null == null, undefined == undefined
    return {};
  }
  return profiles.find((profile) => profile.id === uid);
  // retorna elemento con id === uid, si no consigue entonces retorna undefined
}


export function getIDforUsername(profiles = [], paramUsername) {

  if (paramUsername == null || paramUsername === ''){
    return {};
  }
  return profiles.find((profile) => profile.username === paramUsername)
  // retorna elemento con username === parametroUsername, si no consigue entonces retorna undefined
}


export function getProfileForId(profiles = [], id) {

  if (id == null || id === ''){
    return {};
  }
  return profiles.find((profile) => profile.id === id)
}


export function getTweetsForUsername(perfil, tweets){

  if (perfil == null || perfil === ''){
    return [];
  }
  // retorna los tweets que tengan el mismo UID del perfil seleccionado
  return tweets?.filter((tweet) => tweet.uid === perfil.id);
}


export function getCountLike(tweet, arrayLikes) {

  if (tweet == null || tweet === ''){
    return 0;
  }
  if (arrayLikes == null){
    return 0;
  }
  //retorna los un array con la cantidad de counterfavoritelikes que sean igual al ID del tweet

  const numLikes = arrayLikes.filter((element) => element.tweetLikeID === tweet);
  return numLikes.length;
}


export function getLikesForUser(user, arrayFavorites) {

  if (user == null){
    return [];
  }
  if (arrayFavorites == null){
    return [];
  }
// RETORNA UN ARRAY CON LOS ELEMENTOS QUE COINCIDEN CON EL USUARIO
  const likesForUser = arrayFavorites.filter((element) => element.userUID === user.uid);
  return likesForUser;
}


export function searchTweetsForId(arrayInf) {

  if (arrayInf == null){
    return [];
  }

// Retorna un array de IDS
  return arrayInf.map(arrayInf => arrayInf.tweetLikeID);
}


export function getTweetsForId(favsid, tweets){

  if (favsid == null || favsid === ''){
    return [];
  }
  // retorna los tweets que tengan el mismo id del array filtrado
  return tweets?.filter((tweet) => favsid.includes(tweet.id));
}


// HELPERS PARA FECHAS Y SORT
export function getUnixTime() {
  const today = new Date();
  return today.getTime();
}


export function getDateFromUnixTime(unixDate) {
  const date = new Date(unixDate);
  const monthString = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const monthDate = date.getMonth();
  const dayDate = date.getDate();

  return `${dayDate} ${monthString[monthDate]}`
}


export function verifiedExistUsername(profiles, username = '') {
    const profile = profiles.find((profi) => profi.username.toLowerCase() === username.toLowerCase());
    return profile != null;
}