import { Field } from "formik";
import { useHistory } from "react-router-dom";
import { AppForm, FieldError } from "../components/app-form";
import useApi from "../hooks/use-api";
import { loginSchema } from "../utils/validations";
import * as authApi from "../apis/auth";
import { ServerError } from "../components";
import { BASE_URL } from "../utils/app";
import { useMutation } from "urql";
import { loginMutation } from "../graphql/item";
import { useState } from "react";

export default function LoginScreen() {
  const [error, setError] = useState("");
  const [loginRes, loginFunc] = useMutation(loginMutation);
  const auth = useApi(authApi.login, { hasCatchError: true });
  const history = useHistory();

  const handleRegister = () => {
    history.replace("/register");
  };

  const handleSubmit = async ({ formValues }) => {
    try {
      const res = await loginFunc({
        email: formValues.email,
        password: formValues.password,
      });

      if (res.error) {
        throw res.error;
      }

      console.log("res: ", res);

      const user = JSON.parse(res.data.login.data);
      const { token, ...userFields } = user;
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("user", JSON.stringify(userFields));
      window.localStorage.setItem("userId", userFields.id);
      history.push("/");
      window.location.reload();

      // console.log("form values: ", formValues);
      // const res = await auth.request(formValues);
      // const { user } = res.data;
      // const { token, ...userFields } = user;
      // window.localStorage.setItem("token", token);
      // window.localStorage.setItem("user", JSON.stringify(userFields));
      // window.localStorage.setItem("userId", userFields.id);
      // history.push("/");
      // window.location.reload();
    } catch (err) {
      setError(err.message);
      console.log("login error: ", err);
    }
  };

  return (
    <div className="container-fluid bg-light text-dark mt-3 py-3">
      <div className="row justify-content-center align-items-center">
        <h2 className="text-center">Login</h2>
      </div>
      <hr />
      <div className="row justify-content-center align-items-center h-100">
        <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
          {error && <div className="alert alert-danger">{error}</div>}
          <AppForm
            initialValues={initialValues}
            validationSchema={loginSchema}
            handleSubmit={handleSubmit}
          >
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <Field
                type="text"
                className="form-control"
                id="email"
                name="email"
              />
              <FieldError field="email" />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                className="form-control"
                id="password"
                name="password"
              />
              <FieldError field="password" />
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
          </AppForm>
        </div>
      </div>
    </div>
  );
}

const initialValues = {
  email: "",
  password: "",
};
