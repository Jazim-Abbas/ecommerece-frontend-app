import { Field } from "formik";
import { useEffect, useState } from "react";
import { AppForm } from "../components/app-form";
import BaseLayout from "../layouts/base";
import { profileSchema } from "../utils/validations";

export default function ProfileScreen() {
  const [userFields, setUserFields] = useState({});
  const user = JSON.parse(window.localStorage.getItem("user"));

  useEffect(() => {
    const fields = {};
    for (let field in user) {
      if (!user[field]) {
        fields[field] = "";
      } else {
        fields[field] = user[field];
      }
    }

    setUserFields(fields);
  }, []);

  console.log("user: ", user);

  const handleSubmit = ({ formValues }) => {
    console.log("profile subbmited values: ", formValues);
  };

  return (
    <BaseLayout hasSearch={false}>
      <h3 className="text-center">Your Public Profile</h3>
      <hr />
      <div className="my-4">
        <AppForm
          initialValues={user}
          validationSchema={profileSchema}
          handleSubmit={handleSubmit}
        >
          {/* <div className="form-group">
            <label htmlFor="profile_image">Profile Picture</label>
            <Field type="file" className="form-control" id="profile_image" />
          </div> */}
          <div className="form-group mt-3">
            <label htmlFor="name">Name</label>
            <Field type="text" className="form-control" id="name" name="name" />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="dof">Date of Birth</label>
            <Field
              type="date"
              className="form-control"
              id="dof"
              name="dateOfBirth"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              className="form-control"
              id="email"
              name="email"
              disabled
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="city">City</label>
            <Field type="text" className="form-control" id="city" name="city" />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="phone">Phone</label>
            <Field
              type="text"
              className="form-control"
              id="phone"
              name="phone"
            />
          </div>
          <div class="form-group">
            <label for="about">About</label>
            <textarea
              class="form-control"
              rows="2"
              id="about"
              name="about"
            ></textarea>
          </div>
          <div class="form-group mt-3">
            <label for="address">Address*</label>
            <textarea
              class="form-control"
              rows="2"
              id="address"
              name="address"
            ></textarea>
          </div>
          <div class="form-group mt-3">
            <label for="country">Select Country</label>
            <select class="form-control" id="country" name="country">
              <option value="ind">India</option>
              <option value="usa">USA</option>
              <option value="can">Canada</option>
            </select>
          </div>

          <button className="btn btn-success mt-3">Save Changes</button>
        </AppForm>
      </div>
    </BaseLayout>
  );  
}
