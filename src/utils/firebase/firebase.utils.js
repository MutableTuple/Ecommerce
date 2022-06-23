import { initializeApp } from 'firebase/app';
import { getAuth, 
         signInWithRedirect, 
         signInWithPopup, 
         GoogleAuthProvider,
         createUserWithEmailAndPassword 
        } from  'firebase/auth';

import { getFirestore,
        doc,
        getDoc,
        setDoc,
       } 
      from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD_v_HnC-NmzOKscvs8qEqH3kjJmLm9suU",
    authDomain: "crwn-clothing2-edeb5.firebaseapp.com",
    projectId: "crwn-clothing2-edeb5",
    storageBucket: "crwn-clothing2-edeb5.appspot.com",
    messagingSenderId: "1044161908679",
    appId: "1:1044161908679:web:5ca0691c6fd9a983fc93e2",
    measurementId: "G-EVXMZRCMEQ"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters(
   { prompt: "select_account"
    
    }
    );

    export const auth = getAuth();
    export const signInwithGooglePopup = () => signInWithPopup(auth, provider);

    export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);
    

    export const db =  getFirestore();

    export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {displayName: ""}) =>{
      if(!userAuth) return;

      const userDocRef = doc(db, 'users', userAuth.uid );

      console.log(userDocRef);

      const userSnapshot = await getDoc(userDocRef);
      console.log(userSnapshot);
      console.log(userSnapshot.exists());

      if (!userSnapshot.exists()){
        const { displayName , email } = userAuth;
        const createdAt = new Date();

        try{
          await setDoc(userDocRef, {
            displayName, 
            email,
            createdAt,
            ...additionalInformation,
          });
        }
        catch(error){
          console.log('erorr creating user', error.messsage);

        }
      }

      // check if user data exists


      // return userdocref if it does exitss
      return( userDocRef );



      // if not exists


    }

    export const createAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);

    };