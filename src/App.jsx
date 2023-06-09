import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { darkTheme, ligthTheme } from "./themes/darktheme";
import { firebaseFindUser, firebasebd } from "./firebase/firebase";
import { NextUIProvider, Loading } from "@nextui-org/react";
import { setAuth, getUser } from "./reducers/userReducer";
import { useEffect, useState } from "react";
import { LoginRoute, PrivateRoute } from "./routes";
import { Home, Login, Profile, Register, ResetPass, Customers,Products } from "./pages";

function App() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { logged } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        firebasebd.auth().onAuthStateChanged(async (user) => {
          if (user) {
            dispatch(setAuth(true));
            let userFirebase = await firebaseFindUser(
              user.multiFactor.user.email
            );
            dispatch(getUser(userFirebase));
          } else {
            dispatch(setAuth(false));
            dispatch(getUser(null));
          }
          setIsLoading(false);
        });
      } catch (error) {
        console.log(error);
      }
    };

    checkAuthState();
  }, [dispatch]);

  useEffect(() => {
    logged ? <Navigate to="/" /> : <Navigate to="/login" />;
  }, [logged]);

  if (isLoading)
    return (
      <Loading
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading
      </Loading>
    );

  return (
    <NextUIProvider theme={theme === "light" ? ligthTheme : darkTheme}>
      <Router>
        <div>
          <Routes>
            <Route
              path="/"
              element={
                // <PrivateRoute>
                <Home />
                // </PrivateRoute>
              }
              exact
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
              exact
            />
            <Route
              path="/customers"
              element={
                <PrivateRoute>
                  <Customers />
                </PrivateRoute>
              }
              exact
            />
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <Products />
                </PrivateRoute>
              }
              exact
            />
            s
            <Route
              path="/login"
              element={
                <LoginRoute>
                  <Login />
                </LoginRoute>
              }
              exact
            />
            <Route
              path="/register"
              element={
                <LoginRoute>
                  <Register />
                </LoginRoute>
              }
              exact
            />
            <Route
              path="/resetpassword"
              element={
                <LoginRoute>
                  <ResetPass />
                </LoginRoute>
              }
              exact
            />
            {/* <Route path="/login" element={<Login />} exact />
            <Route path="/register" element={<Register />} exact />
            <Route path="/resetpassword" element={<ResetPass />} exact /> */}
            {/* <Route path="/prueba" element={<h1>aaa</h1>} exact /> */}
            {/* <Route path="/login" element={<Login />} exact /> */}
            {/* <Route path="/" element={<Home />} exact />
            <Route path="*" element={<Navigate to="/" />} /> */}
          </Routes>
          {/* <Footer /> */}
        </div>
      </Router>
    </NextUIProvider>
  );
}

export default App;
