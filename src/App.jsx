import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { darkTheme, ligthTheme } from "./themes/darktheme";
import { Home } from "./pages/Home";
import { NextUIProvider } from "@nextui-org/react";
import { useSelector } from "react-redux";



function App() {
  const { theme } = useSelector((state) => state.theme);
 
  return (
    <NextUIProvider theme={theme === "light" ? ligthTheme : darkTheme}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} exact />
            {/* <Route path="/movie/:id" element={<Movie/>} /> */}

            {/* <Route path="/series" element={<Items typeItem={'series'}/>} />
          // <Route path="/movies" element={<Items typeItem={'movie'}/>} /> */}
            {/* cualquier otra ruta al home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          {/* <Footer /> */}
        </div>
      </Router>
    </NextUIProvider>
  );
}

export default App;
