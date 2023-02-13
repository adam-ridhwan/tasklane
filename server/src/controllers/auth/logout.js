const logout = (req, res) => {
  res.cookie('jwt', '', {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    status: 'success',
    message: 'Successfully logged out',
  });
};

export default logout;
