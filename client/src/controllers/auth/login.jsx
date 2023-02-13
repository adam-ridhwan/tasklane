import { useEffect, useState } from 'react';

const Login = () => {
  const [accessToken, setAccessToken] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginHandler = async e => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/api/v1/users/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // email: `${email}`,
        // password: `${password}`,
        email: 'adam@gmail.com',
        password: 'password',
      }),
    });
    const data = await response.json({});
    console.log(data);
    setAccessToken(data.accessToken);
  };

  useEffect(() => {
    // console.log(document.cookie);
  });

  return (
    <>
      {accessToken ? (
        <div>Logged in</div>
      ) : (
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
      )}
    </>
  );
};

export default Login;
