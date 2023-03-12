import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../../../../context/authContext.jsx';

const Logout = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useContext(AuthContext);

  const logoutHandler = async e => {
    e.preventDefault();
    // cookies only allowed on localhost
    await fetch('http://localhost:8000/api/v1/users/logout', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setAccessToken(null);
    navigate('/');
  };

  return (
    <>
      <button onClick={e => logoutHandler(e)}>Logout</button>
    </>
  );
};

export default Logout;
