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

export const firebaseLoginWithEmail = (
  navigate,
  email,
  password,
  setErrorValidation
) => {
  console.log(111);
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Usuario autenticado:", user);
      navigate("/");
      return user;
    })
    .catch((error) => {
      console.error("Error de autenticación:", error);
      setErrorValidation(
        "El correo electrónico/contraseña que ingresaste es incorrecto.\n Verifica tus credenciales o intenta utilizar un método diferente para iniciar sesión."
      );
      // throw error;
    });
};

export const firebaseLoginWithEmailNotPersistence = (
  navigate,
  email,
  password,
  setErrorValidation
) => {
  console.log(email, password);
  return firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.NONE) // Configurar la persistencia de sesión en "NONE"
    .then(() => {
      return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Usuario autenticado:", user);
          navigate("/");
          return user;
        })
        .catch((error) => {
          console.error("Error de autenticación:", error);
          setErrorValidation(
            "El correo electrónico/contraseña que ingresaste es incorrecto.\n Verifica tus credenciales o intenta utilizar un método diferente para iniciar sesión."
          );
        });
    })
    .catch((error) => {
      console.error("Error al configurar la persistencia de sesión:", error);
      setErrorValidation(
        "El correo electrónico/contraseña que ingresaste es incorrecto.\n Verifica tus credenciales o intenta utilizar un método diferente para iniciar sesión."
      );
      // throw error;
    });
};

export const firebaseLoginWithGoogle = (navigate) => {
  return firebase
    .auth()
    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((userCredential) => {
      // El inicio de sesión fue exitoso
      const user = userCredential.user;
      console.log("Usuario autenticado111:", user);
      navigate("/");
      return user;
    })
    .catch((error) => {
      // Ocurrió un error durante el inicio de sesión
      console.error("Error de autenticación:", error);
      throw error; // Opcionalmente, puedes lanzar el error para que sea manejado por la función que llama a esta función
    });
};

export const firebaseLoginWithGoogleNoPersistence = (navigate) => {
  return firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.NONE) // Configurar la persistencia de sesión en "NONE"
    .then(() => {
      return firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((userCredential) => {
          // El inicio de sesión fue exitoso
          const user = userCredential.user;
          console.log("Usuario autenticado:", user);
          navigate("/");
          return user;
        })
        .catch((error) => {
          // Ocurrió un error durante el inicio de sesión
          console.error("Error de autenticación:", error);
          throw error; // Opcionalmente, puedes lanzar el error para que sea manejado por la función que llama a esta función
        });
    })
    .catch((error) => {
      console.error("Error al configurar la persistencia de sesión:", error);
    });
};

export const firebaseLogout = (navigate) => {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Sesión finalizada");
      navigate("/login");
    })
    .catch((error) => {
      console.error("Error al finalizar sesión:", error);
      throw error; // Opcionalmente, puedes lanzar el error para que sea manejado por la función que llama a esta función
    });
};

//add user
export const firebaseAddUser = (navigate, email, password) => {
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
      navigate("/");
      console.log("Usuario creado:", user);
      return user;
    })
    .catch((error) => {
      console.error("Error al crear usuario:", error);
      throw error; // Opcionalmente, puedes lanzar el error para que sea manejado por la función que llama a esta función
    });
};

//restablecimiento contraseña
export const firebaseResetPassword = (email) => {
  return firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      console.log("Correo de restablecimiento enviado");
    })
    .catch((error) => {
      console.error("Error al enviar el correo de restablecimiento:", error);
      throw error; // Opcionalmente, puedes lanzar el error para que sea manejado por la función que llama a esta función
    });
};

//verificar contraseña
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

//cambiar contraseña
export const firebaseChangePassword = (code, password) => {
  console.log(code,password)
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
