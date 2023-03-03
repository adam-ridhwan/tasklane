import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext.jsx';

const Login = () => {
  const navigate = useNavigate();

  const { accessToken, setAccessToken } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [error, setError] = useState(false);

  const loginHandler = async e => {
    console.log('loginHandler', email, password);
    e.preventDefault();
    // cookies only allowed on localhost
    const response = await fetch('http://localhost:8000/api/v1/users/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
    const data = await response.json();

    if (response.status !== 200) {
      return setError(data.message);
    }

    setAccessToken(data.accessToken);
    navigate('/dashboard');
  };

  const handleInputChange = event => {
    const { name, value } = event.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  return (
    <>
      <div className='App'>
        <form onSubmit={e => loginHandler(e)}>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              autoComplete='off'
              onChange={handleInputChange}
            />
          </div>

          <button type='submit'>Login</button>
        </form>

        {error && (
          <div>
            <p>{error}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
