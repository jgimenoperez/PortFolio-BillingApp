import {  Route, Redirect } from 'react-router-dom';


// Componente de verificación de autenticación
const isAuthenticated = () => {
    // Aquí puedes implementar la lógica para verificar si el usuario está autenticado
    // Retorna true si el usuario está autenticado, de lo contrario retorna false
    // Puedes utilizar cualquier mecanismo de autenticación (Firebase, JWT, etc.)
    return true; // Ejemplo: siempre se considera autenticado para este caso
  };
  

// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated() ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  };
  
// eslint-disable-next-line react/prop-types
export  const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated() && restricted ? (
            <Redirect to="/dashboard" />
          ) : (
            <Component {...props} />
          )
        }
      />
    );
  };
  