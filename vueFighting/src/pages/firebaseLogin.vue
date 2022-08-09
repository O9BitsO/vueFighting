<script setup lang="ts">
import { ref } from "vue";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
const provider = new GoogleAuthProvider();
const auth = getAuth();


const emailField = ref('');
function googleSignin() {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user);
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}
function googleSignout() {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('Sign-out successful');
    }).catch((error) => {
        // An error happened.
    });
}
</script>
<template>
    <div style="display: flex; align-items: center; justify-content: center;">
        <input type="text" v-model="emailField">
        <button class="m-3 p-3 bg-red-300" @click="googleSignin">Login with Google</button>
    </div>
</template>
<style>
</style>