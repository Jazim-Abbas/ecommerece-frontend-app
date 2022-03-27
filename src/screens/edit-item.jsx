import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useApi from "../hooks/use-api";
import BaseLayout from "../layouts/base";
import * as itemApi from "../apis/item";
import ServerError from "../components/server-error";

export default function EditItemScreen() {
  const { id } = useParams();
  const [price, setPrice] = useState();
  const singleItem = useApi(itemApi.getItem, { keyExtractor: "item" });
  const updateItem = useApi(itemApi.updateItem, { hasCatchError: true });

  useEffect(() => {
    singleItem.request(+id).then((res) => {
      const item = res.data.item;
      console.log("item: ", item);
      console.log("item price: ", item.price);
      setPrice(item.price);
    });
  }, []);

  const handleSave = async () => {
    try {
      await updateItem.request(id, price);
    } catch (_) {}
  };

  if (singleItem.isLoading) return <></>;

  return (
    <BaseLayout>
      <div>
        <ServerError error={updateItem.error} />
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
          />
        </div>
        {updateItem.isLoading && <p>Loading ...</p>}
        {!updateItem.isLoading && (
          <button className="btn btn-primary mt-3" onClick={handleSave}>
            Save
          </button>
        )}
      </div>
    </BaseLayout>
  );
}
