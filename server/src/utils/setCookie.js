const setCookie = (refreshToken, res) => {
  const cookieOptions = {
    expires: new Date(Date.now() + 21600),
    httpOnly: true,
    secure: true,
    sameSite: 'none', // change when in production
  };

  res.cookie('jwt', refreshToken, cookieOptions);
};

export default setCookie;
