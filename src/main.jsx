import "./index.css";
import { Provider } from "react-redux";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import store from "./store/store.js";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <div className="pagina">
      <App />
    </div>
  </Provider>

  // </React.StrictMode>
);
