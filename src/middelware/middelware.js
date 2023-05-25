import {
  firebaseLoginWithEmail,
  firebaseLoginWithEmailNotPersistence,
  firebaseLoginWithGoogle,
  firebaseLoginWithGoogleNoPersistence,
  firebaseUpdateUser,
} from "../firebase/firebase";
import { getUser, setErrorLogin } from "../reducers/userReducer";
import { actions } from "../types/types";

export const customMiddleware = (store) => (next) => async (action) => {
  const state = store.getState();
  let user = null;
  switch (action.type) {
    case actions.UPDATE_AVATAR:
      // eslint-disable-next-line no-case-declarations
      user = state.user;
      firebaseUpdateUser(user.docId, {
        image: action.payload,
      }).then(() => {
        return next(action);
      });
      break;

    case actions.LOGIN_GOOGLE:
      try {
        if (action.payload.remenberSession) {
          user = await firebaseLoginWithGoogle();
        } else {
          user = await firebaseLoginWithGoogleNoPersistence();
        }
      } catch (error) {
        store.dispatch(setErrorLogin(error.message));
        console.log('Ocurrió un error:', error.message);
      }

      store.dispatch(getUser(user));
      break;

    case actions.LOGIN_MAIL:
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
        console.log(user);
      } catch (error) {
        store.dispatch(setErrorLogin(error.message));
        console.log('Ocurrió un error:', error.message);
      }

      // dispatch(getUser(user));
      break;

    default:
      return next(action);
  }
};
