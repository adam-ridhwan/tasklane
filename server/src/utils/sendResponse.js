const sendResponse = (res, statusCode, accessToken, expiresIn) => {
  res.status(statusCode).json({
    accessToken,
    expiresIn,
  });
};

export default sendResponse;
