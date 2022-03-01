import { useHistory } from "react-router-dom";

export default function LoginScreen() {
  const history = useHistory();

  const handleRegister = () => {
    history.replace("/register");
  };

  return (
    <div className="container-fluid bg-light text-dark mt-3">
      <div className="row justify-content-center align-items-center">
        <h2 className="text-center">Login</h2>
      </div>
      <hr />
      <div className="row justify-content-center align-items-center h-100">
        <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
          <form action="">
            <div className="form-group mb-3">
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" id="username" />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" />
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-sm">Login</button>
              <button
                className="btn btn-secondary btn-sm mx-3"
                onClick={handleRegister}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
