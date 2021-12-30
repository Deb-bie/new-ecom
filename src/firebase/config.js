import { initializeApp } from 'firebase/app';
import { getAuth } from  "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";




const app = initializeApp({
    apiKey: "AIzaSyDkH0OJAMcjLbKTzfG21E238ELkR38FEag",
    authDomain: "new-ecom-13cea.firebaseapp.com",
    projectId: "new-ecom-13cea",
    storageBucket: "new-ecom-13cea.appspot.com",
    messagingSenderId: "290184332761",
    appId: "1:290184332761:web:02006e67604667b9f505c8"
});


export const auth = getAuth(app) 

export const db = getFirestore(app)

export const storage = getStorage(app);


export default app