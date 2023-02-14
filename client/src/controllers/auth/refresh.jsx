const refresh = async () => {
  const response = await fetch('http://localhost:8000/api/v1/users/refresh', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data.accessToken;
};

export default refresh;
