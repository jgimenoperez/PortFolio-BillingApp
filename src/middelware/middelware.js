import {
  firebaseGetData,
  firebaseGetDataByID,
  firebaseLoginWithEmail,
  firebaseLoginWithEmailNotPersistence,
  firebaseLoginWithGoogle,
  firebaseLoginWithGoogleNoPersistence,
  firebaseUpdateUser,
} from "../firebase/firebase";
import { setCurrenInvoice, setDataMaintenance } from "../reducers/dataMaintenanceReducer";
import { getUser, setErrorLogin } from "../reducers/userReducer";
import { actions } from "../types/types";

export const customMiddleware = (store) => (next) => async (action) => {
  const state = store.getState();
  let user = null;
  let email = "";
  let table = "";
  let idDoc=";"
  switch (action.type) {
    case actions.UPDATE_AVATAR:
      // eslint-disable-next-line no-case-declarations
      user = state.user;
      firebaseUpdateUser(user.user.docId, {
        image: action.payload,
      }).then(() => {
        return next(action);
      });
      break;

    case actions.LOGIN_GOOGLE:
      store.dispatch(setErrorLogin(null));
      try {
        if (action.payload.remenberSession) {
          user = await firebaseLoginWithGoogle();
        } else {
          user = await firebaseLoginWithGoogleNoPersistence();
        }
      } catch (error) {
        store.dispatch(setErrorLogin(error.message));
        console.log("Ocurrió un error:", error.message);
      }
      store.dispatch(getUser(user));
      break;

    case actions.LOGIN_MAIL:
      store.dispatch(setErrorLogin(null));
      try {
        if (action.payload.remenberSession) {
          user = await firebaseLoginWithEmail(
            action.payload.email,
            action.payload.password
          );
        } else {
          user = await firebaseLoginWithEmailNotPersistence(
            action.payload.email,
            action.payload.password
          );
        }
      } catch (error) {
        store.dispatch(setErrorLogin(error.message));
        console.log("Ocurrió un error:", error.message);
      }

      // dispatch(getUser(user));
      break;

    case actions.UPDATE_DATA_USER:
      user = state.user;
      firebaseUpdateUser(user.user.docId, {
        ...action.payload,
      }).then(() => {
        return next(action);
      });
      break;

    case actions.UPATE_DATA_MAINTENANCE:
      // eslint-disable-next-line no-case-declarations
      email = state.user.user.email;
      // eslint-disable-next-line no-case-declarations
       table = action.payload.table;
      firebaseGetData(email, table).then((data) => {
        store.dispatch(setDataMaintenance(data));
        return next(action);
      });
      break;

    case actions.UPATE_DATA_INVOICE:
      email = state.user.user.email;
      table  = action.payload.table;
      idDoc = action.payload.idDoc;
      firebaseGetDataByID(email, table,idDoc).then((data) => {
        store.dispatch(setCurrenInvoice(data));
        return next(action);
      });
      break;

    default:
      return next(action);
  }
};
