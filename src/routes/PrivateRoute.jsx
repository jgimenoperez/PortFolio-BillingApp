import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({isLoggedIn,children}) => {

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: history.location }} />  
  }
  console.log(children)
  return children;

}

