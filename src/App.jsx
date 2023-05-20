import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import {  useDispatch,useSelector } from "react-redux";
import { darkTheme, ligthTheme } from "./themes/darktheme";
import { firebasebd } from "./firebase/firebase";
import { Home } from "./pages/Home";
import { Loading } from "@nextui-org/react";
import { Login } from "./pages/Login";
import { NextUIProvider } from "@nextui-org/react";
import { PrivateRoute } from "./routes/PrivateRoute";
import { setAuth } from "./reducers/authReducer";
import { useEffect, useState } from "react";

function App() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebasebd.auth().onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setAuth(true))
      } else {
        dispatch(setAuth(false))
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
            <Route path="/login" element={<Login />} exact />
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
