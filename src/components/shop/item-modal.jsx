import { Field } from "formik";
import { Modal } from "react-bootstrap";
import { itemSchema } from "../../utils/validations";
import { AppForm } from "../app-form";

export default function ItemModal(props) {
  const handleSubmit = ({ formValues }) => {
    console.log("formvalues: ", formValues);
    props.onItemAdded(formValues);
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="item-modal">Create Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AppForm
          initialValues={initValues}
          validationSchema={itemSchema}
          handleSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="item_image">Item Image</label>
            <input type="file" className="form-control" id="item_image" />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="item_name">Item Name</label>
            <Field
              type="text"
              className="form-control"
              id="item_name"
              name="name"
            />
          </div>
          <div class="form-group mt-3">
            <label for="category">Select Category</label>
            <Field
              component="select"
              class="form-control"
              id="category"
              name="categoryId"
            >
              <option value="1">Clothing</option>
              <option value="2">Entertainment</option>
              <option value="3">Art</option>
            </Field>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="description">Description</label>
            <Field
              type="text"
              className="form-control"
              id="description"
              name="description"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="price">Price</label>
            <Field
              type="number"
              className="form-control"
              id="price"
              name="price"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="stock_qty">Stock Quantity</label>
            <Field
              type="number"
              className="form-control"
              id="stock_qty"
              name="quantity"
            />
          </div>
          <button className="btn btn-success mt-3">Save Changes</button>
        </AppForm>
      </Modal.Body>
    </Modal>
  );
}

const initValues = {
  name: "item",
  categoryId: "1",
  description: "description",
  price: "100",
  quantity: "3",
};
