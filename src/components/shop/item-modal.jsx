import { Field } from "formik";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { itemSchema } from "../../utils/validations";
import { AppForm, FieldError } from "../app-form";
import * as itemApi from "../../apis/item";
import * as itemCategoryApi from "../../apis/item-category";
import useApi from "../../hooks/use-api";
import ServerError from "../server-error";
import AppLoading from "../loading";
import { Link } from "react-router-dom";
import { useMutation } from "urql";
import { allItemCategoriesMutation, newItemMutation } from "../../graphql/item";

export default function ItemModal(props) {
  const newItem = useApi(itemApi.createNewItem, { hasCatchError: true });
  const [itemImgs, setItemImgs] = useState([]);
  const [featuredImg, setFeaturedImg] = useState("");

  const [categories, setCategories] = useState([]);
  const [allCategoriesRes, allCategoriesFunc] = useMutation(
    allItemCategoriesMutation
  );
  const [_, newItemFunc] = useMutation(newItemMutation);

  const allCategories = useApi(itemCategoryApi.getAllCategories, {
    keyExtractor: "categories",
  });

  useEffect(() => {
    // if (props.shop) {
    //   console.log("shop: ", props.shop);
    //   allCategories.request(props.shop._id);
    // }

    if (props.shop) {
      allCategoriesFunc({ shopId: props.shop._id }).then((res) => {
        const data = JSON.parse(res.data.allCategories.data);
        setCategories(data);
      });
    }
  }, [props.shop]);

  if (allCategoriesRes.fetching) return <></>;

  if (!allCategoriesRes.data) return <></>;

  const localImageURL = () => {
    return URL.createObjectURL(featuredImg);
  };

  const localImageURLs = () => {
    if (itemImgs.length > 0) {
      return itemImgs.map((img) => URL.createObjectURL(img));
    }

    return [];
  };

  const handleFeaturedImg = (e) => {
    setFeaturedImg(e.target.files[0]);
  };

  const handleInputFileChange = (e) => {
    const files = [...e.target.files];
    if (files.length > 3) {
      alert("Please use only 3 files");
      return;
    } else {
      setItemImgs(files);
    }
  };

  const handleSubmit = async ({ formValues }) => {
    console.log("formvalues: ", formValues);

    const itemFields = {
      ...formValues,
      image: itemImgs,
      featured: featuredImg,
      shopId: props.shop._id,
    };

    const fields = {
      name: formValues.name,
      categoryId: formValues.categoryId,
      description: formValues.description,
      price: formValues.price,
      quantity: formValues.quantity,
      shopId: props.shop._id,
    };

    try {
      const res = await newItemFunc({ item: fields, featured: featuredImg });
      const newCreatedItem = JSON.parse(res.data.createItem.data);
      props.onItemAdded(newCreatedItem);
      props.onHide();
    } catch (_) {}

    // try {
    //   const res = await newItem.request(itemFields);
    //   const newCreatedItem = res.data.item;
    //   props.onItemAdded(newCreatedItem);
    //   props.onHide();
    // } catch (_) {}
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="item-modal">Create Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ServerError error={newItem.error} />
        <AppForm
          initialValues={initValues}
          validationSchema={itemSchema}
          handleSubmit={handleSubmit}
        >
          {/* <div className="my-3">
            {localImageURLs().map((imgURL) => (
              <img
                key={imgURL}
                src={imgURL}
                alt="Item Image"
                width="200"
                className="mx-2"
              />
            ))}
          </div>
          <div className="form-group">
            <label htmlFor="item_image">Item Image</label>
            <input
              type="file"
              className="form-control"
              id="item_image"
              multiple
              onChange={handleInputFileChange}
              max="3"
            />
          </div> */}
          <div className="my-3">
            {featuredImg && (
              <img
                src={localImageURL()}
                alt="Item Image"
                width="200"
                className="mx-2"
              />
            )}
          </div>
          <div className="form-group">
            <label htmlFor="item_image">Featured Item Image</label>
            <input
              type="file"
              className="form-control"
              id="item_image"
              onChange={handleFeaturedImg}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="item_name">Item Name</label>
            <Field
              type="text"
              className="form-control"
              id="item_name"
              name="name"
            />
            <FieldError field="name" />
          </div>
          {categories.length === 0 && (
            <div className="alert alert-info mt-3">
              <p>Please Create Item Category First</p>
              <Link to="/item-category">Create Item Category</Link>
            </div>
          )}
          {categories.length > 0 && (
            <div class="form-group mt-3">
              <label for="category">Select Category</label>
              <Field
                component="select"
                class="form-control"
                id="category"
                name="categoryId"
              >
                <option>------</option>
                {categories.map((categ) => (
                  <option key={categ._id} value={categ._id}>
                    {categ.name}
                  </option>
                ))}
              </Field>
              <FieldError field="categoryId" />
            </div>
          )}
          <div className="form-group mt-3">
            <label htmlFor="description">Description</label>
            <Field
              type="text"
              className="form-control"
              id="description"
              name="description"
            />
            <FieldError field="description" />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="price">Price</label>
            <Field
              type="number"
              className="form-control"
              id="price"
              name="price"
            />
            <FieldError field="price" />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="stock_qty">Stock Quantity</label>
            <Field
              type="number"
              className="form-control"
              id="stock_qty"
              name="quantity"
            />
            <FieldError field="quantity" />
          </div>
          {newItem.isLoading && <AppLoading />}
          <button
            type="submit"
            className="btn btn-success mt-3"
            disabled={categories.length === 0 || newItem.isLoading}
          >
            Save Changes
          </button>
        </AppForm>
      </Modal.Body>
    </Modal>
  );
}

const initValues = {
  name: "",
  categoryId: "",
  description: "",
  price: "",
  quantity: "",
};
