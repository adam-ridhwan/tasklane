import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext.jsx';

const Login = () => {
  const navigate = useNavigate();

  const { accessToken, setAccessToken } = useContext(AuthContext);

  const [email, setEmail] = useState('adam@gmail.com');
  const [password, setPassword] = useState('asdf');

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
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
      }),
    });
    const data = await response.json();
    console.log(data);
    setAccessToken(data.accessToken);
  };

  useEffect(() => {
    if (accessToken) {
      navigate('/dashboard');
    }
  }, [accessToken]);

  return (
    <>
      <div className='App'>
        <form onSubmit={loginHandler}>
          <div>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              name='email'
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              name='password'
              autoComplete='off'
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button type='submit'>Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
