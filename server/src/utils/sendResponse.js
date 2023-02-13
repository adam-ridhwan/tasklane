const sendResponse = (res, statusCode, accessToken) => {
  res.status(statusCode).json({
    status: 'success',
    accessToken,
  });
};

export default sendResponse;
