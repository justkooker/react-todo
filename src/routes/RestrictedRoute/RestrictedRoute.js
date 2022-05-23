import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import routes from '../routes';
const RestrictedRoute = ({ children }) => {
  const isAuth = useSelector(state => state.authState.isAuth);

  if (isAuth) {
    return <Navigate to={routes.home} />;
  }
  return children;
};
export default RestrictedRoute;
