import { useNavigate } from 'react-router';
import { useAuth } from '../Context/FakeAuthitication';
import { useEffect } from 'react';

function ProtectedRouter({ children }) {
  const { isAuth } = useAuth();
  const navigation = useNavigate();

  useEffect(
    function () {
      if (!isAuth) navigation('/', { replace: true });
    },
    [isAuth, navigation]
  );
  return isAuth ? children : null;
}

export default ProtectedRouter;
