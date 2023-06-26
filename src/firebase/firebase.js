import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getUser } from "../reducers/userReducer";

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
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log("Usuario autenticado:", user);
    let userApp = await firebaseFindUser(user.multiFactor.user.email);

    if (!userApp) {
      const newUser = {
        name: user.multiFactor.user.displayName,
        email: user.multiFactor.user.email,
        image: user.multiFactor.user.photoURL,
        data: new Date().toLocaleDateString("es-ES"),
        typeProvider: "email",
        nextNumBill: 100001,
      };
      addUserFirestore(newUser).then((userApp = { ...newUser }));
    }
    return userApp;
  } catch (error) {
    // console.error("Error de autenticación:", error);
    throw new Error(
      "El correo electrónico/contraseña que ingresaste es incorrecto.\n Verifica tus credenciales o intenta utilizar un método diferente para iniciar sesión."
    );
  }
};

export const firebaseLoginWithEmailNotPersistence = async (email, password) => {
  try {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE); // Configurar la persistencia de sesión en "NONE"
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log("Usuario autenticado:", user);
    let userApp = await firebaseFindUser(user.multiFactor.user.email);
    console.log("userApp", userApp);
    if (!userApp) {
      const newUser = {
        name: user.multiFactor.user.displayName,
        email: user.multiFactor.user.email,
        image:
          "https://res.cloudinary.com/dxnwtmj3l/image/upload/v1684944632/BillingApp/Public/avatar_slisqu.png",
        data: new Date().toLocaleDateString("es-ES"),
        typeProvider: "email",
        nextNumBill: 100001,
      };
      addUserFirestore(newUser).then((userApp = { ...newUser }));
    }
    return userApp;
  } catch (error) {
    // console.error("Error de autenticación:", error);
    throw new Error(
      "El correo electrónico/contraseña que ingresaste es incorrecto.\n Verifica tus credenciales o intenta utilizar un método diferente para iniciar sesión."
    );
  }
};

export const firebaseLoginWithGoogle = async () => {
  try {
    const userCredential = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider());
    const user = userCredential.user;
    console.log("Usuario autenticado:", user);
    let userApp = await firebaseFindUser(user.multiFactor.user.email);

    if (!userApp) {
      const newUser = {
        name: user.multiFactor.user.displayName,
        email: user.multiFactor.user.email,
        image: user.multiFactor.user.photoURL,
        data: new Date().toLocaleDateString("es-ES"),
        typeProvider: "google",
        nextNumBill: 100001,
      };
      addUserFirestore(newUser).then((userApp = { ...newUser }));
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
    const userCredential = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider());
    const user = userCredential.user;
    console.log("Usuario autenticado:", user);
    let userApp = await firebaseFindUser(user.multiFactor.user.email);

    if (!userApp) {
      const newUser = {
        name: user.multiFactor.user.displayName,
        email: user.multiFactor.user.email,
        image: user.multiFactor.user.photoURL,
        data: new Date().toLocaleDateString("es-ES"),
        typeProvider: "google",
        nextNumBill: 100001,
      };
      addUserFirestore(newUser).then((userApp = { ...newUser }));
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

export const firebaseAddUser = (email, password) => {
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
      throw new Error(
        "El correo electrónico/contraseña que ingresaste es incorrecto.\n Verifica tus credenciales o intenta utilizar un método diferente para iniciar sesión."
      );
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
};

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
};

export const addUserFirestore = (newUser) => {
  return firebase
    .firestore()
    .collection("users")
    .doc(newUser.email)
    .set(newUser)
    .then((docRef) => {
      console.log("Registro agregado con ID:", docRef.id);
      return docRef;
    })
    .catch((error) => {
      console.error("Error al agregar el registro:", error);
    });
};

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
        user = { docId: doc.id, ...doc.data() };
      });
      return user;
    })
    .catch((error) => {
      console.log("Error al obtener los documentos: ", error);
      return null;
    });
};


export const firebaseUpdateUser = (docId, data) => {
  console.log(docId, data);
  return firebase
    .firestore()
    .collection("users")
    .doc(docId)
    .update(data)
    // .then(() => {
    //   console.log("Usuario actualizado");
    //   return data;
    // })
    .catch((error) => {
      console.error("Error al actualizar el usuario:", error);
      throw error;
    });
};

export const firebaseAddCustomers = (email, customers) => {
  const customersCollection = firebase
    .firestore()
    .collection("users")
    .doc(email)
    .collection("customers");

  customers.forEach((customer) => {
    customersCollection
      .add(customer)
      .then((docRef) => {
        console.log("Cliente agregado con ID: ", docRef.id);
      })
      .catch((error) => {
        console.log("Error al agregar el cliente: ", error);
      });
  });
};

export const firebaseAddProducts = (email, products) => {
  const customersCollection = firebase
    .firestore()
    .collection("users")
    .doc(email)
    .collection("products");

  products.forEach((product) => {
    customersCollection
      .add(product)
      .then((docRef) => {
        console.log("Producto agregado con ID: ", docRef.id);
      })
      .catch((error) => {
        console.log("Error al agregar el pruducto: ", error);
      });
  });
};

export const firebaseAddData = (email, collection, data, id = null) => {
  console.log(data);

  const customersCollection = firebase
    .firestore()
    .collection("users")
    .doc(email)
    .collection(collection);

  if (id) {
    console.log(id);
    const documentRef = customersCollection.doc(id);

    return documentRef
      .set(data[0])
      .then(() => {
        console.log(collection, "Registro actualizado con ID: ", id);
        return id;
      })
      .catch((error) => {
        console.warn(collection, "Error al actualizar el registro: ", error);
        throw new Error("Error al actualizar el registro");
      });
  } else {
    const promises = data.map((row) => {
      return customersCollection
        .add(row)
        .then((docRef) => {
          console.log(collection, "Registro agregado con ID: ", docRef.id);
          return docRef.id;
        })
        .catch((error) => {
          console.warn(collection, "Error al agregar el registro: ", error);
          throw new Error("Error al agregar los registros");
        });
    });
    return Promise.all(promises);
  }
};

export const firebaseGetData = (email, collection) => {
  return firebase
    .firestore()
    .collection("users")
    .doc(email)
    .collection(collection)
    .get()
    .then((querySnapshot) => {
      let data = [];
      querySnapshot.forEach((docs) => {
        // console.log( docs.data());
        data.push({ id: docs.id, ...docs.data() });
        // console.log(customers)
      });
      return data;
    })
    .catch((error) => {
      console.log("Error al obtener los documentos: ", error);
      return null;
    });
};

export const firebaseGetDataByID = (email, collection, id) => {
  return firebase
    .firestore()
    .collection("users")
    .doc(email)
    .collection(collection)
    .doc(id)
    .get()
    .then((doc) => {
      return doc.data();
    })
    .catch((error) => {
      console.log("Error al obtener el documento:", collection, error);
      return null;
    });
};

export const firebaseDeleteData = (email, collection, id) => {
  return firebase
    .firestore()
    .collection("users")
    .doc(email)
    .collection(collection)
    .doc(id)
    .delete()
    .then(console.log("registro eliminado"))
    .catch((error) => {
      console.log("Error al obtener los documentos: ", error);
      return null;
    });
};

export const getCounterBills = (dispatch) => {
  firebase
    .firestore()
    .collection("users")
    .doc("fiona@manosdehada.es")
    .onSnapshot(
      (response) => {
        dispatch(getUser(response.data()));
      },
      (err) => {
        console.log("error", err);
      }
    );
};

export const firebaseAddInvoice = (email, data) => {
  console.log(data);
  const numFactura = data.numfactura.toString(); // Convertir a cadena de texto si es necesario

  const invoiceRef = firebase
    .firestore()
    .collection("users")
    .doc(email)
    .collection("invoices")
    .doc(numFactura);

  return invoiceRef
    .delete() // Eliminar el documento existente, si existe
    .then(() => {
      console.log(data)
      return invoiceRef.set(data); // Insertar un nuevo documento con los datos proporcionados
    })
    .then(() => {
      console.log('Invoices', "Registro actualizado con ID: ", numFactura);
      return numFactura;
    })
    .catch((error) => {
      console.warn('Invoices', "Error al actualizar el registro: ", error);
      throw new Error("Error al actualizar el registro");
    });
};

// export const customerFields22 = [
//   { name: "NOMBRE", uid: "nombre" },
//   { name: "RAZON", uid: "razon" },
//   { name: "DNI", uid: "dni" },
//   { name: "EMAIL", uid: "email" },
//   { name: "TELEFONO", uid: "telefono" },
//   { name: "CIUDAD", uid: "ciudad" },
//   { name: "PROVINCIA", uid: "provincia" },
//   { name: "DIRECCION", uid: "direccion" },
//   { name: "CODPOSTAL", uid: "codpostal" },
//   { name: "FECHA", uid: "fecha" },
//   { name: "ESTATUS", uid: "estatus" },
//   { name: "ACTIONS", uid: "actions" },
// ];

export const customerFields = [
  "nombre",
  "razon",
  "dni",
  "email",
  "telefono",
  "ciudad",
  "provincia",
  "direccion",
  "codpostal",
  "fecha",
  "estatus",
  "actions",
];

export const ProductFields = [
  "codigo",
  "nombre",
  "descripcion",
  "precio",
  "stock",
  "categoria",
  "proveedor",
  "actions",
];
