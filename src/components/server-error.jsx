const ServerError = ({ error }) => {
  if (isErrorExist(error)) {
    if (Array.isArray(error.data.message)) {
      return (
        <div className="p-2 alert alert-danger">
          {error.data.message.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      );
    }

    return <p className="alert alert-danger">{error.data.message}</p>;
  } else {
    return null;
  }
};

export default ServerError;

function isErrorExist(error) {
  return error && error.data;
}
