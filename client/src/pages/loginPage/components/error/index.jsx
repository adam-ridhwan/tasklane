const ErrorMessage = ({ error }) => {
  return (
    <>
      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
    </>
  );
};
export default ErrorMessage;
