import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import routes from '../routes';
export const PrivatRoute = ({ children }) => {
  const isAuth = useSelector(state => state.authState.isAuth);

  if (!isAuth) {
    return <Navigate to={routes.login} />;
  }
  return children;
};
export default PrivatRoute;
