import { firebaseUpdateUser } from "../firebase/firebase";
import { setTheme } from "../reducers/themeReducer";
import { actions } from "../types/types";

export const customMiddleware = (store) => (next) => async (action) => {
  const state = store.getState();

  switch (action.type) {
    
    case actions.UPDATE_AVATAR:
      // eslint-disable-next-line no-case-declarations
      const { user } = state.user;
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
