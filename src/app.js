// src/app.js
import { Auth, getUser } from './auth';

// modifications to src/app.js
import { getUserFragmentList, getUserFragments, postUserFragments, getFragmentDataById, getFragmentInfo, deleteFragmentDataById, updateUserFragments} from './api';

async function init() {
  // Get our UI elements
  const userSection = document.querySelector('#user');
  const loginBtn = document.querySelector('#login');
  const logoutBtn = document.querySelector('#logout');
  const postSection = document.querySelector('#post');
  const postBTN = document.querySelector('#postBtn');
  const getBTN = document.querySelector('#getBtn');
  const getListBTN = document.querySelector('#getListBtn');
  const getByIdBTN = document.querySelector('#getByIdBtn');
  const getInfoBTN = document.querySelector('#getInfoBtn');
  const uploadFileBTN = document.querySelector('#uploadBtn');
  const deleteBTN = document.querySelector('#deleteBtn');
  const updateBTN = document.querySelector('#updateBtn');
  const updateImgBTN = document.querySelector('#updateImageBtn');
  // Wire up event handlers to deal with login and logout.
  loginBtn.onclick = () => {
    // Sign-in via the Amazon Cognito Hosted UI (requires redirects), see:
    // https://docs.amplify.aws/lib/auth/advanced/q/platform/js/#identity-pool-federation
    Auth.federatedSignIn();
  };
  logoutBtn.onclick = () => {
    // Sign-out of the Amazon Cognito Hosted UI (requires redirects), see:
    // https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js/#sign-out
    Auth.signOut();
  };

  // See if we're signed in (i.e., we'll have a `user` object)
  
  const user = await getUser();
  if (!user) {
    // Disable the Logout button
    logoutBtn.disabled = true;
    
    return;
  }

  postBTN.onclick = () => {
    let data = document.querySelector('#data').value;
    let type = document.querySelector('#types').value;
    postUserFragments(user,data,type);
  }

  updateBTN.onclick = () => {
    let data = document.querySelector('#data').value;
    let type = document.querySelector('#types').value;
    let id = document.querySelector('#id').value
    updateUserFragments(user,data,type,id);
  }

 

  deleteBTN.onclick = () => {
    let id = document.querySelector('#id').value
    deleteFragmentDataById(user,id);
  }


  getBTN.onclick = () => {
    getUserFragments(user);
  }
  getListBTN.onclick = () => {
    getUserFragmentList(user);
  }
  
  uploadFileBTN.onclick = () => {
    
    let data = document.getElementById("file").files[0];
    
    if(data != null){
    alert('your file has been uploaded');
    }else{
    alert('choose a file first');
    }
    postUserFragments(user,data,data.type);
  
  }

  updateImgBTN.onclick = () => {
    let data = document.getElementById("file").files[0];
    let id = document.querySelector('#id').value;
    updateUserFragments(user,data,data.type,id);
    console.log('update',data)
  }


  getByIdBTN.onclick = () => {
    let id = document.querySelector('#id').value
    getFragmentDataById(user,id);
  }

  getInfoBTN.onclick = () => {
    let id = document.querySelector('#id').value
    getFragmentInfo(user,id);
  }
  
  
  // Log the user info for debugging purposes
  console.log({ user });
  //display the metadata of all the fragments for current user
  getUserFragmentList(user);
  // Update the UI to welcome the user
  userSection.hidden = false;
  
  // Show the user's username
  userSection.querySelector('.username').innerHTML = user.username;

  // Disable the Login button
  loginBtn.disabled = true;
  if(loginBtn.disabled = true){
    postSection.hidden = false;
  }
  
}

// Wait for the DOM to be ready, then start the app
addEventListener('DOMContentLoaded', init);
