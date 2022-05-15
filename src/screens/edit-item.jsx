import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import useApi from "../hooks/use-api";
import BaseLayout from "../layouts/base";
import * as itemApi from "../apis/item";
import * as itemCategoryApi from "../apis/item-category";
import ServerError from "../components/server-error";
import { AppLoading } from "../components";
import { useMutation } from "urql";
import { allItemCategoriesMutation, singleItemMutation } from "../graphql/item";

export default function EditItemScreen() {
  const { id } = useParams();
  const history = useHistory();
  const [categories, setCategories] = useState([]);

  const [singleItemRes, singleItemFunc] = useMutation(singleItemMutation);
  const [allCategoriesRes, allCategoriesFunc] = useMutation(
    allItemCategoriesMutation
  );

  const [category, setCategory] = useState("");
  const [price, setPrice] = useState();
  const [name, setName] = useState("");
  const singleItem = useApi(itemApi.getItem, { keyExtractor: "item" });
  const updateItem = useApi(itemApi.updateItem, { hasCatchError: true });
  const allCategories = useApi(itemCategoryApi.getAllCategories, {
    keyExtractor: "categories",
  });

  useEffect(() => {
    // singleItemFunc({ id }).then((res) => {
    //   const item = JSON.parse(res.data.singleItem.data);
    //   setPrice(item.price);
    //   setName(item.name);
    //   setCategory(item.categoryId);
    // });
    // allCategories.request(item.shopId._id);

    singleItem.request(id).then((res) => {
      const item = res.data.item;
      console.log("item: ", item);
      console.log("item price: ", item.price);
      setPrice(item.price);
      setName(item.name);
      setCategory(item.categoryId);

      allCategoriesFunc({ shopId: item.shopId._id }).then((_res) => {
        const categories = JSON.parse(_res.data.allCategories.data);
        setCategories(categories);
      });
    });
  }, []);

  // useEffect(() => {
  //   allCategories.request()
  // }, [])

  const handleBack = () => {
    history.push("/init-shop");
  };

  const handleSave = async () => {
    console.log("category: ", category);
    console.log("name: ", name);
    console.log("price: ", price);

    try {
      await updateItem.request(id, { price, categoryId: category, name });
    } catch (_) {}
  };

  if (singleItemRes.fetching) return <></>;

  return (
    <BaseLayout>
      <div>
        <ServerError error={updateItem.error} />
        {allCategoriesRes.fetching && <AppLoading />}
        {allCategoriesRes.data && categories.length > 0 && (
          <div class="form-group mt-3">
            <label for="category">Select Category</label>
            <select
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((categ) => (
                <option
                  key={categ._id}
                  value={categ._id}
                  selected={category === categ._id}
                >
                  {categ.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="form-group mt-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
          />
        </div>
        <button className="btn btn-info mt-3" onClick={handleBack}>
          Back
        </button>
        {updateItem.isLoading && <p>Loading ...</p>}
        {!updateItem.isLoading && (
          <button
            className="btn btn-primary mt-3 mx-3"
            onClick={handleSave}
            disabled={!category || !price || !name}
          >
            Save
          </button>
        )}
      </div>
    </BaseLayout>
  );
}
