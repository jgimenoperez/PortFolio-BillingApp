import { setTheme } from "../reducers/themeReducer";

export const customMiddleware = (store) => (next) => async (action) => {
    return next(action);
}