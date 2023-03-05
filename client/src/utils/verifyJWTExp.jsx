import jwt_decode from 'jwt-decode';
import refreshToken from './refreshToken.jsx';

const verifyJWTExpiration = async (accessToken, setAccessToken) => {
  let token = accessToken;

  const currentDate = new Date();
  const decodedToken = token ? jwt_decode(token) : null;

  if (!decodedToken || decodedToken.exp * 1000 < currentDate.getTime()) {
    token = await refreshToken();
    setAccessToken(token);
  }

  return token;
};

export default verifyJWTExpiration;
