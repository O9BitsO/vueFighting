<script setup lang="ts">
import { PublicClientApplication } from '@azure/msal-browser';
import { onMounted } from 'vue';
import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";
import { ref } from 'vue';
import { store } from '../stores/store';
let account;

const loginCre = store();
console.log('------------');
console.log('setup');
console.log(loginCre.msalConfig);
console.log('------------');
let msalInstance: any;
const isLogin = ref(false);

// const provider = new OAuthProvider('microsoft.com');

// provider.setCustomParameters({
//   // Optional "tenant" parameter in case you are using an Azure AD tenant.
//   // eg. '8eaef023-2b34-4da1-9baa-8bc8c9d6a490' or 'contoso.onmicrosoft.com'
//   // or "common" for tenant-independent tokens.
//   // The default value is "common".
//   prompt: 'consent',
//   tenant: 'f8cdef31-a31e-4b4a-93e4-5f571e91255a',
// });

// const auth = getAuth();
// signInWithPopup(auth, provider)
//   .then((result) => {
//     // User is signed in.
//     // IdP data available in result.additionalUserInfo.profile.

//     // Get the OAuth access token and ID Token
//     const credential = OAuthProvider.credentialFromResult(result);
//     // const accessToken = credential.accessToken;
//     // const idToken = credential.idToken;
//     console.log(credential);
//   })
//   .catch((error) => {
//     console.log(error);
//     // Handle error.
//   });

async function SignIn() {
    await msalInstance
        .loginPopup({})
        .then(() => {
            const myAccounts = msalInstance.getAllAccounts();
            account = myAccounts[0];
            isLogin.value = true;
            console.log(account);
        }).catch((error:Error) =>{console.error(error);});
}

async function SignOut() {
    await msalInstance
        .logout({})
        .then(() => {
            console.log('LogOut');
            isLogin.value = false;
        }).catch((error:Error) =>{console.error(error);});
}

onMounted(() => {
    msalInstance = new PublicClientApplication(loginCre.msalConfig);
    console.log('mounted');
    console.log(msalInstance);
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length == 0) {
        return;
    }
    account = accounts[0];
    console.log(account);
})
</script>
<template>
    <div style="display: flex; justify-content: center; align-items: center;">        
        <button v-if="isLogin" class="m-3 p-3 rounded bg-red-300 hover:bg-red-600 hover:translate-x-1 hover:translate-y-1" @click="SignOut">Logout</button>
        <button v-else class="m-3 p-3 rounded bg-green-300 hover:bg-green-600 hover:translate-x-1 hover:translate-y-1" @click="SignIn">Signin with microsoft account</button>
    </div>
</template>
<style>
</style>