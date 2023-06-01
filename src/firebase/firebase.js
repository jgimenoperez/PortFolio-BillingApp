import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4ynNnLA92FIOQyJvGTAZ8ODEqgdzA1qo",
  authDomain: "billingapp-f1027.firebaseapp.com",
  projectId: "billingapp-f1027",
  storageBucket: "billingapp-f1027.appspot.com",
  messagingSenderId: "716941384180",
  appId: "1:716941384180:web:8e03de76a4f23c48fe01a1",
};

export const firebasebd = firebase.initializeApp(firebaseConfig);

export const firebaseLoginWithEmail = async (email, password) => {
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log("Usuario autenticado:", user);
    let userApp = await firebaseFindUser(user.multiFactor.user.email);

    if (!userApp) {
      const newUser = {
        name: user.multiFactor.user.displayName,
        email: user.multiFactor.user.email,
        image: user.multiFactor.user.photoURL,
        data: new Date().toLocaleDateString('es-ES'),
        typeProvider:"email",
        nextNumBill:100001  
      };
      addUserFirestore(newUser)
      .then(userApp = {...newUser})
    }
    return userApp;
  } catch (error) {
    // console.error("Error de autenticación:", error);
    throw new Error ("El correo electrónico/contraseña que ingresaste es incorrecto.\n Verifica tus credenciales o intenta utilizar un método diferente para iniciar sesión.");
  }
};

export const firebaseLoginWithEmailNotPersistence = async ( email, password) => {
  try {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE); // Configurar la persistencia de sesión en "NONE"
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log("Usuario autenticado:", user);
    let userApp = await firebaseFindUser(user.multiFactor.user.email);
    console.log('userApp',userApp)
    if (!userApp ) {
      const newUser = {
        name: user.multiFactor.user.displayName,
        email: user.multiFactor.user.email,
        image: 'https://res.cloudinary.com/dxnwtmj3l/image/upload/v1684944632/BillingApp/Public/avatar_slisqu.png',
        data: new Date().toLocaleDateString('es-ES'),
        typeProvider:"email",
        nextNumBill:100001        
      };
      addUserFirestore(newUser)
      .then(userApp = {...newUser})
    }
    return userApp;
  } catch (error) {
    // console.error("Error de autenticación:", error);
    throw new Error ("El correo electrónico/contraseña que ingresaste es incorrecto.\n Verifica tus credenciales o intenta utilizar un método diferente para iniciar sesión.")
  }
};

export const firebaseLoginWithGoogle = async () => {
  try {
    const userCredential = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    const user = userCredential.user;
    console.log("Usuario autenticado:", user);
    let userApp = await firebaseFindUser(user.multiFactor.user.email);

    if (! userApp ) {
      const newUser = {
        name: user.multiFactor.user.displayName,
        email: user.multiFactor.user.email,
        image: user.multiFactor.user.photoURL,
        data: new Date().toLocaleDateString('es-ES'),
        typeProvider:"google",
        nextNumBill:100001

      };
      addUserFirestore(newUser)
      .then(userApp = {...newUser})
    }

    return userApp;
  } catch (error) {
    console.error("Error de autenticación:", error);
    throw error; 
  }
};

export const firebaseLoginWithGoogleNoPersistence = async () => {
  try {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE); // Configurar la persistencia de sesión en "NONE"
    const userCredential = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    const user = userCredential.user;
    console.log("Usuario autenticado:", user);
    let userApp = await firebaseFindUser(user.multiFactor.user.email);

    if (!userApp) {
      const newUser = {
        name: user.multiFactor.user.displayName,
        email: user.multiFactor.user.email,
        image: user.multiFactor.user.photoURL,
        data: new Date().toLocaleDateString('es-ES'),
        typeProvider:"google",
        nextNumBill:100001
      };
      addUserFirestore(newUser)
      .then(userApp = {...newUser})
    }

    return userApp;
  } catch (error) {
    console.error("Error de autenticación:", error);
    throw error;
  }
};

export const firebaseLogout = () => {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Sesión finalizada");
    })
    .catch((error) => {
      console.error("Error al finalizar sesión:", error);
      throw error; // Opcionalmente, puedes lanzar el error para que sea manejado por la función que llama a esta función
    });
};

export const firebaseAddUser = ( email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Envía el correo de confirmación
      user
        .sendEmailVerification()
        .then(() => {
          console.log("Correo de confirmación enviado");
        })
        .catch((error) => {
          console.log("Error al enviar el correo de confirmación:", error);
        });
      console.log("Usuario creado:", user);
      return user;
    })
    .catch((error) => {
      console.error("Error al crear usuario:", error);
      throw error; // Opcionalmente, puedes lanzar el error para que sea manejado por la función que llama a esta función
    });
};

export const firebaseResetPassword = (email) => {
  return firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      console.log("Correo de restablecimiento enviado");
    })
    .catch((error) => {
      console.error("Error al enviar el correo de restablecimiento:", error);
      throw new Error ("El correo electrónico/contraseña que ingresaste es incorrecto.\n Verifica tus credenciales o intenta utilizar un método diferente para iniciar sesión.")
    });
};

export const firebaseVerifyPassword = (code) => {
  return firebase
    .auth()
    .verifyPasswordResetCode(code)
    .then((email) => {
      console.log("Correo de restablecimiento:", email);
      return email;
    })
    .catch((error) => {
      console.error("Error al verificar el código:", error);
      throw error; // Opcionalmente, puedes lanzar el error para que sea manejado por la función que llama a esta función
    });
}
export const firebaseChangePassword = (code, password) => {
  return firebase
    .auth()
    .confirmPasswordReset(code, password)
    .then(() => {
      console.log("Contraseña restablecida");
    })
    .catch((error) => {
      console.error("Error al restablecer la contraseña:", error);
      throw error; // Opcionalmente, puedes lanzar el error para que sea manejado por la función que llama a esta función
    });
}
export const addUserFirestore = (newUser) =>{
  return firebase.firestore().collection("users").doc(newUser.email).set(newUser)
  .then((docRef) => {
      console.log('Registro agregado con ID:', docRef.id);
      return docRef
    }) 
      .catch((error) => {
      console.error('Error al agregar el registro:', error);
    });
}
export const firebaseFindUser = (email) => {
  return firebase
    .firestore()
    .collection("users")
    .where("email", "==", email)
    .get()
    .then((querySnapshot) => {
      let user = null;
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        user = {"docId":doc.id, ...doc.data()};
      });
      return user;
    })
    .catch((error) => {
      console.log("Error al obtener los documentos: ", error);
      return null;
    });
};

//udpate user
export const firebaseUpdateUser = (docId,data) => {
  return firebase
    .firestore()
    .collection("users")
    .doc(docId)
    .update(data)
    .then(() => {
      console.log("Usuario actualizado");
      return data;
    })
    .catch((error) => {
      console.error("Error al actualizar el usuario:", error);
      throw error;
    });
}
