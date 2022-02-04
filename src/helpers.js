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

export function getTweetsForUsername(perfil, tweets){

  if (perfil == null || perfil === ''){
    return [];
  }
  // retorna los tweets que tengan el mismo UID del perfil seleccionado
  return tweets?.filter((tweet) => tweet.uid === perfil.id)
}

export function getLikeForUser(props) {

  
}