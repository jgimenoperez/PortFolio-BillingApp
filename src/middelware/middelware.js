import { firebaseUpdateUser } from "../firebase/firebase";
import { setTheme } from "../reducers/themeReducer";

export const customMiddleware = (store) => (next) => async (action) => {
  const state = store.getState();

  switch (action.type) {
    
    case "auth/setImageAvatar":
      // eslint-disable-next-line no-case-declarations
      const { user } = state.auth;
      firebaseUpdateUser(user.docId, {
        image: action.payload,
      }).then(() => {
        return next(action);
      });
      break;

    default:
      return next(action);
  }
};
