import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { darkTheme, ligthTheme } from "./themes/darktheme";
import { firebasebd } from "./firebase/firebase";
import { Loading } from "@nextui-org/react";
import { Nav } from "./components/navbar/Navbar";

import { NextUIProvider } from "@nextui-org/react";
import { setAuth, setUser } from "./reducers/authReducer";
import { useEffect, useState } from "react";
import { LoginRoute, PrivateRoute } from "./routes";
import {Home,Login,Profile,Register,ResetPass } from "./pages";



function App() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebasebd.auth().onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setAuth(true));
        dispatch(setUser(user.multiFactor.user));
      } else {
        dispatch(setAuth(false));
        dispatch(setUser(null));
      }
      setIsLoading(false);
    });
  }, [dispatch]);

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
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
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
