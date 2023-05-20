import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import {  useDispatch } from "react-redux";
import { darkTheme, ligthTheme } from "./themes/darktheme";
import { firebasebd } from "./firebase/firebase";
import { Home } from "./pages/Home";
import { Loading } from "@nextui-org/react";
import { Login } from "./pages/Login";
import { NextUIProvider } from "@nextui-org/react";
import { PrivateRoute } from "./routes/PrivateRoute";
import { setAuth } from "./reducers/authReducer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(11111111)
    firebasebd.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoggedIn(true);
        dispatch(setAuth(true))
      } else {
        setIsLoggedIn(false);
        dispatch(setAuth(false))
      }
      setIsLoading(false);
    });
  }, [dispatch,setIsLoading,setIsLoggedIn]);

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
            <Route path="/login" element={<Login />} exact />
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
