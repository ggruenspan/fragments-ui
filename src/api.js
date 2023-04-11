// src/api.js

// fragments microservice API
const apiUrl = process.env.API_URL;

/**
 * Given an authenticated user, request all fragments for this user from the
 * fragments microservice (currently only running locally). We expect a user
 * to have an `idToken` attached, so we can send that along with the request.
 */
export async function getUserFragments(user) {
  console.log('Requesting user fragments data...');
  try {
    const res = await fetch(`${apiUrl}/v1/fragments`, {
      headers: {
        // Include the user's ID Token in the request so we're authorized
        Authorization: `Bearer ${user.idToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log( data );
    
  } catch (err) {
    console.error('Unable to call GET /v1/fragment', { err });
  }
}

export async function postUserFragments(user,data,type) {
  console.log('Posting user fragments data...');
  try {
    if(type == 'application/json'){
      data = JSON.parse(JSON.stringify(data));
    }
    const res = await fetch(`${apiUrl}/v1/fragments`, {
      method: "post",
      headers: {
        // Include the user's ID Token in the request so we're authorized
        Authorization: `Bearer ${user.idToken}`,
        'Content-type': type,
      },
      body: data
    });

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    
    console.log('Posted user fragments data: ', data);
    console.log(res);
  } catch (err) {
    console.error('Unable to call POST /v1/fragment', { err });
  }
}

export async function getUserFragmentList(user) {
  console.log('Requesting user fragments data...');
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/?expand=1`, {
      headers: {
        // Include the user's ID Token in the request so we're authorized
        Authorization: `Bearer ${user.idToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log( data );
    
  } catch (err) {
    console.error('Unable to call GET /v1/fragment/?expand=1', { err });
  }
}

export async function getFragmentDataById(user,id) {
  
  try {
    if(id != ""){
    console.log(`Requesting user fragments data by id...${id}`);
    console.log(`fetching ${apiUrl}/v1/fragments/${id}`);
    const res = await fetch(`${apiUrl}/v1/fragments/${id}` , {
      headers: {
        // Include the user's ID Token in the request so we're authorized
        Authorization: `Bearer ${user.idToken}`,
      },
    });
    
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const type = res.headers.get("Content-Type");
    if(type.includes("text")){
    const data = await res.text();
    console.log(`Got user fragment by id ${id}:` , data);
    document.getElementById("dataBack").innerHTML = data;
    }
    if(type.startsWith("image/")){
      const data = await res.blob();
      console.log(`Got user fragment by id ${id}:` , data);
      var myImage = document.querySelector('img');
      var objectURL = URL.createObjectURL(data);
      myImage.src = objectURL;
    }
    if(type.includes("json")){
      const data = await res.json();
      console.log(data);
    }
    }else{
      document.getElementById("dataBack").textContent = "id can not be empty";
    }
  } catch (err) {
    console.error(`Unable to call GET /v1/fragment/ ${id}`, { err });
  }
  
}

export async function getFragmentInfo(user,id) {
  console.log(`Requesting user fragments info by id...${id}`);
  console.log(`fetching ${apiUrl}/v1/fragments/${id}/info`);
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${id}/info` , {
      headers: {
        // Include the user's ID Token in the request so we're authorized
        Authorization: `Bearer ${user.idToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    let data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(`Unable to call GET /v1/fragments/${id}/info`, { err });
  }
}

export async function deleteFragmentDataById(user,id) {
  console.log(`Deleting user fragment by id...${id}`);
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${id}`, {
      method: "delete",
      headers: {
        // Include the user's ID Token in the request so we're authorized
        Authorization: `Bearer ${user.idToken}`
      }
    });
    
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    console.log(`Fragment ${id} successfully deleted`);
    console.log(res);
  } catch (err) {
    console.error(`Unable to call DELETE /v1/fragments/${id}`, { err });
  }
}

export async function updateUserFragments(user,data,type,id) {
  console.log('Updating user fragments data...');
  try {
    if(type == 'application/json'){
      data = JSON.parse(JSON.stringify(data));
    }
    const res = await fetch(`${apiUrl}/v1/fragments/${id}`, {
      method: "put",
      headers: {
        // Include the user's ID Token in the request so we're authorized
        Authorization: `Bearer ${user.idToken}`,
        'Content-type': type,
      },
      body: data
    });

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    
    console.log('Updated user fragments data', data);
    console.log(res);
  } catch (err) {
    console.error('Unable to call PUT /v1/fragment', { err });
  }
}