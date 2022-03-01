import { useHistory } from "react-router-dom";

export default function RegisterScreen() {
  const history = useHistory();

  const handleLogin = () => {
    history.replace("/login");
  };

  return (
    <div className="container-fluid bg-light text-dark mt-3 py-3">
      <div className="row justify-content-center align-items-center">
        <h2 className="text-center">Register</h2>
      </div>
      <hr />
      <div className="row justify-content-center align-items-center h-100">
        <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
          <form action="">
            <div className="form-group mb-3">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password_confirmation">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="password_confirmation"
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-sm">Register</button>
              <button
                className="btn btn-secondary btn-sm mx-3"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
