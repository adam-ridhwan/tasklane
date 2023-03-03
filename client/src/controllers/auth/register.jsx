import * as EmailValidator from 'email-validator';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const Register = () => {
  const { setAccessToken } = useContext(AuthContext);

  const [
    { firstName, lastName, email, password, passwordConfirm },
    setUserInfo,
  ] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  // ERROR STATES
  const [error, setError] = useState(false);
  const [inputsHaveNullValues, setInputsHaveNullValues] = useState(false);
  const [
    { emailInputHasData, passwordInputHasData, passwordConfirmInputHasData },
    setFormDataBool,
  ] = useState({
    emailInputHasData: false,
    passwordInputHasData: false,
    passwordConfirmInputHasData: false,
  });

  // returns an array of boolean values for passwords that meet the criteria
  const passwordTracker = {
    uppercase: password.match(/[A-Z]/g), // upper case letters from A to Z
    lowercase: password.match(/[a-z]/g), // lower case letters from a to z
    number: password.match(/[0-9]/g), // numbers from 0 to 9
    specialCharacters: password.match(/[#?!@$%^&*-]/g), // any of the special characters
    eightCharactersOrGreater: password.match(/.{8,}/g), // eight characters or more
  };

  // returns the number of true values in the passwordTracker object
  const passwordStrength = Object.values(passwordTracker).filter(
    value => value
  ).length;

  const handleRegisterUser = async e => {
    e.preventDefault();

    const hasEmptyFields = Object.values({
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
    }).includes('');

    if (hasEmptyFields) {
      return setInputsHaveNullValues(true);
    }

    const response = await fetch('http://localhost:8000/api/v1/users/signup', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
      }),
    });

    const data = await response.json();

    if (response.status === 401) {
      return setError(data.message);
    }

    setAccessToken(data.accessToken);
    // navigate('/dashboard');
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUserInfo({
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      [name]: value,
    });
  };

  const updateFormDataBool = newData => {
    const { [0]: key, [1]: value } = Object.entries(newData)[0];
    setFormDataBool({
      emailInputHasData,
      passwordInputHasData,
      passwordConfirmInputHasData,
      [key]: value,
    });
  };

  return (
    <>
      <div className='App'>
        <form onSubmit={e => handleRegisterUser(e)}>
          {/* FIRST NAME ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */}
          <div>
            <label htmlFor='firstName'>First name</label>
            <input
              type='text'
              name='firstName'
              id='firstName'
              placeholder='First name'
              onChange={handleInputChange}
            />

            {inputsHaveNullValues && !firstName && <div>Required</div>}
          </div>

          {/* LAST NAME ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */}
          <div>
            <label htmlFor='lastName'>Last name</label>
            <input
              type='text'
              name='lastName'
              id='lastName'
              placeholder='Last name'
              onChange={handleInputChange}
            />

            {inputsHaveNullValues && !lastName && <div>Required</div>}
          </div>

          {/* EMAIL INPUT ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */}
          <div>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              name='email'
              id='email'
              autoComplete='email'
              placeholder='Email'
              onChange={e => {
                handleInputChange(e);
                updateFormDataBool({ emailInputHasData: false });
              }}
              onBlur={() =>
                email
                  ? updateFormDataBool({ emailInputHasData: true })
                  : updateFormDataBool({ emailInputHasData: false })
              }
            />

            {/* email validation */}
            {emailInputHasData && !EmailValidator.validate(email) && (
              <div>Must be a valid email address.</div>
            )}

            {inputsHaveNullValues && !email && (
              <div>Please enter an email address</div>
            )}
          </div>

          {/* PASSWORD INPUT ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */}
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              autoComplete='new-password'
              placeholder='Password'
              onChange={e => {
                handleInputChange(e);
                updateFormDataBool({ passwordInputHasData: false });
              }}
              onBlur={() => {
                password
                  ? updateFormDataBool({ passwordInputHasData: true })
                  : updateFormDataBool({ passwordInputHasData: false });
              }}
            />

            {passwordInputHasData && (
              <div>
                {passwordStrength < 5 &&
                  'Must be 8 characters or more, needs at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.'}
              </div>
            )}

            {inputsHaveNullValues && !password && (
              <div>Please enter your password</div>
            )}
          </div>

          {/* PASSWORD CONFIRM INPUT ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */}
          <div>
            <label htmlFor='password'>Confirm Password</label>
            <input
              type='password'
              id='passwordConfirm'
              name='passwordConfirm'
              autoComplete='current-password'
              placeholder='Confirm Password'
              onChange={e => {
                handleInputChange(e);
                updateFormDataBool({ passwordConfirmInputHasData: false });
              }}
              onBlur={() => {
                passwordConfirm
                  ? updateFormDataBool({ passwordConfirmInputHasData: true })
                  : updateFormDataBool({ passwordConfirmInputHasData: false });
              }}
            />

            {passwordConfirmInputHasData && password !== passwordConfirm && (
              <div>The passwords you entered do no match</div>
            )}

            {inputsHaveNullValues && !passwordConfirm && (
              <div>Please enter your password again</div>
            )}
          </div>

          {/* SUBMIT ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */}
          <div>
            <button type='submit'>Sign up</button>
          </div>
        </form>

        {error && <div>{error}</div>}
      </div>
    </>
  );
};
export default Register;
