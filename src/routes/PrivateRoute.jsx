import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

export const PrivateRoute = ({children}) => {
  const { logged } = useSelector((state) => state.auth);

  if (!logged) {
    return <Navigate to="/login" state={{ from: history.location }} />  
  }
  console.log(children)
  return children;

}

