<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useUserInfoStore } from '../stores/userInfo';
const userInfo = useUserInfoStore();
const provider = new GoogleAuthProvider();
const auth = getAuth();

const isLogin = ref(false);
const userPhoto = ref(userInfo.getUserPhoto);
function googleSignin() {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            isLogin.value = true;
            if(!user.email || !user.displayName || !user.photoURL) return;
            userInfo.setUserInfo({email: user.email, displayName: user.displayName, photoURL: user.photoURL});
            userPhoto.value = user.photoURL;
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
        isLogin.value = false;
        userInfo.setUserInfo({email: '', displayName: '', photoURL: ''});
    }).catch((error) => {
        console.log(
            `Errors:
            ---------
            ${error}
            ---------`
        );
        // An error happened.
    });
}

onMounted(()=>{
    console.log(
    `User photo:
    -----------------
    ${userPhoto.value}
    -----------------`
    );
    if(userPhoto.value !== '') {
        isLogin.value = true;
    }
});
</script>
<template>
    <div style="display: flex; align-items: center; justify-content: center;">
        <img v-if="isLogin" :src=userInfo.getUserPhoto alt="a">
        <button v-if="isLogin" class="m-3 p-3 bg-red-300 border border-l-purple-900" @click="googleSignout">Logout</button>
        <div v-else>
            <button class="m-3 p-3 bg-red-300 border border-l-purple-900" @click="googleSignin">Login with Google</button>
        </div>
    </div>
</template>
<style>
</style>