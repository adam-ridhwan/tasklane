const refreshToken = async () => {
  const response = await fetch('http://localhost:8000/api/v1/users/refresh', {
    method: 'GET',
    credentials: 'include', // for cookies
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const { accessToken } = await response.json();
  return accessToken;
};

export default refreshToken;
