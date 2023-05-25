import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

export const LoginRoute = ({children}) => {
  const { logged } = useSelector((state) => state.user);
  if (logged) {
    return <Navigate to="/" state={{ from: history.location }} />  
  }
  return children;

}

