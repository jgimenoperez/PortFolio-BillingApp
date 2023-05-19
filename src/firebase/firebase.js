import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyA4ynNnLA92FIOQyJvGTAZ8ODEqgdzA1qo",
  authDomain: "billingapp-f1027.firebaseapp.com",
  projectId: "billingapp-f1027",
  storageBucket: "billingapp-f1027.appspot.com",
  messagingSenderId: "716941384180",
  appId: "1:716941384180:web:8e03de76a4f23c48fe01a1"
};

export const firebasebd = firebase.initializeApp(firebaseConfig);

export const firebaseLoginWithEmail = () => {
    return firebase
      .auth()
      .signInWithEmailAndPassword('jgimenoperez@gmail.com', '44795240aA')
      .then((userCredential) => {
        // El inicio de sesión fue exitoso
        const user = userCredential.user;
        console.log('Usuario autenticado:', user);
        return user;
      })
      .catch((error) => {
        // Ocurrió un error durante el inicio de sesión
        console.error('Error de autenticación:', error);
        throw error; // Opcionalmente, puedes lanzar el error para que sea manejado por la función que llama a esta función
      });
  };
  
export const firebaseLoginWithGoogle = () =>{
    return firebase
    .auth()
    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((userCredential) => {
        console.log(222)
        // El inicio de sesión fue exitoso
        const user = userCredential.user;
        console.log('Usuario autenticado:', user);
        return user;
        }
    )
    .catch((error) => {
        // Ocurrió un error durante el inicio de sesión
        console.error('Error de autenticación:', error);
        throw error; // Opcionalmente, puedes lanzar el error para que sea manejado por la función que llama a esta función
        }
    );


}