import { initializeApp } from "firebase/app";
import { getAuth, updateProfile, updatePassword, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getDownloadURL, getStorage, ref, deleteObject, uploadBytes } from "firebase/storage";
import uuid from 'react-uuid';
import env from "react-dotenv";

const firebaseConfig = {
  apiKey: env.REACT_APP_FIREBASE_API_KEY,
  authDomain: env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

export const signUpUser = (formFields: {
  email: string,
  password: string,
  name: string
}) => {
  let auth = getAuth();
  return createUserWithEmailAndPassword(auth, formFields.email, formFields.password)
    .then(() => {
      updateProfile(auth.currentUser, {
        displayName: formFields.name, photoURL: ""
      })
    })
    .then(() => {
      auth = getAuth();
      return auth.currentUser.getIdToken().then((token) => {
        return {
          email: auth.currentUser.email,
          id: auth.currentUser.uid,
          token,
          name: auth.currentUser.displayName,
          photoURL: auth.currentUser.photoURL
        };
      })
    })
    .catch(error => {
      console.error(error);
      throw error;
    })
}

export const loginUser = (formFields: { email: string, password: string }) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, formFields.email, formFields.password)
    .then(({ user }) => {
      return user.getIdToken().then((token) => {
        return {
          email: user.email,
          id: user.uid,
          token: token,
          name: user.displayName,
          photoURL: auth.currentUser.photoURL

        };

      })
    })
    .catch(error => {
      console.error(error);
      throw error;
    })
}

export const updateUser = (params: { password: string | null, name: string, file?: any }) => {
  let auth = getAuth();
  let fileName = '';
  const storage = getStorage();
  let storageRef = null;

  return Promise.all(
    [
      (params?.name && auth.currentUser.displayName !== params?.name)
        ? updateProfile(auth.currentUser, {
          displayName: String(params?.name)
        })
        : null,
      params?.password ? updatePassword(auth.currentUser, params.password) : null,

    ]
  )
    .then(() => {
      if (auth.currentUser.photoURL) {
        const desertRef = ref(storage, auth.currentUser.photoURL);
        deleteObject(desertRef).catch((error) => console.log(error));
      }
    })
    .then(() => {
      if (params?.file) {
        fileName = `images/${uuid()}.${params?.file.name.split('.').pop()}`;
        storageRef = ref(storage, fileName);
        return uploadBytes(storageRef, params?.file, { contentType: 'image/jpeg' });
      }
    })
    .then((snapshot) => {
      if (snapshot) {
        console.log('Uploaded a blob or file!', snapshot);
        return getDownloadURL(storageRef);
      }
    })
    .then((photoURL) => {
      auth = getAuth();
      return updateProfile(auth.currentUser, { photoURL })
        .then(() =>
          auth.currentUser.getIdToken())
        .then((token) => {
          return {
            email: auth.currentUser.email,
            id: auth.currentUser.uid,
            token,
            name: auth.currentUser.displayName,
            photoURL: photoURL || auth.currentUser.photoURL
          }
        })
    })
    .catch(error => {
      console.error(error);
      throw error;
    })

}


