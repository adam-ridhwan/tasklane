const sendResponse = (res, statusCode, accessToken) => {
  res.status(statusCode).json({ accessToken });
};

export default sendResponse;
