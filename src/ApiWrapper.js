// get auth token
async function getAccessToken(auth_url, client_id, client_secret) {
  const response = await fetch(auth_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
    },  
    body: 'grant_type=client_credentials'
  });
  const data = await response.json();
  return data.access_token;
}



// get data from http endpoint - url only (must bake in query params to url)
// if auth, id and secret supplied, will attempt to establish basic auth
export default async function httpRequestWrapper(url, auth_url, client_id, client_secret) {
  // TODO: refactor to case where no auth needed
  if (auth_url) {
    // search
    const token = await getAccessToken(auth_url, client_id, client_secret);
    const response = await fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + token
      }   
    });
    const data = await response.json();
    return data;
  }
}
