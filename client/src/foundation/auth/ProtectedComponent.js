import { useAuthContext } from './authContext'
import { Navigate, useLocation } from 'react-router-dom'

export function ProtectedComponent({
  component,
  ...rest
}) {
  const { isAuth } = useAuthContext();
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />
  } else {
    return component
  }
}
