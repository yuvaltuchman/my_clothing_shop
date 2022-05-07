import {initializeApp} from 'firebase/app'
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider} from  'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAVoF1VXlSbsP2hggQPlcwgqkw5ktbYaNE",
    authDomain: "clothing-shop-db-1a8da.firebaseapp.com",
    projectId: "clothing-shop-db-1a8da",
    storageBucket: "clothing-shop-db-1a8da.appspot.com",
    messagingSenderId: "198509029325",
    appId: "1:198509029325:web:f2db068ff60e8d23a60684"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:"select_account"
})
export const auth = new getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider)
const db = getFirestore()
export const createUserDocumentFromAuth = async (userAuth)=>{
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapShot = await getDoc(userDocRef)
    if (!userSnapShot.exists()){
        const {displayName, email} = userAuth
        const createdAt = new Date()
        try {
            await setDoc(userDocRef, {displayName,email,createdAt})
        }
        catch (error){
            console.log("error creating the user!", error.message)
        }
    }
    return userDocRef
}