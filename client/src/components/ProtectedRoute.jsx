
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { authUser } = useSelector((state) => state.auth);

  if (!authUser) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
