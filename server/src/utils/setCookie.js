const setCookie = (refreshToken, res) => {
  const cookieOptions = {
    expires: new Date(Date.now() + 86400000), // 1 day in milliseconds
    httpOnly: true,
    secure: true,
    sameSite: 'none', // change when in production
  };

  res.cookie('jwt', refreshToken, cookieOptions);
};

export default setCookie;
