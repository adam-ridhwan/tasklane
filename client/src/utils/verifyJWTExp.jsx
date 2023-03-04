import jwt_decode from 'jwt-decode';
import refresh from './refreshToken.jsx';

const verifyJWTExpiration = async (accessToken, setAccessToken) => {
  let token = accessToken;

  const currentDate = new Date();
  const decodedToken = token ? jwt_decode(token) : null;

  if (!decodedToken || decodedToken.exp * 1000 < currentDate.getTime()) {
    token = await refresh();
    setAccessToken(null);
  }

  return token;
};

export default verifyJWTExpiration;
