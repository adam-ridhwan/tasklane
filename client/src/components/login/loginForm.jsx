import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext.jsx';

const LoginForm = () => {
  const navigate = useNavigate();

  const { accessToken, setAccessToken } = useContext(AuthContext);
  const [{ email, password }, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(false);

  const handleLoginUser = async e => {
    e.preventDefault();

    // cookies only allowed on localhost
    const response = await fetch('http://localhost:8000/api/v1/users/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.status !== 200) {
      return setError(data.message);
    }

    setAccessToken(data.accessToken);
    navigate('/dashboard');
  };

  const handleInputChange = e => {
    const { name, value } = e.target;

    setUserInfo({ email, password, [name]: value });
  };

  return (
    <>
      <form onSubmit={e => handleLoginUser(e)}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            onChange={e => handleInputChange(e)}
          />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            autoComplete='off'
            onChange={e => handleInputChange(e)}
          />
        </div>

        <button type='submit'>Login</button>
      </form>

      {/* ERROR MESSAGE ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */}
      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
    </>
  );
};

export default LoginForm;
